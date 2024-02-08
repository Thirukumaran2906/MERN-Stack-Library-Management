const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors=require('cors');
const userRoutes =require('./routes/UserRoutes')
const BookRoutes =require('./routes/BookRoutes')
mongoose.connect('mongodb://localhost:27017/library');

app.use(cors())
app.use(express.json())


app.use('/',userRoutes,BookRoutes)



app.listen(3001, () => {
    console.log('Server started');
});
