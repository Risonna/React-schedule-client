const CheckLogin = () => {
  const loginUser = async () => {
    const loginData = {
      username: 'Beba25', // Replace with a valid username
      password: 'Beba2525', // Replace with a valid password
    };

    try {
      const response = await fetch(
        'http://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        }
      );

      if (response.ok) {
        // Parse the JSON response to get the token
        try {
          const jsonResponse = await response.json();
          const token = jsonResponse.token;
          console.log('Token:', token);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
        console.log('Login successful!');
        // Handle successful login here (e.g., set authentication state, redirect, etc.)
      } else if (response.status === 400) {
        console.log('Invalid username.');
      } else if (response.status === 401) {
        console.log('Authentication failed. Invalid username or password.');
      } else {
        console.log('Login failed.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  loginUser();
  return (
    <></>
  );
}

export default CheckLogin;

