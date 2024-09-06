import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { FaUser, FaLock } from 'react-icons/fa'

import '../../css/login.css'

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = await fetch(import.meta.env.VITE_APP_LOGIN_ROUTE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);

        alert('Login successful');
        navigate('/products');
      } else {
        alert('Credentials are invalid');
      }
    } catch (error) {
      console.error('Error during login', error);
    }
  };

  const handleGoogleSuccess = (response) => {
    const { credential } = response;
    localStorage.setItem('token', credential);
    alert('Google login successful');
    navigate('/products');
  };

  const handleGoogleFailure = () => {
    console.error('Google Sign In was unsuccessful.');
    alert('Google Sign In was unsuccessful.');
  };

  return (
    <div className='wrapper'>
      <h1>Welcome back</h1>
      <form onSubmit={handleSubmit}>
        <div className='input-box'>
          <input type="text" placeholder='Email address' value={email} onChange={(e) => setEmail(e.target.value)} required />
          <FaUser className='icon' />
        </div>
        <div className='input-box'>
          <input type="text" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          <FaLock className='icon' />
        </div>
        <div className='remember-forgot'>
          <a href='#'>Forgot password?</a>
        </div>

        <button type="submit">Login</button>

        <p>Or sign in with Google:</p>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
          text="signin_with"
          shape="rectangular"
          theme="outline"
          size="large"
        />

        <div className='register-link'>
          <p>Don't have an account ? <Link to="/register">Register</Link></p>
        </div>
      </form>
    </div>
  );
}


