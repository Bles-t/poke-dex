import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5005/login', {
                username: username,
                password: password
            });

            if (response.status === 200) {

                // Set login status in localStorage
                localStorage.setItem('isLoggedIn', 'true');
                // Redirect to the home page after successful login
                window.location.href = '/StartPage';
            } else {
                // Set error message
                setError('Login failed. Please check your username and password.');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div>
            <h1>Login</h1>

            {/* Display error message if it exists */}
            {error && <div>{error}</div>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Login</button>
            </form>

            <a href="/register">Register</a>
        </div>
    );
}

export default Login;
