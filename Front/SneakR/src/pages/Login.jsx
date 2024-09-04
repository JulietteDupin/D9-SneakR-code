import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

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
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
