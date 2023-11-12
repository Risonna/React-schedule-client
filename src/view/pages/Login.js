import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const { username, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'http://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      if (response.ok) {
        const jsonResponse = await response.json();
        const token = jsonResponse.token;

        // Save the token to local storage
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        const role = decodedToken.role;
        setError(null);
        onLoginSuccess(role); // Call the function passed from the Header component

        // Clear the form data
        setFormData({ username: '', password: '' });
        navigate('/');
      } else if (response.status === 400) {
        setError('Invalid username.');
      } else if (response.status === 401) {
        setError('Authentication failed. Invalid username or password.');
      } else {
        setError('Login failed.');
      }
    } catch (error) {
      setError('Error during login:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
