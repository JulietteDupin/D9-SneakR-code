import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa'
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import logo from '../assets/logo_brand.png'

export default function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!firstName || !lastName || !password || !email) {
      setError('Please fill in all fields');
      return;
    }

    try {
      let response = await fetch(import.meta.env.VITE_APP_USERS_ROUTE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "*",
        },
        body: JSON.stringify({ "firstName": firstName, "lastName": lastName, "email": email, "password": password })
      })

      const data = await response.json();

      if (response.ok) {
        console.log('User created')
        navigate('/login');
      } else {
        console.error(response)
        setError("User not created")
      }
    } catch (error) {
      console.error('Error:', error)
      setError(error.message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#c33035' }}>
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex mb-10 justify-center">
          <img className="h-20 w-30 mt-5" src={logo}></img>
        </div>
        <form onSubmit={handleRegister} className="space-y-4">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="relative">
            <Input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="pl-10"
            />
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="relative">
            <Input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="pl-10"
            />
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="relative">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10"
            />
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="relative">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10"
            />
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="relative">
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="pl-10"
            />
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white">
            Register
          </Button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}