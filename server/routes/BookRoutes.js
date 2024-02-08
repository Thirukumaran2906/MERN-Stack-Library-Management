const express =require('express');
const router =express.Router();


const {AllBooks ,CreateBook ,fetchbook , UpdateBook ,DeleteBook,ReturnBook, UpdateReturn } =require('../controllers/BookController')

router.get('/',AllBooks);

router.post('/books',CreateBook)

router.get('/books/:id', fetchbook);

router.put('/books/:id', UpdateBook)

router.delete('/books/:id', DeleteBook)

router.put('/return', );

router.put('/update',UpdateReturn);
router.put('/return', ReturnBook);


module.exports =router
