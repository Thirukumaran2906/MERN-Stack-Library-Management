import React, { useState } from 'react';
import axios from 'axios';
import './AddBook.css'; 

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    number: '',
    address: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const NewUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        number: formData.number,
        address:formData.address
      };

      const response = await axios.post('http://localhost:3001/users', NewUser);

      console.log('user added successfully:', response.data);

      setFormData({
        name: '',
        email: '',
        password: '',
        number: '',
        address: '',
      });
    } catch (error) {
      console.error('Error adding User:', error);
    }
  };

  return (
    <div className="AddBookContainer">
      <h2>Add User</h2>
      <form className="AddBookForm" onSubmit={handleSubmit}>
        <label>
          Name :
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        </label>
        <label>
          Email :
          <input type="text" name="email" value={formData.email} onChange={handleInputChange} required />
        </label>
        <label>
          Password :
          <input type="text" name="password" value={formData.password} onChange={handleInputChange} required />
        </label>
        <label>
          Number :
          <input type="text" name="number" value={formData.number} onChange={handleInputChange} required />
        </label>
        <label>
          Address :
          <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />
        </label>
   
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
