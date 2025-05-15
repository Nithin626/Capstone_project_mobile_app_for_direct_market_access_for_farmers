import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../header';
import Footer from '../footer';

function ConsumerPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = React.useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/get_products')
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // consumerpage.js
const addToCart = (product) => {
  toast.success("Item added on cart successfully", { position: "top-right", autoClose: 3000 });
  setCart(prevCart => {
    const existingItem = prevCart.find(item => item.id === product.id);
    if (existingItem) {
      return prevCart.map(item =>
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }
    return [...prevCart, { ...product, quantity: 1 }];
  });
};

useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cart));
}, [cart]);


 
    return (

        <div>
                    <div id="pxl-page" className="pxl-page header-pos-df">
                <Header />

  <div id="pxl-pagetitle" className="pxl-pagetitle layout-df relative has-parallax overflow-hidden pxl-animate">
                    <div className="pxl-page-title-bg pxl-absoluted" data-parallax="{&quot;y&quot;:&quot;80&quot;}"></div>
                    <div className="pxl-page-title-overlay"></div>
                    <div className="container relative">
                        <div className="pxl-page-title-inner row align-content-center">
                            <div className="pxl-page-title col-12">
                                                                    <div className="sub-title">Buy Health Foods At Our Store</div>
                                                                <h1 className="main-title">Shop products</h1>
                            </div>
                                                            <div className="pxl-breadcrumb d-flex">
                                    <div className="breadcrumb-inner">
                                        <div className="br-item"><a className="br-link hover-underline" href="/">Home</a><span className="br-divider"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M264.547 70.633L440.547 238.633C445.297 243.164 447.984 249.445 447.984 256.008S445.297 268.852 440.547 273.383L264.547 441.383C254.953 450.508 239.766 450.164 230.609 440.57C221.453 431.07 221.797 415.82 231.422 406.633L364.09 280.008H24C10.75 280.008 0 269.258 0 256.008S10.75 232.008 24 232.008H364.09L231.422 105.383C221.797 96.227 221.453 80.977 230.609 71.445C239.766 61.852 254.953 61.508 264.547 70.633Z"></path></svg></span></div><div className="br-item"><span className="br-text">Products</span><span className="br-divider"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M264.547 70.633L440.547 238.633C445.297 243.164 447.984 249.445 447.984 256.008S445.297 268.852 440.547 273.383L264.547 441.383C254.953 450.508 239.766 450.164 230.609 440.57C221.453 431.07 221.797 415.82 231.422 406.633L364.09 280.008H24C10.75 280.008 0 269.258 0 256.008S10.75 232.008 24 232.008H364.09L231.422 105.383C221.797 96.227 221.453 80.977 230.609 71.445C239.766 61.852 254.953 61.508 264.547 70.633Z"></path></svg></span></div>                                    </div>
                                </div>
                                                    </div>
                    </div>
                </div>

                        <div id="pxl-main" className="pxl-main" style={{paddingTop: '70px'}}>
<div className="container">
    <div className="row pxl-shop-loop-content pxl-content-wrap has-sidebar sidebar-left">
    <Container>
      <center><h1>Products</h1></center>
      <ToastContainer />
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <Row>
          {products.map((product) => (
            <>
            <Col key={product.id} xs={12} md={3}>
            
          
              <div className="card mb-3">
              <Card.Img variant="top" src={product.image} alt={product.title} style={{ height: '150px', objectFit: 'cover' }} />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  <p>Price: {product.price}</p>
                  <button onClick={() => addToCart(product)}className="btn btn-primary btn-sm" style={{fontSize:'10px', padding: '7px 25px 7px 25px'}}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </Col>
          </>
            
          ))}
        </Row>
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

export default ConsumerPage;
