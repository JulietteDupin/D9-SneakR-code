import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import {  Facebook, Apple } from "lucide-react"
import logo from '../assets/logo_brand.png'
import '../../css/login.css'
import { Button } from '../components/ui/button';

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

        if (data.isAdmin == 0) {
          navigate('/products');
        } else {
          localStorage.setItem('admin', true);
          navigate('/admin/home');
        }
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
    <div className="min-h-screen flex items-center justify-center bg-[#c33035]">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="space-y-1 text-center">
          <div className="flex mb-10 justify-center">
          <img className="h-20 w-30 mt-5" src={logo}></img>
        </div>
          </div>
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
                theme="outline"
                size="large"
                width="300"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition duration-200">
                <Facebook className="w-5 h-5 mr-2" />
                Facebook
              </ Button>
              <Button className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition duration-200">
                <Apple className="w-5 h-5 mr-2" />
                Apple
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
