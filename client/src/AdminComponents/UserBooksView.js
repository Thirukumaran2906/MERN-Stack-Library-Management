import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './AllUsers.css'
const UserBooksView = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/${id}`);
        setUserData(response.data.books);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [id]);

  const returnBook = (bookId) => {
    const returnBookData = {
      UserId: id,
      BookId: bookId
    };

    axios.put('http://localhost:3001/return', returnBookData)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className='outerBox'>
      {userData != null && userData.length >= 1 ? (
        <div>
          {userData.map((book) => (
            <div key={book._id} className='tookBook'>
              <h3 className='tookBookName'>{book.name}</h3>
              <button onClick={() => returnBook(book._id)} className='returnbtn'>Return</button>
            </div>
          ))}
        </div>
      ) : (
        <h3>No Books Taken by the User</h3>
      )}
    </div>
  );
};

export default UserBooksView;
