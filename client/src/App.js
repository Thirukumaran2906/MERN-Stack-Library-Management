import React, { useState, useEffect } from 'react';
import User from './UserComponents/User';
import Admin from './AdminComponents/Admin';
import './App.css';
import axios from 'axios';
const App = () => {

  useEffect(() => {
    SetopenUser(false);
    SetopenAdmin(false);
  }, []); 

  const [openUser, SetopenUser] = useState(false);
  const [openAdmin, SetopenAdmin] = useState(false);
  const [openHome, SetopenHome] = useState(true);

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  
  const [userData, SetUserData] = useState({});
  const [adminData, setAdminData] = useState({});

  const logUser = (event) => {
    event.preventDefault(); 
    fetchUserData(userEmail, userPassword, 'user')
   
  };

  const logAdmin = (event) => {
    event.preventDefault(); 
    fetchAdminData(adminEmail, adminPassword, 'admin')
  };

  const fetchUserData = (email, password, role) => {
    email = email.toLowerCase();
    password = password.toLowerCase();
    const body = { email, password, role };
    axios.post('http://localhost:3001/login', body)
      .then((response) => {
        const result = response.data; 
        if (result && result.email === email && result.password === password) {
          console.log(result.password)
          SetUserData(result)
          SetopenUser(true);
          SetopenHome(false)
        } else {
          console.log("Invalid credentials");
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };
  const fetchAdminData = (email, password, role) => {
    email = email.toLowerCase();
    password = password.toLowerCase();
    const body = { email, password, role };
    axios.post('http://localhost:3001/login', body)
      .then((response) => {
        const result = response.data; 
        if (result && result.email === email && result.password === password) {
          console.log(result.password)
          SetUserData(result)
          SetopenUser(false);
          SetopenHome(false)
          SetopenAdmin(true)

        } else {
          console.log("Invalid credentials");
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };
  
  return (
      <div className='App'>
        {openHome && (
          <div className='user-form'>
            <form onSubmit={logUser}>
              <input
                type='text'
                placeholder='User Email'
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <input
                type='password'
                placeholder='Password'
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
              <button type='submit'>Submit</button>
            </form>
          </div>
        )}
        {openHome && (
          <div className='user-form'>
            <form onSubmit={logAdmin}>
              <input
                type='text'
                placeholder='Admin Email'
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
              />
              <input
                type='password'
                placeholder='Password'
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
              />
              <button type='submit'>Submit</button>
            </form>
          </div>
        )}
        {openUser && <User userData={userData}/>}
        {openAdmin && <Admin adminData={adminData} />}
      </div>
  );
};

export default App;
