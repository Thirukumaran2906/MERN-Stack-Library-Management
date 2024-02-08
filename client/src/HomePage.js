import React, { useState } from 'react';

const HomePage = () => {
  const [userCredentials, setUserCredentials] = useState({
    userUsername: '',
    userPassword: '',
    adminUsername: '',
    adminPassword: '',
  });
  const handleUserLogin = () => {
    console.log('User Login:', userCredentials.userUsername, userCredentials.userPassword);
  };

  const handleAdminLogin = () => {
    console.log('Admin Login:', userCredentials.adminUsername, userCredentials.adminPassword);
  };

  const handleChange = (event, userType) => {
    const { name, value } = event.target;
    setUserCredentials((prevCredentials) => ({
      ...prevCredentials,
      [`${userType}${name}`]: value,
    }));
  };

  return (
    <div>
      <div>
        <h2>User Login</h2>
        <form>
          <label>
            Username:
            <input
              type="text"
              name="Username"
              value={userCredentials.userUsername}
              onChange={(e) => handleChange(e, 'user')}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="Password"
              value={userCredentials.userPassword}
              onChange={(e) => handleChange(e, 'user')}
            />
          </label>
          <br />
          <button type="button" onClick={handleUserLogin}>
            Login
          </button>
        </form>
      </div>

      <div>
        <h2>Admin Login</h2>
        <form>
          <label>
            Username:
            <input
              type="text"
              name="Username"
              value={userCredentials.adminUsername}
              onChange={(e) => handleChange(e, 'admin')}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="Password"
              value={userCredentials.adminPassword}
              onChange={(e) => handleChange(e, 'admin')}
            />
          </label>
          <br />
          <button type="button" onClick={handleAdminLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
