//Main imports
const express = require('express');
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const cors = require('cors');

//Models
const Schema = mongoose.Schema;

//userSchema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  progress: [{
    topic: {
      type: String,
      required: true
    },
    completedPercent: {
      type: Number,
      required: true,
      default: 0
    }
  }]
});


const User = mongoose.model('User', userSchema);


app = express();
app.use(express.json());

//Database linker
mongoose.connect('mongodb+srv://afmtoday:OlxwPFCF0rLMnA3e@cluster0.edrrjyh.mongodb.net/bebblocky?retryWrites=true&w=majority')
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB', err));


//Application authorization
app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false
  }));


//Sign up endpoint
app.post('/signup', async (req, res) => {

    const data = req.body;
  
    // Check if the username already exists
    const existingUser = await User.findOne({ username:data.username });

    if (existingUser) {
      return res.status(409).json({ message: 'Username already taken' });
    }

  
    // Create a new user
    const user = new User(req.body);
    try {
      await user.save();
      return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  

app.post('/signin', async (req, res)=>{

  try {
      const { username , password } = req.body;

      const userCheck = await User.findOne({username : username, password : password});

      if (!userCheck){
        throw new Error('Invalid username or password');
      }

      const token = jwt.sign({userId: userCheck._id}, process.env.JWT_SECRET || "Ananya");

      res.json({userCheck, token});

  }catch(error){
    res.status(401).json({ error: error.message });

  }
});
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log("Listening on port");
});


module.exports = app;