import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../header';
import Footer from '../footer';
import axios from 'axios';

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [role, setRole] = useState(null);
  const [negotiateAmount, setNegotiateAmount] = useState('');
  const [negotiationStatus, setNegotiationStatus] = useState(''); // 'pending', 'approved', 'rejected'

  useEffect(() => {
    // On mount, get cart and role from localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) setCart(JSON.parse(storedCart));
    const storedRole = localStorage.getItem('role');
    if (storedRole) setRole(storedRole);

    // Restore negotiation status if present
    const storedStatus = localStorage.getItem('negotiationStatus');
    // const storedAmount = localStorage.getItem('negotiatedAmount');
    //if (storedAmount) setNegotiateAmount(storedAmount);
    if (storedStatus) setNegotiationStatus(storedStatus);
  }, []);

  const negotiateStatus = localStorage.getItem('negotiationStatus') ;
  const negotiatedAmount = localStorage.getItem('negotiatedAmount'); 
  useEffect(() => {
    if (negotiationStatus === 'pending') {
        const interval = setInterval(async () => {
            const negotiationId = localStorage.getItem('negotiationStatusId');
            
            try {
                const response = await axios.post('http://localhost:5000/api/negotiations/status-by-id', {
                    id: negotiationId
                });

                if (response.data.status === 'approved' || response.data.status === 'rejected') {
                    setNegotiationStatus(response.data.status);
                    setNegotiateAmount(response.data.negotiatedAmount || '');
                    
                    // Store in localStorage
                    localStorage.setItem('negotiationStatus', response.data.status);
                    localStorage.setItem('negotiatedAmount', response.data.negotiatedAmount || '');
                    
                    
                    clearInterval(interval);
                }
            } catch (error) {
                console.error('Polling error:', error);
                clearInterval(interval);
            }
        }, 3000);

        return () => clearInterval(interval);
    }
}, [negotiationStatus]);



  // Remove item from cart
  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + (item.price * item.quantity), 0
  );

  // Apply negotiation
  const handleApplyNegotiate = async () => {
    const username = localStorage.getItem('username');
    try {
      const response = await fetch('http://localhost:5000/api/negotiations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          negotiatedAmount: Number(negotiateAmount),
          originalAmount: totalPrice,
          items: cart,
          username: username,
        }),
      });
      if (response.ok) {

        const data = await response.json();
        console.log('Negotiation response:', data);
        localStorage.setItem('negotiationStatusId', data.id);
        localStorage.setItem('negotiationStatus', 'pending');
        setNegotiationStatus('pending');
      } else {
        setNegotiationStatus('rejected');
        localStorage.setItem('negotiationStatus', 'rejected');
      }
    } catch (error) {
      setNegotiationStatus('rejected');
      localStorage.setItem('negotiationStatus', 'rejected');
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    if (negotiationStatus === 'approved') {
      setNegotiationStatus('approved');
      navigate(`/consumer/checkout?amount=${negotiateAmount}`);
    } else {
      
      navigate(`/consumer/checkout?amount=${totalPrice}`);
    }
  };

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
    <Container className="mt-4 mb-5">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>₹{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.price * item.quantity}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <h4>Total Price: ₹{negotiationStatus === 'approved' ? negotiateAmount : totalPrice}</h4>
            <Card className="mt-3">
              <Card.Body>
                <Row>
                  <Col md={3}>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter negotiation amount"
                      value={negotiateAmount}
                      min={1}
                      onChange={(e) => setNegotiateAmount(e.target.value)}
                      disabled={negotiationStatus === 'pending'}
                    />
                  </Col>
                  <Col md={3}>
                    <Button
                      variant="warning"
                      onClick={handleApplyNegotiate}
                      disabled={
                        !negotiateAmount ||
                        negotiationStatus === 'pending' ||
                        Number(negotiateAmount) >= totalPrice
                      }
                    >
                      Apply Negotiation
                    </Button>
                  </Col>
                </Row>
                <br/>
                {negotiationStatus === 'pending' && (
                  <Alert variant="info" className="mt-3">
                    Negotiation request pending approval
                  </Alert>
                )}
                {negotiationStatus === 'approved' && (
                  <Alert variant="success" className="mt-3">
                    Negotiation approved! New total: ₹{negotiateAmount}
                  </Alert>
                )}
                {negotiationStatus === 'rejected' && (
                  <Alert variant="danger" className="mt-3">
                    Negotiation rejected. Original total: ₹{totalPrice}
                  </Alert>
                )}
              </Card.Body>
            </Card>
            <br/>
            <Button
              variant="primary"
              className="mt-3"
              onClick={handleCheckout}
              disabled={cart.length === 0}
            >
              Proceed to Checkout ({negotiationStatus === 'approved'
                ? `₹${negotiateAmount}`
                : `₹${totalPrice}`})
            </Button>
          </>
        )}
      </Container>

</div>
            </div>
            </div>
            <Footer />  
        </div>

    </div>
  );
}

export default Cart;
