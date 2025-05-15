from flask import Flask, jsonify, request, session, send_file, send_from_directory
import requests
import hashlib
import os
import re
import warnings
import razorpay
from flask_cors import CORS
from werkzeug.utils import secure_filename
import uuid
import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np
from tensorflow.keras.preprocessing.image import ImageDataGenerator 
import tempfile
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import json
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
# Add at top of file
import google.generativeai as genai

# Configure Gemini (add to app initialization)
genai.configure(api_key='AIzaSyCq1_hUxfXI4mjh-r_5rqZaZqJTrjYRjwk')
  # Set API key in environment

# Suppress warnings
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
warnings.filterwarnings('ignore', category=UserWarning)

# Initialize Flask app
app = Flask(__name__)
CORS(
    app,
    supports_credentials=True,
    origins='*',  # Allow multiple frontend origins
    allow_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "PUT", "DELETE"]
)

app.secret_key = 'TFS27122023'
app.config['SESSION_COOKIE_SAMESITE'] = 'None'  # Required for cross-origin cookies
app.config['SESSION_COOKIE_SECURE'] = False  # Set to True in production

# MySQL configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'farmers'



from flask_mysqldb import MySQL
import MySQLdb.cursors
mysql = MySQL(app)

@app.errorhandler(405)
def method_not_allowed(e):
    if request.path.startswith('/api/'):
        return jsonify(message="Method Not Allowed"), 405
    else:
        return render_template("405.html"), 405


@app.after_request
def add_cors_headers(response):
    """Add CORS headers to all responses."""
    allowed_origins = ["http://localhost:3000", "http://localhost:3001"]
    if request.headers.get('Origin') in allowed_origins:
        response.headers['Access-Control-Allow-Origin'] = request.headers.get('Origin')
    else:
        response.headers['Access-Control-Allow-Origin'] = '*'  # For other origins without credentials
    response.headers['Access-Control-Allow-Credentials'] = 'true' if request.headers.get('Origin') in allowed_origins else 'false'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return response

# Upload folder configuration
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Allowed file extensions
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# Define constants
TRAIN_DIR = './PlantVillage-Dataset/raw/color'
TEST_DIR = './PlantVillage-Dataset/raw/color'
IMG_WIDTH, IMG_HEIGHT = 256, 256
BATCH_SIZE = 32

# Check if the trained model file exists
model_path = 'crop_disease_model.h5'
class_indices_path = 'class_indices.json'  # MODIFIED
model_exists = os.path.exists(model_path)
class_indices = None  # MODIFIED

# Load or train the model
if model_exists:
    model = load_model(model_path)
    # Load class indices from file
    if os.path.exists(class_indices_path):  # MODIFIED
        with open(class_indices_path, 'r') as f:
            class_indices = json.load(f)
    else:
        raise Exception("class_indices.json not found. Retrain the model.")  # MODIFIED
else:
    # Data augmentation
    train_datagen = ImageDataGenerator(rescale=1./255,
                                       shear_range=0.2,
                                       zoom_range=0.2,
                                       horizontal_flip=True)
    test_datagen = ImageDataGenerator(rescale=1./255)
    train_generator = train_datagen.flow_from_directory(TRAIN_DIR,
                                                        target_size=(IMG_WIDTH, IMG_HEIGHT),
                                                        batch_size=BATCH_SIZE,
                                                        class_mode='categorical')
    test_generator = test_datagen.flow_from_directory(TEST_DIR,
                                                     target_size=(IMG_WIDTH, IMG_HEIGHT),
                                                     batch_size=BATCH_SIZE,
                                                     class_mode='categorical')
    # Build the model
    model = tf.keras.models.Sequential([
        tf.keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(IMG_WIDTH, IMG_HEIGHT, 3)),
        tf.keras.layers.MaxPooling2D((2, 2)),
        tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
        tf.keras.layers.MaxPooling2D((2, 2)),
        tf.keras.layers.Conv2D(128, (3, 3), activation='relu'),
        tf.keras.layers.MaxPooling2D((2, 2)),
        tf.keras.layers.Flatten(),
        tf.keras.layers.Dense(128, activation='relu'),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(len(train_generator.class_indices), activation='softmax')
    ])
    # Compile the model
    model.compile(optimizer='adam',
                  loss='categorical_crossentropy',
                  metrics=['accuracy'])
    # Train the model
    history = model.fit(train_generator, epochs=10, validation_data=test_generator)
    # Save the model
    model.save(model_path)
    # Save class indices to file  # MODIFIED
    with open(class_indices_path, 'w') as f:
        json.dump(train_generator.class_indices, f)
    class_indices = train_generator.class_indices  # MODIFIED

# Function to preprocess the image
def preprocess_image(image_path):
    img = load_img(image_path, target_size=(256, 256))
    img_array = img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.
    return img_array

def get_gemini_advice(disease, confidence):
    """Fetch management tips from Gemini AI using official SDK"""
    prompt = (
        f"Provide agricultural advice for {disease} (confidence: {confidence*100:.1f}%). "
        "Include: 1) Brief description 2) Key symptoms 3) Organic management "
        "4) Chemical treatments 5) Prevention strategies. Keep concise."
    )
    
    try:
        model = genai.GenerativeModel('gemini-2.0-flash')
        response = model.generate_content(prompt)
        
        if response.candidates and response.text:
            return response.text
        return "Agricultural advice unavailable. Consult a local expert."
    
    except Exception as e:
        print(f"Gemini API Error: {str(e)}")
        return "Temporary service interruption. Please try again later."

def get_gemini_crop_tips(crop_name):
    """
    Use Gemini AI to generate cultivation tips for the given crop.
    """
    prompt = (
        f"Provide concise, practical cultivation tips for growing {crop_name} in India. "
        "Include: 1) Brief introduction, 2) Soil and climate requirements, 3) Sowing/planting instructions, "
        "4) Watering and fertilization, 5) Common pests/diseases and management, 6) Harvesting tips. "
        "Keep it actionable for farmers."
    )
    try:
        model = genai.GenerativeModel('gemini-2.0-flash')
        response = model.generate_content(prompt)
        if response.candidates and response.text:
            return response.text
        return "Cultivation tips unavailable. Consult a local expert."
    except Exception as e:
        print(f"Gemini API Error: {str(e)}")
        return "Temporary service interruption. Please try again later."



# Load the crop recommendation data and train the model at startup
crop_data = pd.read_csv('Crop_recommendation.csv')

# Features and target
features = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
X = crop_data[features]
y = crop_data['label']

# Encode labels
from sklearn.preprocessing import LabelEncoder

le = LabelEncoder()
y_encoded = le.fit_transform(y)

# Train a Random Forest Classifier
modelcrop = RandomForestClassifier(n_estimators=100, random_state=42)
modelcrop.fit(X, y_encoded)


@app.route('/recommend_crop', methods=['POST'])
def recommend_crop():
    """
    Recommend the best crop based on soil and weather parameters.
    Expects JSON with keys: nitrogen, phosphorus, potassium, temperature, humidity, ph, rainfall
    """
    data = request.get_json()
    try:
        # Extract and convert input values to float, ensure correct order
        input_features = [
            float(data['nitrogen']),
            float(data['phosphorus']),
            float(data['potassium']),
            float(data['temperature']),
            float(data['humidity']),
            float(data['ph']),
            float(data['rainfall'])
        ]
        # Convert to 2D numpy array of float32
        input_array = np.array([input_features], dtype=np.float32)
        # Check for NaN or Inf
        if np.isnan(input_array).any() or np.isinf(input_array).any():
            return jsonify({'error': 'Input contains NaN or infinity.'}), 400

        prediction = modelcrop.predict(input_array)
        recommended_crop = le.inverse_transform(prediction)[0]
        crop_tips = get_gemini_crop_tips(recommended_crop)
        return jsonify({'recommended_crop': recommended_crop, 'tips': crop_tips}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/login', methods=['POST'])
def login():
    """Log in a user."""
    data = request.get_json()
    username = data.get('username', '').strip()
    password = data.get('password', '').strip()

    if not username or not password:
        return jsonify({'error': 'Username and password required'}), 400

    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    print(f"Login attempt: username={username}, hashed_password={hashed_password}")  # Debug

    cursor = mysql.connection.cursor()
    try:
        cursor.execute(
            "SELECT id, username, email, password, role FROM users WHERE BINARY username = %s",
            (username,)
        )
        user = cursor.fetchone()
        print(f"User from DB: {user}")  # Debug

        if not user:
            return jsonify({'error': 'Invalid credentials'}), 401

        # Set session data
        session.clear()
        session['user_id'] = user[0]
        session['username'] = user[1]
        session['email'] = user[2]
        session['role'] = user[4]
        session.permanent = True

        return jsonify({
            'message': 'Login successful',
            'user': {
                'id': user[0],
                'username': user[1],
                'email': user[2],
                'role': user[4]
            }
        }), 200

    except Exception as e:
        print(f"Database error: {str(e)}")
        return jsonify({'error': 'Server error'}), 500

    finally:
        cursor.close()


@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/register', methods=['POST'])
def register_user():
    """Register a new user."""
    data = request.get_json()
    username = data.get('username')
    print(f"Username: {username}")
    email = data.get('email')
    print(f"Email: {email}")
    password = data.get('password')
    print(f"Password: {password}")  
    role = data.get('role')
    print(f"Role: {role}")  

    if not username or not email or not password or not role:
        return jsonify({'error': 'Missing required fields'}), 400

    hashed_password = hashlib.sha256(password.encode()).hexdigest()

    cursor = mysql.connection.cursor()
    try:
        query = "INSERT INTO users (username, email, password, role) VALUES (%s, %s, %s, %s)"
        cursor.execute(query, (username, email, hashed_password, role))
        mysql.connection.commit()
        return jsonify({'message': 'User registered successfully'}), 201
    except Exception as e:
        print(f"Database error: {str(e)}")
        return jsonify({'error': 'Server error'}), 500
    finally:
        cursor.close()

@app.route('/check_auth', methods=['GET'])
def check_auth():
    """Check if the user is authenticated."""
    if 'user_id' in session:
        return jsonify({
            'isLoggedIn': True,
            'user': {
                'id': session['user_id'],
                'username': session['username'],
                'role': session['role']
            }
        }), 200
    return jsonify({'isLoggedIn': False}), 200

@app.route('/logout', methods=['POST'])
def logout():
    """Log out the current user."""
    session.clear()
    return jsonify({'message': 'Logged out successfully'}), 200

@app.route('/api/dashboard-stats', methods=['GET'])
def get_dashboard_stats():
    cursor = mysql.connection.cursor()
    
    # Products added
    cursor.execute("SELECT COUNT(*) FROM products")
    productsAdded = cursor.fetchone()[0] or 0
    
    # Products ordered
    cursor.execute("SELECT COUNT(*) FROM orders")
    productsOrdered = cursor.fetchone()[0] or 0
    
    # Total sales (handle NULL results)
    cursor.execute("SELECT SUM(total) FROM orders")
    total_result = cursor.fetchone()
    totalSales = float(total_result[0]) if total_result[0] else 0.0
    
    # Customer orders with correct columns
    cursor.execute("SELECT id, user, total FROM orders")
    customerOrders = cursor.fetchall()
    
    stats = {
        'productsAdded': productsAdded,
        'productsOrdered': productsOrdered,
        'totalSales': totalSales,
        'customerOrders': [{
            'id': order[0],
            'name': order[1],
            'total': float(order[2])  # Match SQL schema's total column
        } for order in customerOrders]
    }
    
    cursor.close()
    return jsonify(stats)

@app.route('/api/latest-orders', methods=['GET'])
def get_latest_orders():
    cursor = mysql.connection.cursor()
    cursor.execute("""
        SELECT id, user, email, total, payment_method, status 
        FROM orders 
        ORDER BY id DESC 
        LIMIT 5
    """)
    orders = cursor.fetchall()
    
    latest_orders = [{
        'id': order[0],
        'user': order[1],
        'email': order[2],
        'total': float(order[3]),  # Match SQL schema position
        'payment_method': order[4],
        'status': order[5]
    } for order in orders]
    
    cursor.close()
    return jsonify({'latestOrders': latest_orders})

client = razorpay.Client(auth=("rzp_test_EBKVVFnmZwp7s4", "LfsMU1k2uo7Fg8ACFT7J7CZk"))

def remove_emojis(text):
    if not isinstance(text, str):
        return text
    emoji_pattern = re.compile(
        "["
        "\U0001F600-\U0001F64F"  # emoticons
        "\U0001F300-\U0001F5FF"  # symbols & pictographs
        "\U0001F680-\U0001F6FF"  # transport & map symbols
        "\U0001F1E0-\U0001F1FF"  # flags (iOS)
        "\U00002702-\U000027B0"
        "\U000024C2-\U0001F251"
        "]+", flags=re.UNICODE)
    return emoji_pattern.sub(r'', text)

@app.route('/api/create-razorpay-order', methods=['POST'])
def create_razorpay_order():
    try:
        data = request.get_json()
        amount = int(float(data['amount']) * 100)  # Convert to paise

        # Sanitize optional fields if you add them (e.g., receipt, notes)
        receipt = remove_emojis(data.get('receipt', 'order_rcptid_11'))
        notes = remove_emojis(data.get('notes', ''))

        order = client.order.create({
            'amount': amount,
            'currency': 'INR',
            'receipt': receipt,
            'notes': {'info': notes} if notes else {},
            'payment_capture': 1
        })

        return jsonify({
            'id': order['id'],
            'currency': order['currency'],
            'amount': order['amount']
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    payment_method = data.get('paymentMethod')

    # Common validation for both methods
    required_fields = ['user', 'email', 'mobile', 'items', 'total', 'deliveryAddress']
    if not all(data.get(field) for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400

    # Handle COD directly
    if payment_method == 'COD':
        return create_cod_order(data)

    # Handle Razorpay (needs payment verification)
    elif payment_method == 'online':
        return handle_online_order(data)

    return jsonify({'error': 'Invalid payment method'}), 400

def create_cod_order(data):
    try:
        cursor = mysql.connection.cursor()
        items_json = json.dumps(data['items'])
        
        cursor.execute("""
            INSERT INTO orders 
            (user, email, mobile, items, total, payment_method, delivery_address, status)
            VALUES (%s, %s, %s, %s, %s, 'COD', %s, 'pending')
        """, (
            data['user'], data['email'], data['mobile'],
            items_json, data['total'], data['deliveryAddress']
        ))
        mysql.connection.commit()
        return jsonify({'message': 'COD order placed'}), 201

    except Exception as e:
        print(f"COD Error: {str(e)}")
        return jsonify({'error': 'COD failed'}), 500
    finally:
        cursor.close()

def handle_online_order(data):
    # Verify payment before creating order
    payment_id = data.get('paymentId')
    order_id = data.get('orderId')
    signature = data.get('signature')

    if not all([payment_id, order_id, signature]):
        return jsonify({'error': 'Missing payment verification'}), 400

    # Razorpay verification
    try:
        client.utility.verify_payment_signature({
            'razorpay_payment_id': payment_id,
            'razorpay_order_id': order_id,
            'razorpay_signature': signature
        })
        
        # Payment verified - create order
        cursor = mysql.connection.cursor()
        items_json = json.dumps(data['items'])
        
        cursor.execute("""
            INSERT INTO orders 
            (user, email, mobile, items, total, payment_method, 
            delivery_address, status, payment_id, razorpay_order_id)
            VALUES (%s, %s, %s, %s, %s, 'online', %s, 'paid', %s, %s)
        """, (
            data['user'], data['email'], data['mobile'], items_json,
            data['total'], data['deliveryAddress'], payment_id, order_id
        ))
        mysql.connection.commit()
        return jsonify({'message': 'Online payment successful'}), 201

    except razorpay.errors.SignatureVerificationError:
        return jsonify({'error': 'Payment verification failed'}), 400
    except Exception as e:
        print(f"Online Error: {str(e)}")
        return jsonify({'error': 'Online payment failed'}), 500
    finally:
        cursor.close()


# Negotiation Endpoints

@app.route('/api/negotiations', methods=['POST'])
def create_negotiation():
    data = request.get_json()
    try:
        username = data['username']
        negotiated_amount = float(data['negotiatedAmount'])
        original_amount = float(data['originalAmount'])
        items = json.dumps(data['items'])  # Serialize cart items
        cursor = mysql.connection.cursor()
        cursor.execute("""
            INSERT INTO negotiations
            (username, original_amount, negotiated_amount, items, status)
            VALUES (%s, %s, %s, %s, 'pending')
        """, (username, original_amount, negotiated_amount, items))
        mysql.connection.commit()
        negotiation_id = cursor.lastrowid
        cursor.close()
        return jsonify({
            'id': negotiation_id,
            'status': 'pending',
            'message': 'Negotiation request submitted'
        }), 201
    except Exception as e:
        print(f"Negotiation error: {str(e)}")
        return jsonify({'error': 'Invalid negotiation data'}), 400

@app.route('/api/negotiations/pending', methods=['GET'])
def get_pending_negotiations():
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("""
            SELECT id, username, original_amount, negotiated_amount, items
            FROM negotiations
            WHERE status = 'pending'
        """)
        negotiations = []
        for row in cursor.fetchall():
            negotiations.append({
                'id': row[0],
                'username': row[1],
                'originalAmount': float(row[2]),
                'negotiatedAmount': float(row[3]),
                'items': json.loads(row[4])  # Deserialize items
            })
        cursor.close()
        return jsonify(negotiations), 200
    except Exception as e:
        print(f"Error fetching negotiations: {str(e)}")
        return jsonify({'error': 'Server error'}), 500

@app.route('/api/negotiations/<int:id>', methods=['PUT'])
def update_negotiation(id):
    try:
        data = request.get_json()
        new_status = data['status']
        if new_status not in ['approved', 'rejected']:
            return jsonify({'error': 'Invalid status'}), 400
        cursor = mysql.connection.cursor()
        cursor.execute("""
            UPDATE negotiations
            SET status = %s
            WHERE id = %s
        """, (new_status, id))
        if cursor.rowcount == 0:
            return jsonify({'error': 'Negotiation not found'}), 404
        mysql.connection.commit()
        cursor.close()
        return jsonify({'message': f'Negotiation {new_status}'}), 200
    except Exception as e:
        print(f"Update error: {str(e)}")
        return jsonify({'error': 'Server error'}), 500

# Add new endpoint to check status by negotiation ID
@app.route('/api/negotiations/status-by-id', methods=['POST'])
def get_negotiation_status_by_id():
    data = request.get_json()
    negotiation_id = data.get('id')
    
    if not negotiation_id:
        return jsonify({'error': 'Negotiation ID required'}), 400

    cursor = mysql.connection.cursor()
    try:
        cursor.execute("""
            SELECT status, negotiated_amount 
            FROM negotiations 
            WHERE id = %s
            LIMIT 1
        """, (negotiation_id,))
        
        row = cursor.fetchone()
        if row:
            return jsonify({
                'status': row[0],
                'negotiatedAmount': float(row[1]) if row[1] else None
            }), 200
        else:
            return jsonify({'status': 'not found'}), 404
            
    except Exception as e:
        print(f"Negotiation status error: {str(e)}")
        return jsonify({'error': 'Server error'}), 500
    finally:
        cursor.close()


@app.route('/api/orders/by-username/<username>', methods=['GET'])
def get_orders_by_username(username):
    """Fetch orders for a specific user."""
    print(f"Received username: {username}")  # Debug
    cursor = mysql.connection.cursor()
    try:
        cursor.execute("""
            SELECT id, user, email, total, payment_method, status, items, delivery_address
            FROM orders
            WHERE user = %s
            ORDER BY id DESC
        """, (username,))
        orders = cursor.fetchall()
        print(f"Fetched orders for {username}: {orders}")  # Debug
        order_list = [{
            'id': order[0],
            'user': order[1],
            'email': order[2],
            'total': float(order[3]),
            'payment_method': order[4],
            'status': order[5],
            'items': json.loads(order[6]),
            'delivery_address': order[7]
        } for order in orders]
        return jsonify({'orders': order_list}), 200
    except Exception as e:
        print(f"Error fetching orders by username: {str(e)}")
        return jsonify({'error': 'Server error'}), 500
    finally:
        cursor.close()

@app.route('/api/recent-products', methods=['GET'])
def get_recent_products():
    cursor = mysql.connection.cursor()
    # Get 5 most recently added products
    cursor.execute("""
        SELECT id, name, description, price, image_path 
        FROM products 
        ORDER BY id DESC 
        LIMIT 5
    """)
    products = cursor.fetchall()
    recent_products = [
        {
            'id': product[0],
            'name': product[1],
            'description': product[2],
            'price': product[3],
            'image': product[4]
        }
        for product in products
    ]
    cursor.close()
    return jsonify({'recentProducts': recent_products})


@app.route('/get_products', methods=['GET'])
def get_products():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT id, name, description, price, image_path FROM products")
    products = cursor.fetchall()
    product_list = []
    for p in products:
        img_filename = os.path.basename(p[4]) if p[4] else None
        img_url = f"http://localhost:5000/uploads/{img_filename}" if img_filename else None
        product_list.append({
            'id': p[0],
            'title': p[1],
            'description': p[2],
            'price': p[3],
            'image': img_url
        })
    cursor.close()
    return jsonify({'products': product_list})


@app.route('/add_product', methods=['POST'])
def add_product():
    data = request.form
    name = data.get('name')
    description = data.get('description')
    price = data.get('price')
    
    if not name or not description or not price:
        return jsonify({'error': 'Missing required fields'}), 400

    # Handle file upload
    if 'image' in request.files:
        image = request.files['image']
        if image and allowed_file(image.filename):
            filename = secure_filename(image.filename)
            # Generate a unique filename to avoid conflicts
            unique_filename = f"{uuid.uuid4()}_{filename}"
            image.save(os.path.join(app.config['UPLOAD_FOLDER'], unique_filename))
            image_path = os.path.join(UPLOAD_FOLDER, unique_filename)
        else:
            return jsonify({'error': 'Invalid file type'}), 400
    else:
        return jsonify({'error': 'No image provided'}), 400

    cursor = mysql.connection.cursor()
    try:
        query = "INSERT INTO products (name, description, price, image_path) VALUES (%s, %s, %s, %s)"
        cursor.execute(query, (name, description, price, image_path))
        mysql.connection.commit()
        return jsonify({'message': 'Product added successfully'}), 201
    except Exception as e:
        print(f"Database error: {str(e)}")
        return jsonify({'error': 'Server error'}), 500
    finally:
        cursor.close()

@app.route('/predict_disease', methods=['POST'])
def predict_disease():
    """Handle image upload, disease prediction, and Gemini AI advice."""
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    file = request.files['image']
    if not file or not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file type'}), 400

    # Save temporary file
    filename = secure_filename(file.filename)
    temp_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(temp_path)

    try:
        # Preprocess and predict
        processed_img = preprocess_image(temp_path)
        prediction = model.predict(processed_img)
        
        # Get prediction details
        classes = {v: k for k, v in class_indices.items()}
        predicted_class = classes[np.argmax(prediction)]
        confidence = float(np.max(prediction))

        # Get Gemini AI advice
        gemini_advice = get_gemini_advice(predicted_class, confidence)

        return jsonify({
            'prediction': predicted_class,
            'confidence': confidence,
            'advice': gemini_advice
        }), 200

    except Exception as e:
        print(f"Prediction error: {str(e)}")
        return jsonify({'error': 'Prediction failed'}), 500

    finally:
        os.remove(temp_path)  # Clean up temporary file



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
