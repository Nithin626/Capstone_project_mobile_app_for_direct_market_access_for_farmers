import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from './util'; // Use the shared axios instance

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!username.trim() || !email.trim() || !password.trim()) {
            setError('All fields are required');
            return;
        }
        
        console.log(username, email, password);

        try {
          
            // Send registration request to the server
            const response = await apiClient.post('/register', {
                username: username.trim(),
                email: email.trim(),
                password: password.trim(),
                "role": "farmer" // Default role for new users
            });

            if (response.status === 201) {
                navigate('/'); // Redirect to login page after successful registration
            }
        } catch (error) {
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        setError('Invalid form data');
                        break;
                    case 500:
                        setError('Server error. Please try later');
                        break;
                    default:
                        setError('Registration failed');
                }
            } else {
                setError('Network error. Please check your connection');
            }
        }
    };

  return (
    <>
<div className="register-box">
  <div className="register-logo">
    <a href=""><b>Krop</b>Cart</a>
  </div>
  <div className="register-box-body">
    <p className="login-box-msg">Register a new membership</p>
    <form onSubmit={handleSubmit}>
      <div className="form-group has-feedback">
        <input type="text" className="form-control" placeholder="User name" value={username} onChange={(e) => setUsername(e.target.value)} />
        <span className="glyphicon glyphicon-user form-control-feedback" />
      </div>
      <div className="form-group has-feedback">
        <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <span className="glyphicon glyphicon-envelope form-control-feedback" />
      </div>
      <div className="form-group has-feedback">
        <input type="password" className="form-control" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
        <span className="glyphicon glyphicon-lock form-control-feedback" />
      </div>
      <div className="row">
        {/* /.col */}
        <div className="col-xs-4">
          <button type="submit" className="btn btn-primary btn-block btn-flat">Register</button>
        </div>
        {/* /.col */}
      </div>
    </form>
    {error && <p className="error-message">{error}</p>}
    <a href="/login" className="text-center">I already have a membership</a>
  </div>
  {/* /.form-box */}
</div>


    </>
  );
}

export default Register;
