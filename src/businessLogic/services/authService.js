import jwtDecode from 'jwt-decode';
const login = async (username, password, onLoginSuccess, setError) => {
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
  
        return { success: true };
      } else if (response.status === 400) {
        setError('Invalid username.');
      } else if (response.status === 401) {
        setError('Authentication failed. Invalid username or password.');
      } else {
        setError('Login failed.');
      }
  
      return { success: false };
    } catch (error) {
      setError('Error during login:', error);
      return { success: false };
    }
  };
  
  export default { login };
  