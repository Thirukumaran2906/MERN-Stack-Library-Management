const UserBooksTaken = ({ userData }) => {
  const books = userData?.books || [];

  return (
    <div className='outerBox'>
      {books.map((book) => (
        <div className="book-avail" key={book.id}>
          <p className="avail-book-detail">name: {book.name}</p>
          <p className="avail-book-detail">Author: {book.authour}</p>
        </div>
      ))}
    </div>
  );
};

export default UserBooksTaken;
