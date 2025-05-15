// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../util';
import Header from './header';
import Footer from './footer';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await apiClient.post('/login', {
        username: username.trim(),
        password: password.trim(),
      });

      if (response.data && response.data.user) {
        const role = response.data.user.role;
        const username = response.data.user.username;
        const email = response.data.user.email;
        localStorage.setItem('username', username); // Store the username in local storage for later use 
        localStorage.setItem('email', email); // Store the email in local storage for later use  
        localStorage.setItem('role', role); // Store the role in local storage for later use
        console.log('User role:', role); // Debugging line

        
        const cart = localStorage.getItem('cart');
        if (cart) {
          navigate('/consumer/cart');
        }
        else{
          navigate('/consumer/products');
        }
          
     
      }
      
      setError('');
      
    } catch (err) {
      if (err.response) {
        switch (err.response.status) {
          case 400:
            setError('Missing username or password');
            break;
          case 401:
            setError('Invalid username or password');
            break;
          case 500:
            setError('Server error. Please try again later.');
            break;
          default:
            setError('Login failed. Please try again.');
        }
      } else if (err.request) {
        setError('No response from server. Check your network connection.');
      } else {
        setError(`Login failed: ${err.message}`);
      }
    }
  };

    return (
        <>
<div id="pxl-page" className="pxl-page header-pos-df">
  <Header />

  <div id="pxl-pagetitle" className="pxl-pagetitle layout-df relative has-parallax overflow-hidden pxl-animate">
    <div className="pxl-page-title-bg pxl-absoluted" data-parallax="{&quot;y&quot;:&quot;80&quot;}" style={{transform: 'translate3d(0px, 80px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1) scaleZ(1)', WebkitTransform: 'translate3d(0px, 80px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1) scaleZ(1)'}} />
    <div className="pxl-page-title-overlay" />
    <div className="container relative">
      <div className="pxl-page-title-inner row align-content-center">
        <div className="pxl-page-title col-12">
          <h1 className="main-title">Login</h1>
        </div>
        <div className="pxl-breadcrumb d-flex">
          <div className="breadcrumb-inner">
            <div className="br-item"><a className="br-link hover-underline" href="#">Home</a><span className="br-divider"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M264.547 70.633L440.547 238.633C445.297 243.164 447.984 249.445 447.984 256.008S445.297 268.852 440.547 273.383L264.547 441.383C254.953 450.508 239.766 450.164 230.609 440.57C221.453 431.07 221.797 415.82 231.422 406.633L364.09 280.008H24C10.75 280.008 0 269.258 0 256.008S10.75 232.008 24 232.008H364.09L231.422 105.383C221.797 96.227 221.453 80.977 230.609 71.445C239.766 61.852 254.953 61.508 264.547 70.633Z" /></svg></span></div><div className="br-item"><span className="br-text">Login</span><span className="br-divider"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M264.547 70.633L440.547 238.633C445.297 243.164 447.984 249.445 447.984 256.008S445.297 268.852 440.547 273.383L264.547 441.383C254.953 450.508 239.766 450.164 230.609 440.57C221.453 431.07 221.797 415.82 231.422 406.633L364.09 280.008H24C10.75 280.008 0 269.258 0 256.008S10.75 232.008 24 232.008H364.09L231.422 105.383C221.797 96.227 221.453 80.977 230.609 71.445C239.766 61.852 254.953 61.508 264.547 70.633Z" /></svg></span></div>                                  </div>
        </div>
      </div>
    </div>
  </div>
  <div id="pxl-main" className="pxl-main">
    <div className="container pxl-content-container">
      <div className="row pxl-content-wrap no-sidebar">
        <div id="pxl-content-area" className="pxl-content-area content-page col-12">
          <main id="pxl-content-main" className="pxl-content-main">
            <article id="post-562" className="post-562 page type-page status-publish hentry">
              <div className="pxl-entry-content clearfix">
                <div className="woocommerce"><div className="woocommerce-notices-wrapper" /> 
                  <div className="pxl-myaccount-login-reg-form d-flex justify-content-center">
                    <div className="pxl-login-form active">
                      <h3>Sign In</h3>
                      <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit">Login</button>
            <p>Don't have an account? <a href="/register">Register here</a></p>
            {error && <p className="error-message">{error}</p>}
        
        </form>
                    </div>
                  </div>
                </div>  </div> 
            </article> 
          </main>
        </div>
      </div>
    </div>
  </div>{/* #main */}

  <Footer />
</div>

        </>
    );
}

export default LoginPage;
