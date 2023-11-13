import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Header = ({onLogout }) => {
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const userRole = useSelector((state) => state.auth.userRole);

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
