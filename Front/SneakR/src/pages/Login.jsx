import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Chrome, Facebook, Apple } from "lucide-react"


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // eslint-disable-next-line no-useless-catch
    try {
      let response = await fetch(import.meta.env.VITE_APP_LOGIN_ROUTE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "*",
        },
        body: JSON.stringify({'email':email, 'password':password})
      })
      if (response.ok) {
        alert('Login successful');
        navigate('/products');
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
            <h1 className="text-2xl font-bold">Sign in</h1>
            <p className="text-sm text-gray-500">Enter your email and password to login</p>
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c33035]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c33035]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-black hover:bg-gray-800 text-white font-semibold rounded-md transition duration-200"
            >
              Sign In
            </button>
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
              <button className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition duration-200">
                <Facebook className="w-5 h-5 mr-2" />
                Facebook
              </button>
              <button className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition duration-200">
                <Apple className="w-5 h-5 mr-2" />
                Apple
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}