const express =require('express');
const router =express.Router();

const {AllUsers ,UpdateUser ,deleteUser ,CreateUser ,ParticularUser,UserLogin} =require('../controllers/userController')


router.get('/users/:id',ParticularUser );
  
router.post('/login',UserLogin );
  
router.get('/users', AllUsers);
  
router.put('/users/:id',UpdateUser)
  
router.delete('/users/:id',deleteUser)
  
router.post('/users',CreateUser);

module.exports=router