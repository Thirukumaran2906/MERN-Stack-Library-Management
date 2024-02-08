import axios from 'axios';
import React, { useState } from 'react';
import { MdModeEditOutline, MdDelete } from 'react-icons/md';
import './AllUsers.css';

const CrudBooks = ({ booksdata }) => {
  const [editBook, setEditBook] = useState(null);
  const [editedValues, setEditedValues] = useState({ id: '', name: '', authour: '', rate: '' });
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteBookId, setDeleteBookId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleEditClick = (book) => {
    setEditBook(book);
    setEditedValues({ id: book._id, name: book.name, authour: book.authour, rate: book.rate });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleEditSubmit = () => {
    axios.put(`http://localhost:3001/books/${editedValues.id}`, editedValues)
      .then((response) => console.log('Data sent successfully:', response.data))
      .catch((error) => console.error('Error sending data:', error));
    setEditBook(null);
  };

  const handleDeleteClick = (bookId) => {
    setDeleteBookId(bookId);
    setShowDeletePopup(true);
  };

  const handleDeleteConfirm = () => {
    axios.delete(`http://localhost:3001/books/${deleteBookId}`)
      .then((response) => console.log('Data deleted successfully:', response.data))
      .catch((error) => console.error('Error deleting data:', error));

    setShowDeletePopup(false);
    setDeleteBookId(null);
  };

  const handleDeleteCancel = () => {
    setShowDeletePopup(false);
    setDeleteBookId(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBooks = booksdata.filter((book) =>
    book.name.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  return (
    <div className='outerBox'>
  <input
        type="text"
        className='search-box'
        placeholder="Search books"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {editBook && (
        <div className='editFormContainer'>
          <div className='editFormBackdrop'></div>
          <div className='editForm'>
            <h4>Edit Book</h4>
            <form>
              <label>ID:</label>
              <input type='text' name='id' value={editedValues.id} readOnly />
              <label>Name:</label>
              <input type='text' name='name' value={editedValues.name} onChange={handleInputChange} />
              <label>Author:</label>
              <input type='text' name='authour' value={editedValues.authour} onChange={handleInputChange} />
              <label>Rate:</label>
              <input type='text' name='rate' value={editedValues.rate} onChange={handleInputChange} />
              <div className='editFormButtons'>
                <button type='button' onClick={handleEditSubmit}>Submit</button>
                <button type='button' onClick={() => setEditBook(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeletePopup && (
        <div className='deletePopup'>
          <p>Are you sure you want to delete this book?</p>
          <div className='deletePopupButtons'>
            <button onClick={handleDeleteConfirm}>Yes</button>
            <button onClick={handleDeleteCancel}>No</button>
          </div>
        </div>
      )}

      {filteredBooks.map((book) => (
        <div className='userBox' key={book._id}>
          <h4 className='user-detail'>{book.name}</h4>
          <h4 className='user-detail'>{book.authour}</h4>
          <h4 className='user-detail'>{book.rate}</h4>
          <div className='user-detail'>
            <MdModeEditOutline onClick={() => handleEditClick(book)} />
            <MdDelete onClick={() => handleDeleteClick(book._id)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CrudBooks;
