//Main imports
const express = require('express');
const jwt = require("json-web-token");
const mongoose = require('mongoose');
const cors = require('cors');

//Models
const  Slides  =  './Models/Slides';
const  User  = './Models/User';

app = express();

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

    const { username, password, photo } = req.body;
  
    // Check if the username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ message: 'Username already taken' });
    }
  
    // Create a new user
    const user = new User({ username, password, photo });
    try {
      await user.save();
      return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
