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
      const usernameExists = await axios.get(`http://localhost:8184/users?username=${loginData.username}`);
      
      if (usernameExists.data.length > 0) {
        alert('این نام کاربی قبلا انتخاب شده نام دیگری انتخاب کن!');
        return; // Stop the registration process
      }
  
      // Continue with registration if username doesn't exist
      const response = await axios.post('http://localhost:8184/users', loginData);
      const response2 = await axios.get(`http://localhost:8184/users?username=${loginData.username}`);
      const ss = response2.data[0].username;
      localStorage.setItem('username', ss);
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
    <div className="container  w-50" style={{ backgroundColor: '#000', color: '#00ab41', padding: '20px', borderRadius: '10px',fontSize:"large",marginTop:"170px" }}>
      {isLoggedIn ? (
        <div>
          <h2 className="mb-4">Welcome, {localStorage.getItem('username')}! You are logged in.</h2>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className=''>
          <h2 className='d-flex justify-content-center' style={{direction:"rtl"}}>ورود و ثبت نام</h2>
          <div style={{direction:"rtl"}}  className="mb-3">
            <label htmlFor="loginUsername" style={{direction:"rtl"}} className="form-label text-light">
              نام کاربری
            </label>
            <input
              type="text"
              id="loginUsername"
              className="form-control bg-dark text-light"
              value={loginData.username}
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            />
          </div>
          <div style={{direction:"rtl"}}  className="mb-3">
            <label htmlFor="loginPassword" className="form-label text-light">
              رمز عبور
            </label>
            <input
              type="password"
              id="loginPassword"
              className="form-control bg-dark text-light"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
          </div>
          <button className="btn btn-primary m-2" style={{ backgroundColor: '#00ab41',border:"solid 0px black",fontSize:"large",width:"47%" }} onClick={handleLogin}>
            ورود
          </button>
          <button className="btn btn-success  m-2" style={{ backgroundColor: '#00ab41',fontSize:"large",width:"47%" }} onClick={handleRegister}>
            ثبت نام
          </button>
          <p className="text-danger mt-2">{error}</p>

          
        </div>
      )}
    </div>
  );
};

export default AuthComponent;
