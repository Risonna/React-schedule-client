import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ loggedIn, onLogout }) => {
  const navigate = useNavigate();

  const logOut = () => {
    onLogout(); // Call the function to update the loggedIn state in the App component
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {!loggedIn ? (
            <li>
              <Link to="/login">Login</Link>
            </li>
          ) : (
            <li style={{ visibility: 'hidden' }}>
              <Link to="/login">Login</Link>
            </li>
          )}
          {!loggedIn ? (
            <li>
              <Link to="/register">Register</Link>
            </li>
          ) : (
            <li style={{ visibility: 'hidden' }}>
              <Link to="/register">Register</Link>
            </li>
          )}
          {loggedIn && <button onClick={logOut}>Log out</button>}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
