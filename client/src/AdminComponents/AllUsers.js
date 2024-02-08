import axios from 'axios';
import React, { useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { MdModeEditOutline, MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import './AllUsers.css';

const AllUsers = ({ Users }) => {
  const [editUser, setEditUser] = useState(null);
  const [editedValues, setEditedValues] = useState({ id: '', name: '', email: '', number: '', address: '' });
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleEditClick = (user) => {
    setEditUser(user);
    setEditedValues({ id: user._id, name: user.name, email: user.email, address: user.address, number: user.number });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleEditSubmit = () => {
    axios.put(`http://localhost:3001/users/${editedValues.id}`, editedValues)
      .then((response) => console.log('Data sent successfully:', response.data))
      .catch((error) => console.error('Error sending data:', error));
    setEditUser(null);
  };

  const handleDeleteClick = (userId) => {
    setDeleteUserId(userId);
    setShowDeletePopup(true);
    console.log(userId);
  };

  const handleDeleteConfirm = () => {
    axios.delete(`http://localhost:3001/users/${deleteUserId}`)
      .then((response) => console.log('Data deleted successfully:', response.data))
      .catch((error) => console.error('Error deleting data:', error));
    setShowDeletePopup(false);
    setDeleteUserId(null);
  };

  const handleDeleteCancel = () => {
    setShowDeletePopup(false);
    setDeleteUserId(null);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = Users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  return (
    <div className='outerBox'>
      <input
      type='text'
      className='search-box'
      placeholder='Search by User Name'
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
 

      {editUser && (
        <div className='editFormContainer'>
          <div className='editFormBackdrop'></div>
          <div className='editForm'>
            <h4>Edit User</h4>
            <form className='editformMain'>
            </form>
          </div>
        </div>
      )}

      {showDeletePopup && (
        <div className='deletePopup'>
        </div>
      )}

      {filteredUsers.map((user) => (
        <div className='userBox' key={user._id}>
            <h3 className='user-detail'>{user.name}</h3>
            <h3 className='user-detail'>{user.email}</h3>
            <h3 className='user-detail'>{user.number}</h3>
            <Link to={`/users/${user._id}`}><button className='issueBtn'>books taken</button></Link>
        </div>
      ))}
    </div>
  );
};

export default AllUsers;
