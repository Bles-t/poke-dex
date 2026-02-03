import React, { useState } from 'react';
import axios from 'axios';
import './loginregister.css'; // Import the shared CSS file for styling

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5005/register', {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        // Redirect to login page
        window.location.href = '/login';
      } else {
        // Handle error
        console.error('Registration failed');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>

      <form onSubmit={handleSubmit} className="register-form">
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <button type="submit" className="register-button">Register</button>
      </form>

      {/* Link to login page */}
      <a href="/login" className="login-link">Login</a>
    </div>
  );
}

export default Register;
