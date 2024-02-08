const Book =require('../Models/BooksModel')
const User =require('../Models/UserModel')


const AllBooks = async (req, res) => {
    try {
        const allBooks = await Book.find();
        console.log(allBooks)
        res.json(allBooks);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

const CreateBook =async(req,res)=>{
    try {
     const bookDetails={
         name:req.body.name,
         authour:req.body.authour,
         rate:req.body.rate,
         quantity:req.body.quantity
     }
     const addbook=await Book.create(bookDetails)
     return res.send(bookDetails);
     
    } catch (error) {
     res.status(500)
    }
}

const fetchbook=async (req, res) => {
    try {
      const id = req.params.id;
      const findbook = await Book.findById(id);
      if (!findbook) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.json(findbook);
    } catch (error) {
      console.error('Error fetching book by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}
const  UpdateBook =async(req,res)=>{
    try {
        const id=req.body.id;
        toupdate=req.body;
        const update=await Book.findByIdAndUpdate(id,toupdate)
        res.send(update);
    } catch (error) {
        console.error('Error fetching book by ID:', error);
        res.status(500).json({ error: 'Internal server error'});
    }
}

const DeleteBook =async(req,res)=>{
    try {
      const id=req.params.id;
      const deleted=await Book.findByIdAndDelete(id);
      res.send(deleted)
    }
     catch (error) {
      console.error('Error fetching book by ID:', error);
      res.status(500).json({ error: 'Internal server error'});
    }
}
const ReturnBook =async (req, res) => {
    try {
      const { BookId, UserId } = req.body;
      const updateBook = await Book.findByIdAndUpdate(BookId, { $set: { state: "1" } });
      const toupdateBook = await Book.findById(BookId)
  
      const user = await User.findById(UserId);
      const bookIndex = user.books.findIndex(book => book._id.toString() === BookId);
      if (bookIndex !== -1) {
        user.books.splice(bookIndex, 1);
      }
      await user.save();
      res.json({ message: 'Book returned successfully', updatedUser: user });
    } catch (error) {
      console.error('Error returning book:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}
const UpdateReturn = async (req, res) => {
    try {
      const { BookId, UserId } = req.body;
      const toupdateBook = await Book.findById(BookId)
      const updatedBook = await Book.findByIdAndUpdate(BookId,{ $set: { state:"0"} })
      if (updatedBook) {
        const user = await User.findById(UserId);
        user.books.push(toupdateBook)
        await user.save();
      }
      res.end()
  ;    
    } catch (error) {
      console.error('Error updating book and user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports ={AllBooks ,CreateBook ,fetchbook , UpdateBook ,DeleteBook,ReturnBook, UpdateReturn }