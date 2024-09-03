import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // eslint-disable-next-line no-useless-catch
    try {
      let response = await fetch(import.meta.env.VITE_APP_USERS_ROUTE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "*",
        },
        body: JSON.stringify({'email':email, 'password':password})
      })
      if (response.ok) {
        alert('Login successful');
        navigate('/');
      } else {
        alert('Invalid credentials');
      }
    } catch(error) {
        throw error
    }
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('password', password);
    localStorage.setItem('email', email);
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
          <label>Email: </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
