import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/home';
import ConsumerPage from './components/consumer/consumerpage';
import CheckoutPage from './components/consumer/checkoutpage';
import Cart from './components/consumer/cart';
import Login from './components/login';
import Register from './components/register';
import About from './components/aboutus';
import Orders from './components/consumer/orders';

function App() {
    const [role, setRole] = useState(null);

    useEffect(() => {
        const storedRole = localStorage.getItem('role');
        setRole(storedRole);
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/aboutus" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/consumer/products" element={<ConsumerPage />} />
                <Route path="/consumer/cart" element={<Cart />} />
                <Route path="/consumer/checkout" element={<CheckoutPage />} />
                <Route path="/consumer/orders" element={<Orders />} />  

                
                {/* Block Other Routes */}
                {/* <Route path="*" element={<Navigate to="/register" replace />} /> */}
            </Routes>
        </Router>
    );
   
}

export default App;
