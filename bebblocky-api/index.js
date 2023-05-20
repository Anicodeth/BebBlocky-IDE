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
    slideId: {
      type: Number,
      required: true
    },
    completedPercent: {
      type: Number,
      required: true,
      default: 0
    }
  }]
});


const slideSchema = new Schema({
  slideId: {
    type:Number,
    required: true
  }, 
  title: {
    type: String,
    required: true
  },
  slides: [{
    backgroundColor: 
    {
      type: String,
      required: true
    },
    font: {
      type: String,
      required: true
    },
    title:  {
        type: String,
        required: true
      },
    content: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    // other relevant fields here
  }]

});


const Slide = mongoose.model('Slide', slideSchema);

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


const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    jwt.verify(token, 'Ananya', (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid token' });
      }
  
      req.user = decoded;
      next();
    });
  };


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


// GET /slides/:slide_id endpoint with JWT authentication
app.get('/slides/:slide_id', async (req, res) => {
  const slideId = req.params.slide_id;
  const token = req.header('Authorization').replace('Bearer ', '');
  const decoded = jwt.verify(token, process.env.JWT_SECRET || "Ananya");

  const userId = decoded.userId;
  const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

 const slide = await Slide.findOne({ slideId: slideId });

    if (slide) {
      res.json(slide);
    } else {
      res.status(404).json({ error: 'Slide not found' });
    }

  });


app.post('/updateprogress/:slide_id/:percent', async (req, res) => {
  const slideId = req.params.slide_id;
  const percent = req.params.percent;
  const token = req.header('Authorization').replace('Bearer ', '');
  const decoded = jwt.verify(token, process.env.JWT_SECRET || "Ananya");

  const userId = decoded.userId;
  const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const progress = await user.progress.find((item) => item.slideId == slideId);

    if (!progress) {
      user.progress.push({
        slideId: slideId, 
        completedPercent:percent
      
      });
      user.save();
      return res.status(404).json({ error: 'New progress created' });
    }

    progress.completedPercent = percent;

    user.save();

    res.json(progress);
  
});


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("Listening on port");
});


module.exports = app ;