import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa'

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
    <div className='wrapper'>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className='input-box'>
          <input type="text" placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          <FaUser className='icon' />
        </div>

        <div className='input-box'>
          <input type="text" placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          <FaUser className='icon' />
        </div>

        <div className='input-box'>
          <input type="text" placeholder='Email address' value={email} onChange={(e) => setEmail(e.target.value)} required />
          <FaUser className='icon' />
        </div>

        <div className='input-box'>
          <input type="text" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          <FaLock className='icon' />
        </div>

        <div className='input-box'>
          <input type="text" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <FaLock className='icon' />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
