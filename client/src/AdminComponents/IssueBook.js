import React, { useEffect, useState } from 'react';
import './AddBook.css';
import axios from 'axios';
import './AllUsers.css';

const IssueBook = () => {
  const [books, setBooks] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [userId, setUserId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/')
      .then((result) => {
        setBooks(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleIssueClick = (book) => {
    setSelectedBook(book);
    setShowPopup(true);
  };

  const handleInputChange = (e) => {
    setUserId(e.target.value);
  };

  const handleConfirmIssue = () => {
    console.log(`Book ${selectedBook.name} issued to User ${userId}!`);
    const updateDetails = {
      UserId: userId,
      BookId: selectedBook._id
    };

    axios.put('http://localhost:3001/update', updateDetails)
      .then(() => {
        console.log('Book issued successfully!');
        setBooks(prevBooks => prevBooks.map(book => 
          book._id === selectedBook._id ? {...book, state: 0} : book
        ));
      })
      .catch((error) => {
        console.error('Error issuing book:', error);
      });

    setShowPopup(false);
  };

  const filteredBooks = books.filter((book) => book.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <div className='outerBox'>
        <input
          type='text'
          className='search-box'
          placeholder='Search by Book Name'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className='outerBox'>
        {filteredBooks.map((book) => (
          <div className='userBox' key={book._id}>
            <h3 className='user-detail'>{book.name}</h3>
            <h3 className='user-detail'>{book.authour}</h3>
            <div className='user-detail'>
              {book.state !== 0 ? (
                <button className='issueBtn' onClick={() => handleIssueClick(book)}>
                  Issue book
                </button>
              ) : (
                <h5>Not Available</h5>
              )}
            </div>
          </div>
        ))}
        {showPopup && (
          <div className='editFormContainer'>
            <div className='editFormBackdrop'></div>
            <div className='editForm'>
              <h4>Issue Book</h4>
              <div>
                <label>Book Name:</label>
                <input type='text' value={selectedBook?.name} readOnly />
              </div>
              <div>
                <label>User Id:</label>
                <input type='text' onChange={handleInputChange} value={userId} />
              </div>
              <div className='editFormButtons'>
                <button onClick={() => setShowPopup(false)}>Cancel</button>
                <button onClick={handleConfirmIssue} className='issueBtn'>Issue</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default IssueBook;
