const User =require('../Models/UserModel')
  
const  ParticularUser= async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.send(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
  
const UserLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user by email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const AllUsers =async (req, res) => {
  try {
      const allUsers = await User.find();
      console.log(allUsers)
      res.json(allUsers);
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
}

const UpdateUser =async(req,res)=>{
  try {
      const id=req.body.id;
      const toupdate=req.body;
      const update=await User.findByIdAndUpdate(id,toupdate)
      res.send(update);
  } catch (error) {
      console.error('Error fetching User by ID:', error);
      res.status(500).json({ error: 'Internal server error'});
  }
}
const deleteUser =async(req,res)=>{
  try {
    const id=req.params.id;
    const deleted=await User.findByIdAndDelete(id);
    res.send(deleted)
  }
   catch (error) {
    console.error('Error fetching User by ID:', error);
    res.status(500).json({ error: 'Internal server error'});
  }
}
const CreateUser = async (req, res) => {
  try {
    const UserDetails = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      number: req.body.number,
      address: req.body.address,
      books: [],
    };

    const addUser = await User.create(UserDetails);
    return res.send(UserDetails);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports ={ AllUsers ,UpdateUser ,deleteUser ,CreateUser ,ParticularUser,UserLogin}