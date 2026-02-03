import React, { useState } from 'react';
import axios from 'axios';
import './loginregister.css'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5005/login', {
                username: username,
                password: password,
            });

            if (response.status === 200) {
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = '/StartPage';
            } else {
                setError('Login failed. Please check your username and password.');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <h1 className="login-title">Login</h1>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="login-form">
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

                <button type="submit" className="login-button">Login</button>
            </form>

            <a href="/register" className="register-link">Register</a>
        </div>
    );
}

export default Login;