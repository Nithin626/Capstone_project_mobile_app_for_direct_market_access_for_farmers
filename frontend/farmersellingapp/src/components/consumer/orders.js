import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Card, Row, Col,Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../header';
import Footer from '../footer';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import apiClient from '../../util';


function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    useEffect(() => {
        const fetchOrders = async () => {
          setLoading(true);
          try {
            const username = localStorage.getItem('username');
            if (!username) throw new Error('User not logged in');
            
            const response = await axios.get(
              `http://localhost:5000/api/orders/by-username/${username}`
            );
            setOrders(response.data.orders);
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
        fetchOrders();
      }, []);
  
    if (loading) {
      return (
        <Container className="py-5 text-center">
          <Spinner animation="border" variant="primary" />
          <div>Loading orders...</div>
        </Container>
      );
    }
  
    if (error) {
      return (
        <Container className="py-5">
          <Alert variant="danger">{error}</Alert>
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
                        <h1 className="main-title">My Orders</h1>
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
        <div className="br-item"><a className="br-link" href="/">Home</a><span className="br-divider rtl-flip"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M264.547 70.633L440.547 238.633C445.297 243.164 447.984 249.445 447.984 256.008S445.297 268.852 440.547 273.383L264.547 441.383C254.953 450.508 239.766 450.164 230.609 440.57C221.453 431.07 221.797 415.82 231.422 406.633L364.09 280.008H24C10.75 280.008 0 269.258 0 256.008S10.75 232.008 24 232.008H364.09L231.422 105.383C221.797 96.227 221.453 80.977 230.609 71.445C239.766 61.852 254.953 61.508 264.547 70.633Z"></path></svg></span></div><div className="br-item"><span className="br-text">Orders</span><span className="br-divider rtl-flip"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M264.547 70.633L440.547 238.633C445.297 243.164 447.984 249.445 447.984 256.008S445.297 268.852 440.547 273.383L264.547 441.383C254.953 450.508 239.766 450.164 230.609 440.57C221.453 431.07 221.797 415.82 231.422 406.633L364.09 280.008H24C10.75 280.008 0 269.258 0 256.008S10.75 232.008 24 232.008H364.09L231.422 105.383C221.797 96.227 221.453 80.977 230.609 71.445C239.766 61.852 254.953 61.508 264.547 70.633Z"></path></svg></span></div>    </div>
     
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

    <Container className="py-5">
      <h2 className="mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <Alert variant="info">No orders found.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Total</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Delivery Address</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>₹{order.total}</td>
                <td>{order.status}</td>
                <td>{order.payment_method}</td>
                <td>{order.delivery_address}</td>
                <td>
                  <ul className="mb-0">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name} x {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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

export default Orders;
