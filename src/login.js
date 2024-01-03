import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuthComponent = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', password: '' });
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const username = localStorage.getItem('username');
    if (username) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.get(`http://localhost:8184/users?username=${loginData.username}`);
      const ss = response.data[0].username;
      localStorage.setItem('username', ss);
      setLoggedIn(true);
      window.location.href = '../../'; // Redirect after login
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  const handleRegister = async () => {
    try {
      // Check if the username already exists
      const usernameExists = await axios.get(`http://localhost:8184/users?username=${registerData.username}`);
      
      if (usernameExists.data.length > 0) {
        alert('Username already exists. Please choose a different username.');
        return; // Stop the registration process
      }
  
      // Continue with registration if username doesn't exist
      const response = await axios.post('http://localhost:8184/user', registerData);
      const { token, username } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      setLoggedIn(true);
      window.location.href = '../../'; // Redirect after registration
    } catch (error) {
      setError('Registration failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setLoggedIn(false);
  };

  return (
    <div className="container mt-5" style={{ backgroundColor: '#000', color: '#00ab41', padding: '20px', borderRadius: '10px' }}>
      {isLoggedIn ? (
        <div>
          <h2 className="mb-4">Welcome, {localStorage.getItem('username')}! You are logged in.</h2>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <div className="mb-3">
            <label htmlFor="loginUsername" className="form-label text-light">
              Username
            </label>
            <input
              type="text"
              id="loginUsername"
              className="form-control bg-dark text-light"
              value={loginData.username}
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="loginPassword" className="form-label text-light">
              Password
            </label>
            <input
              type="password"
              id="loginPassword"
              className="form-control bg-dark text-light"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
          </div>
          <button className="btn btn-primary" style={{ backgroundColor: '#00ab41' }} onClick={handleLogin}>
            Login
          </button>
          <p className="text-danger mt-2">{error}</p>

          <h2 className="mt-4">Register</h2>
          <div className="mb-3">
            <label htmlFor="registerUsername" className="form-label text-light">
              Username
            </label>
            <input
              type="text"
              id="registerUsername"
              className="form-control bg-dark text-light"
              value={registerData.username}
              onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="registerPassword" className="form-label text-light">
              Password
            </label>
            <input
              type="password"
              id="registerPassword"
              className="form-control bg-dark text-light"
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            />
          </div>
          <button className="btn btn-success" style={{ backgroundColor: '#00ab41' }} onClick={handleRegister}>
            Register
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthComponent;
