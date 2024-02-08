import React, { useState } from 'react';
import axios from 'axios';
import './AddBook.css';

const AddBook = () => {
  const [formData, setFormData] = useState({
    name: '',
    authour: '',
    rate: '',
    quantity: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const bookDetails = {
        name: formData.name,
        authour: formData.authour,
        rate: formData.rate,
        quantity: formData.quantity
      };

      const response = await axios.post('http://localhost:3001/books', bookDetails);

      console.log('Book added successfully:', response.data);

      setFormData({
        name: '',
        authour: '',
        rate: '',
        quantity: ''
      });
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className="AddBookContainer">
      <h2>Add Book</h2>
      <form className="AddBookForm" onSubmit={handleSubmit}>
        <label>
          Name of Book:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        </label>
        <label>
          Author:
          <input type="text" name="authour" value={formData.authour} onChange={handleInputChange} required />
        </label>
        <label>
          Rate:
          <input type="text" name="rate" value={formData.rate} onChange={handleInputChange} required />
        </label>
        <label>
          Quantity:
          <input type="text" name="quantity" value={formData.quantity} onChange={handleInputChange} required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddBook;
