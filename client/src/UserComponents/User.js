import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import UserHeader from './UserHeader';
import UserDetails from './UserDetails';
import UserBooksTaken from './UserBooksTaken';
import TotalBooksUser from './TotalBooksUser';
import axios from 'axios';
import App from '../App';

const User = ({userData}) => {
  const [books,setBooks]=useState([]);
  useEffect(()=>{
      axios.get('http://localhost:3001/').then((result) => {
        setBooks(result.data)
          console.log(result);       
      }).catch((err) => {
          console.log(err)
      });
  },[]);
  return (
    <div>
      <UserHeader />
      <Routes>
        <Route path='/' element={<UserDetails userData={userData} />} />
        <Route path='/BooksTaken' element={<UserBooksTaken userData={userData}/>} />
        <Route path='/avail' element={<TotalBooksUser booksdata={books} />} />
        <Route path='/login' element={<App/>} />
      </Routes>
    </div>
  );
}

export default User;
