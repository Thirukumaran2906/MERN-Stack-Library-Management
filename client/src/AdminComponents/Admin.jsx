import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import axios from 'axios';
import IssueBook from './IssueBook';
import CrudBooks from './CrudBooks';
import AllUsers from './AllUsers';
import AdminHeader from './AdminHeader'
import AddUser from './AddUser';
import AddBook from './AddBook';
import UserBooksView from './UserBooksView';
const Admin = () => {
  const [books,setBooks]=useState([]);
  const [users,setUsers]=useState([]);
  useEffect(()=>{
      axios.get('http://localhost:3001/').then((result) => {
        setBooks(result.data)
          console.log(result);       
      }).catch((err) => {
          console.log(err)
      });
      axios.get('http://localhost:3001/users').then((result) => {
        setUsers(result.data)
          console.log(result);       
      }).catch((err) => {
          console.log(err)
      });
  },[]);
  return (
    <div className='admin'>
      <AdminHeader />
      <Routes>
        <Route path='/' element={<IssueBook />} />
        <Route path='/books' element={<CrudBooks booksdata={books} />} />
        <Route path='/users' element={<AllUsers Users={users}/>} />
        <Route path='/addBook' element={<AddBook />} />
        <Route path='/addUser' element={<AddUser />} />
        <Route path='/users/:id' element={<UserBooksView />} />
      </Routes>
    </div>
  );
}

export default Admin;
