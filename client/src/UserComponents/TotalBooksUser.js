import React, { useState } from 'react';
import './Header.css';
import axios from 'axios';
import './booksavail.css'
const TotalBooksUser = ({ booksdata }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBooks = booksdata.filter((book) =>
    book.name.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  return (
    <div>

      <div className='outerBox'>
      <input
        type="text"
        className='search-box'
        placeholder="Search books"
        value={searchQuery}
        onChange={handleSearch}
      />
        {filteredBooks.map((book) => (
          <div className="book-avail" key={book.id}>
            <p className="avail-book-detail">{book.name}</p>
            <p className="avail-book-detail">Author: {book.authour}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TotalBooksUser;
