const CheckRegister = () => {
    const registerUser = async () => {
        const apiUrl = 'http://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/api/auth/register'; // Replace with the actual URL of your Java server's registration endpoint
      
        const userData = {
          name: 'JohnDoe14', // Replace with a valid username
          password: 'Password123H', // Replace with a strong password
          passwordConfirm: 'Password123H', // Replace with the same password as above
          email: 'john.doe@example.com', // Replace with a valid email address
        };
      
        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });
      
          if (response.ok) {
            console.log('User registration successful!');
          } else if (response.status === 400) {
            console.error('Invalid input data. Please check your username, password, and email.');
          } else if (response.status === 409) {
            console.error('Password and password confirmation do not match.');
          } else {
            console.error('User registration failed. Please try again later.');
          }
        } catch (error) {
          console.error('An error occurred during user registration:', error);
        }
      };
      
      registerUser();
    return ( 
        ''
     );
}
 
export default CheckRegister;
  