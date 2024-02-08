import React from 'react';
import { Link } from 'react-router-dom';
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
            profile
          </Link>
        </li>
        <li>
          <Link to="/BooksTaken" onClick={handleNavItemClick}>
            Books Taken
          </Link>
        </li>
        <li>
          <Link to="/avail" onClick={handleNavItemClick}>
            Books Available
          </Link>
        </li>
      </ul>
      <div className="HeaderButtons">
        <Link to='/'>
          <button className='logOutBtn' onClick={handleLogout}>
            logout
          </button>
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
