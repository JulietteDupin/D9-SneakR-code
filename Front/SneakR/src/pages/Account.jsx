import React, { useState, useEffect } from 'react';
import getUserIdFromToken from '../tools/handleJWT';

import '../../css/account.css';

export default function Account() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = getUserIdFromToken();
      if (!userId) {
        setError('User not found. Please login again.');
        Navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_APP_USERS_ROUTE}/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUser({
            firstName: data.firstname,
            lastName: data.lastname,
            email: data.email,
            password: ''
          });
        } else {
          setError('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = async () => {
    setEditMode(false);
    const userId = getUserIdFromToken();
    if (!userId) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_USERS_ROUTE}/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        setPasswordUpdated(true);
        console.log('Informations updated');
      } else {
        setError('Failed to update user data');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };

  return (
    <div className="profile-page">
      <h1>My Account</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="profile-details">
        <div className="profile-field">
          <label>First Name</label>
          {editMode ? (
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
            />
          ) : (
            <p>{user.firstName}</p>
          )}
        </div>

        <div className="profile-field">
          <label>Last Name</label>
          {editMode ? (
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
            />
          ) : (
            <p>{user.lastName}</p>
          )}
        </div>

        <div className="profile-field">
          <label>Email</label>
          {editMode ? (
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          ) : (
            <p>{user.email}</p>
          )}
        </div>

        <div className="profile-field">
          <label>Password</label>
          {editMode ? (
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter new password"
            />
          ) : passwordUpdated ? (
            <p>••••••••••</p>
          ) : (
            <p>••••••••••</p>
          )}
        </div>

        <div className="profile-actions">
          {editMode ? (
            <button onClick={handleSave}>Save Changes</button>
          ) : (
            <button onClick={() => setEditMode(true)}>Edit Profile</button>
          )}
        </div>
      </div>
    </div>
  );
}
