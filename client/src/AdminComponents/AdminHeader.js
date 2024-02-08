import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { RiMenu2Line } from 'react-icons/ri';

const UserHeader = () => {
  const handleNavItemClick = () => {
    document.querySelector('.User-Header').classList.remove('active');
  };
  const handleLogout = () => {
    window.location.reload();
  };
  return (
    <header className="User-Header">
      <ul className="nav">
        <li>
          <Link to="/" onClick={handleNavItemClick}>
            IssueBook
          </Link>
        </li>
        <li>
          <Link to="/users" onClick={handleNavItemClick}>
            Users
          </Link>
        </li>
        <li>
          <Link to="/books" onClick={handleNavItemClick}>
            Books
          </Link>
        </li>
        <li>
          <Link to="/addBook" onClick={handleNavItemClick}>
            Add-Book
          </Link>
        </li>
        <li>
          <Link to="/adduser" onClick={handleNavItemClick}>
            Add-User
          </Link>
        </li>
      </ul>
      <div className="HeaderButtons">
        <Link to='/'>
          <button className='logOutBtn' onClick={handleLogout}>logout</button>
        </Link>
        <RiMenu2Line
          className='resNav'
          onClick={() => document.querySelector('.nav').classList.toggle('active')}
        />
      </div>
    </header>
  );
};

export default UserHeader;
