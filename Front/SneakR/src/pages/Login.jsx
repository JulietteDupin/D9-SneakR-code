import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { AlertCircle, CheckCircle } from "lucide-react";
import logo from '../assets/logo_brand.png';
import { Button } from '../components/ui/button';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import '../../css/login.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [shouldNavigate, setShouldNavigate] = useState(false);
  useEffect(() => {
    if (shouldNavigate) {
      setTimeout(() => {
        navigate('/products');
      }, 2000);
    }
  }, [shouldNavigate, navigate]);

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

        setMessage('Login successful');
        setAlertType('success');
        setShouldNavigate(true);
      } else {
        setMessage('Credentials are invalid');
        setAlertType('error');
      }
    } catch (error) {
      console.error('Error during login', error);
      setMessage('Error during login. Please try again later.');
      setAlertType('error');
    }
  };

  const handleGoogleSuccess = (response) => {
    const { credential } = response;
    localStorage.setItem('token', credential);

    setMessage('Google login successful');
    setAlertType('success');
    setShouldNavigate(true);
  };

  const handleGoogleFailure = () => {
    setMessage('Google Sign In was unsuccessful.');
    setAlertType('error');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#c33035]">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="space-y-1 text-center">
            <div className="flex mb-10 justify-center">
              <img className="h-20 w-30 mt-5" src={logo} alt="Logo" />
            </div>
          </div>
          
          {message && (
            <Alert
              variant={alertType === 'success' ? 'success' : 'destructive'}
              style={{
                position: 'fixed',
                bottom: '20px',  
                right: '20px',   
                zIndex: 1000,    
                width: '300px',
                backgroundColor: '#fff', 
              }}
            >
              {alertType === 'success' ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertTitle>{alertType === 'success' ? 'Success' : 'Error'}</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c33035]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c33035]"
              />
            </div>
            <Button
              type="submit"
              className="w-full py-2 px-4 bg-black hover:bg-gray-800 text-white font-semibold rounded-md transition duration-200"
            >
              Log In
            </Button>
          </form>
          
          <div className="text-sm text-center space-y-2">
            <a href="#" className="text-[#c33035] hover:underline">Forgot password?</a>
            <p>Don't have an account? <Link to="/register" className="text-[#c33035] hover:underline">Register here</Link></p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className='flex items-center justify-center'>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
                text="signin_with"
                shape="rectangular"
                theme="filled_blue"
                size="large"
                width="300"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
