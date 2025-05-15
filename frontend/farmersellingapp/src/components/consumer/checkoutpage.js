import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import Header from '../header';
import Footer from '../footer';

function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});
  const [total, setTotal] = useState(0);
  const [deliveryType, setDeliveryType] = useState('select');
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [finalTotal, setFinalTotal] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get amount from URL
  const amount = searchParams.get('amount');

  // Load cart and user data
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    let userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      const username = localStorage.getItem('username') || '';
      const email = localStorage.getItem('email') || '';
      userData = { name: username, email: email };
    }
    setCart(cartData);
    setUser(userData);
  }, []);

  // Set total from URL or cart
  useEffect(() => {
    if (amount) {
      setTotal(Number(amount));
    } else {
      const cartData = JSON.parse(localStorage.getItem('cart')) || [];
      const cartTotal = cartData.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      setTotal(cartTotal);
    }
  }, [amount]);

  // Update delivery charge and final total
  useEffect(() => {
    if (deliveryType === 'home') {
      setDeliveryCharge(100);
      setFinalTotal(total + 100);
    } else {
      setDeliveryCharge(0);
      setFinalTotal(total);
    }
  }, [deliveryType, total]);

  // Utility to remove emojis from a string
function removeEmojis(str) {
  if (typeof str !== 'string') return str;
  // Regex to remove most emojis
  return str.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2702}-\u{27B0}\u{24C2}-\u{1F251}]/gu, '');
}

// In your handleCOD and handleOnlinePayment, sanitize all user input fields:
const handleCOD = async (event) => {
  event.preventDefault();
  setErrorMessage('');

  const orderData = {
    user: removeEmojis(user.name),
    email: user.email,
    mobile: removeEmojis(mobileNumber),
    items: cart,
    total: finalTotal,
    paymentMethod: 'COD',
    deliveryAddress: removeEmojis(deliveryAddress),
    status: 'pending'
  };

  try {
    const response = await axios.post('http://localhost:5000/api/orders', orderData, {
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.status === 201) {
      localStorage.removeItem('cart');
      localStorage.removeItem('negotiatedAmount');
      localStorage.removeItem('negotiationStatus');
      localStorage.removeItem('negotiationStatusId');
      // Clear cart and other local storage items
      setOrderPlaced(true);
      setErrorMessage('');
      setTimeout(() => navigate('/consumer/orders'), 2000);
    }
  } catch (error) {
    setErrorMessage(error.response?.data?.error || 'Order submission failed');
  }
};

const handleOnlinePayment = async () => {
  setErrorMessage('');

  // 1. Create Razorpay order on backend
  let razorpayOrder;
  try {
    const orderRes = await axios.post('http://localhost:5000/api/create-razorpay-order', {
      amount: finalTotal,
      // Optionally, add sanitized fields if backend expects them
      receipt: removeEmojis('order_' + Date.now()),
      notes: removeEmojis('Online payment')
    });
    razorpayOrder = orderRes.data;
  } catch (e) {
    setErrorMessage('Failed to initiate payment. Try again.');
    return;
  }

  // ... rest of your Razorpay code remains the same

  const openRazorpay = (razorpayOrder) => {
    const options = {
      key: "rzp_test_EBKVVFnmZwp7s4",
      name: removeEmojis(user.name),
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      description: "Order Payment",
      order_id: razorpayOrder.id,
      handler: async function (response) {
        try {
          const verifyRes = await axios.post('http://localhost:5000/api/orders', {
            user: removeEmojis(user.name),
            email: user.email,
            mobile: removeEmojis(mobileNumber),
            items: cart,
            total: finalTotal,
            paymentMethod: 'online',
            deliveryAddress: removeEmojis(deliveryAddress),
            status: 'paid',
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature
          }, { headers: { 'Content-Type': 'application/json' } });

          if (verifyRes.status === 201) {
            localStorage.removeItem('cart');
            localStorage.removeItem('negotiatedAmount');
            localStorage.removeItem('negotiationStatus');
            localStorage.removeItem('negotiationStatusId');
            // Clear cart and other local storage items
            setOrderPlaced(true);
            setErrorMessage('');
            setTimeout(() => navigate('/consumer/orders'), 2000);
          }
        } catch (error) {
          setErrorMessage('Payment verification failed. Please contact support.');
        }
      },
      prefill: {
        name: removeEmojis(user.name),
        email: user.email,
        contact: removeEmojis(mobileNumber)
      },
      theme: { color: "#F37254" }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (!window.Razorpay) {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => openRazorpay(razorpayOrder);
    script.onerror = () => setErrorMessage('Failed to load payment gateway.');
  } else {
    openRazorpay(razorpayOrder);
  }
};


  if (orderPlaced) {
    return (
      <Container className="mt-5">
        <Alert variant="success">Order placed successfully! Redirecting...</Alert>
      </Container>
    );
  }

    return (
        <div>
              <div id="pxl-page" className="pxl-page header-pos-df">
                <Header />
  <div id="pxl-pagetitle" className="pxl-pagetitle layout-el relative has-parallax overflow-hidden pxl-animate">
                    <div className="pxl-page-title-bg pxl-absoluted" data-parallax="{&quot;y&quot;:&quot;80&quot;}" ></div>
                    <div className="pxl-page-title-overlay"></div>
                    		<div data-elementor-type="wp-post" data-elementor-id="9260" className="elementor elementor-9260">
				        <section className="elementor-section elementor-top-section elementor-element elementor-element-90fca8f elementor-section-full_width elementor-section-height-default elementor-section-height-default pxl-section-static-pos-no pxl-section-overflow-hidden-no pxl-container-margin-auto-no" data-id="90fca8f" data-element_type="section">

        <div className="pxl-section-divider-bot-img"></div>        
                <div className="elementor-container elementor-column-gap-default ">
                <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-255ff1b pxl-column-element-default pxl-column-overflow-hidden-no" data-id="255ff1b" data-element_type="column">
        <div className="elementor-widget-wrap elementor-element-populated">
                    		<div className="elementor-element elementor-element-8161a3f elementor-widget elementor-widget-pxl_page_title" data-id="8161a3f" data-element_type="widget" data-widget_type="pxl_page_title.default">
				<div className="elementor-widget-container">
			<div className="pxl-pt-wrap d-flex">
    <div className="pxl-page-title-inner">
        <div className="pxl-page-title">
                            <div className="sub-title">Buy Health Foods At Our Store </div>
                        <h1 className="main-title">Shop products</h1>
        </div>
    </div> 
</div>		</div>
				</div>
				<div className="elementor-element elementor-element-883e586 elementor-widget elementor-widget-pxl_image" data-id="883e586" data-element_type="widget" data-widget_type="pxl_image.default">
				<div className="elementor-widget-container">
			<div id="pxl_image-883e586-3758" className="pxl-image-wg d-flex pxl-draw-from-left default pxl-animated">
			<img width="240" height="9" src="https://demo.7iquid.com/donalfarm/wp-content/uploads/2024/09/pt-shape-after.svg" className="attachment-full size-full wp-image-9265" alt=""/>			</div>		</div>
				</div>
				<div className="elementor-element elementor-element-8876014 elementor-widget elementor-widget-pxl_breadcrumb" data-id="8876014" data-element_type="widget" data-widget_type="pxl_breadcrumb.default">
				<div className="elementor-widget-container">
			<div className="pxl-brc-wrap d-flex">
    <div className="brc-inner">
        <div className="br-item"><a className="br-link" href="https://demo.7iquid.com/donalfarm/">Home</a><span className="br-divider rtl-flip"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M264.547 70.633L440.547 238.633C445.297 243.164 447.984 249.445 447.984 256.008S445.297 268.852 440.547 273.383L264.547 441.383C254.953 450.508 239.766 450.164 230.609 440.57C221.453 431.07 221.797 415.82 231.422 406.633L364.09 280.008H24C10.75 280.008 0 269.258 0 256.008S10.75 232.008 24 232.008H364.09L231.422 105.383C221.797 96.227 221.453 80.977 230.609 71.445C239.766 61.852 254.953 61.508 264.547 70.633Z"></path></svg></span></div><div className="br-item"><span className="br-text">Products</span><span className="br-divider rtl-flip"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M264.547 70.633L440.547 238.633C445.297 243.164 447.984 249.445 447.984 256.008S445.297 268.852 440.547 273.383L264.547 441.383C254.953 450.508 239.766 450.164 230.609 440.57C221.453 431.07 221.797 415.82 231.422 406.633L364.09 280.008H24C10.75 280.008 0 269.258 0 256.008S10.75 232.008 24 232.008H364.09L231.422 105.383C221.797 96.227 221.453 80.977 230.609 71.445C239.766 61.852 254.953 61.508 264.547 70.633Z"></path></svg></span></div>    </div>
     
</div>		</div>
				</div>
		                    </div>
        </div>
        			</div>
		</section>
				</div>
		                </div>
                        <div id="pxl-main" className="pxl-main">
                        <div className="container">
    <div className="row pxl-shop-loop-content pxl-content-wrap has-sidebar sidebar-left">
    <Container className="mt-5">
      <h2>Checkout</h2>
      <Row>
        <Col md={8}>
          <Form onSubmit={handleCOD}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name : {user.name}</Form.Label>
            </Form.Group>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email: {user.email}</Form.Label>
            </Form.Group>
            <Form.Group controlId="deliveryType" className="mb-3">
              <Form.Label>Delivery Type</Form.Label>
              <Form.Select value={deliveryType} onChange={e => setDeliveryType(e.target.value)} required>
                <option value="select" disabled>Select Delivery Type</option>
                <option value="pickup">Pickup (Free)</option>
                <option value="home">Home Delivery (+₹100)</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="deliveryAddress" className="mb-3">
              <Form.Label>Delivery Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter delivery address"
                value={deliveryAddress}
                onChange={e => setDeliveryAddress(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="mobileNumber" className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter mobile number"
                value={mobileNumber}
                onChange={e => setMobileNumber(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Order Summary</Form.Label>
              <ul>
                {cart.map((item, idx) => (
                  <li key={idx}>{item.title} x {item.quantity} - ₹{item.price * item.quantity}</li>
                ))}
              </ul>
              <div>Total: ₹{total}</div>
              <div>Delivery: ₹{deliveryCharge}</div>
              <div><strong>Final Total: ₹{finalTotal}</strong></div>
            </Form.Group>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Button variant="success" type="submit" className="me-2">Place Order (COD)</Button>
            <Button variant="primary" type="button" onClick={handleOnlinePayment}>Pay Online (Razorpay)</Button>
          </Form>
        </Col>
      </Row>
    </Container>
        </div>
        </div>
        </div>
        <Footer />
        </div>

    </div>
    
        
    );
}

export default CheckoutPage;
