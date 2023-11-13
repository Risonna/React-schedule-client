const register = async (username, password, passwordConfirm, email, setIsRegistered, setError) => {
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
  
  export default { register };
  