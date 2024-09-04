import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let authenticated = false;

    if (username === 'admin' && password === 'password') {
      authenticated = true;
      localStorage.setItem('isAuthenticated', authenticated);
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleGoogleSuccess = (response) => {
    const { credential } = response;
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('googleToken', credential);
    navigate('/');
  };

  const handleGoogleFailure = () => {
    console.error('Google Sign In was unsuccessful.');
    alert('Google Sign In was unsuccessful.');
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <p>Or sign in with Google:</p>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleFailure}
        text="signin_with"
        shape="rectangular"
        theme="outline"
        size="large"
        width="300"
      />

      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
}
