import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from './util';

function Login() {
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
        localStorage.setItem('role', role); // Store the role in local storage for later use
        console.log('User role:', role); // Debugging line
        
      
        
          navigate('/farmer/dashboard'); // Redirect to the farmer dashboard
     
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
<div className="login-box">
  <div className="login-logo">
    <a href=""><b>Krop</b>Cart</a>
  </div>
  {/* /.login-logo */}
  <div className="login-box-body">
    <p className="login-box-msg">Sign in to start your session</p>
    <form onSubmit={handleSubmit}>
      <div className="form-group has-feedback">
        <input type="text" className="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <span className="glyphicon glyphicon-envelope form-control-feedback" />
      </div>
      <div className="form-group has-feedback">
        <input type="password" className="form-control" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
        <span className="glyphicon glyphicon-lock form-control-feedback" />
      </div>
      <div className="row">

        {/* /.col */}
        <div className="col-xs-4">
          <button type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button>
        </div>
        {/* /.col */}
      </div>
    </form >
    {error && <p className="error-message">{error}</p>}
    <a href="/register" className="text-center">Register a new membership</a>
  </div>
  {/* /.login-box-body */}
</div>

    </>
  );
}

export default Login;
