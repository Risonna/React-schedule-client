import React from 'react';

import { useState } from 'react';

import './register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
  });

  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState(null);

  const { username, password, passwordConfirm, email } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== passwordConfirm) {
      setError('Passwords do not match');
      return;
    }
  
    try {
      const response = await fetch(
        'http://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: username,
            password: password,
            passwordConfirm: passwordConfirm,
            email: email,
          }),
        }
      );
  
      if (response.ok) {
        setIsRegistered(true);
      } else {
        setError('Failed to register user');
      }
    } catch (error) {
      setError('Failed to register user');
    }
  };
  

  return (
    <div className="register-container">
      <h2>Register Page</h2>
      {isRegistered ? (
        <div>
          <p>Registration successful! You can now login.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <input
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <button type="submit">Register</button>
          {error && <p>{error}</p>}
        </form>
      )}
    </div>
);


}

export default Register;
