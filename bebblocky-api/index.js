//Main imports
const express = require('express');
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

app = express();
app.use(express.json());

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


/**
 * @swagger
 * /signup:
 *   post:
 *     summary: User signup
 *     description: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       409:
 *         description: Username already taken
 *       500:
 *         description: Internal server error
 */
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
  
/**
 * @swagger
 * /signin:
 *   post:
 *     summary: User signin
 *     description: Authenticate a user and generate a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful signin
 *       401:
 *         description: Invalid username or password
 */
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


/**
 * @swagger
 * /slides/{slide_id}:
 *   get:
 *     summary: Get a slide by ID
 *     description: Retrieve a slide by its ID with JWT authentication
 *     parameters:
 *       - in: path
 *         name: slide_id
 *         description: ID of the slide
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Slide not found
 */
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

/**
 * @swagger
 * /slides/{slide_id}/progress:
 *   get:
 *     summary: Get progress for a slide
 *     description: Retrieve the completion percentage for a slide
 *     parameters:
 *       - in: path
 *         name: slide_id
 *         description: ID of the slide
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Slide or progress not found
 */
app.get('/slides/:slide_id/progress', async (req, res) => {
  const slideId = req.params.slide_id;
  const token = req.header('Authorization').replace('Bearer ', '');
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'Ananya');

  const userId = decoded.userId;
  const user = await User.findById(userId);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const progress = user.progress.find((item) => {
    console.log(item, slideId, item.slideId == slideId);
    return item.slideId == slideId;
  });

  console.log(progress);
  if (!progress) {
    return res.status(404).json({ message: 'Progress not found' });
  }

  res.json(progress);
});


/**
 * @swagger
 * /slides/{slide_id}/progress:
 *   post:
 *     summary: Create progress for a slide
 *     description: Create a new progress entry for a slide with JWT authentication
 *     parameters:
 *       - in: path
 *         name: slide_id
 *         description: ID of the slide
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: progress
 *         description: Progress data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             completedPercent:
 *               type: integer
 *               description: Completion percentage
 *               example: 50
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Slide or user not found
 */
app.post('/slides/:slide_id/progress', async (req, res) => {
  const slideId = req.params.slide_id;
  const completedPercent = 0;
  const token = req.header('Authorization').replace('Bearer ', '');
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'Ananya');

  const userId = decoded.userId;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const progress = user.progress.find((item) => item.slideId === slideId);

  if (!progress) {
    user.progress.push({
      slideId: slideId,
      completedPercent: completedPercent,
    });
    await user.save();
    return res.status(200).json({ message: 'New progress created' });
  }

  progress.completedPercent = completedPercent;
  await user.save();

  res.json(progress);
});

/**
 * @swagger
 * /updateprogress/{slide_id}/{percent}:
 *   post:
 *     summary: Update progress for a slide
 *     description: Update the completion percentage for a slide with JWT authentication
 *     parameters:
 *       - in: path
 *         name: slide_id
 *         description: ID of the slide
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: percent
 *         description: Completion percentage
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Slide not found
 */
app.post('/updateprogress/:slide_id/:percent', async (req, res) => {
  try{
    const slideId = req.params.slide_id;
  const percent = req.params.percent;
  const token = req.header('Authorization').replace('Bearer ', '');
  const decoded = jwt.verify(token, process.env.JWT_SECRET || "Ananya");

  console.log('backend - here');
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

    res.json(progress);}
    catch(err){
      
    }

  
});


/**
 * @swagger
 * /slides:
 *   get:
 *     summary: Get all slides
 *     description: Retrieve all slides
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 */
app.get('/slides', async (req, res) => {
  try {
    const slides = await Slide.find();
    res.json(slides);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * @swagger
 * /slides:
 *   post:
 *     summary: Create a slide
 *     description: Create a new slide
 *     parameters:
 *      - in: body
 *        name: slide
 *        description: The slide to create
 *        schema:
 *          $ref: '#/definitions/Slide'
 *     responses:
 *       201:
 *         description: Slide created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
app.post('/slides', async (req, res) => {
  try {
    const slide = new Slide(req.body);
    const savedSlide = await slide.save();
    res.status(201).json(savedSlide);
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

/**
 * @swagger
 * /slides/{id}:
 *   delete:
 *     summary: Delete a slide by ID
 *     description: Delete a slide based on its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the slide to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Slide deleted successfully
 *       404:
 *         description: Slide not found
 *       500:
 *         description: Internal server error
 */

app.delete('/slides/:slideId', async (req, res) => {
  try {
    const slideId = req.params.slideId;
    const deletedSlide = await Slide.findOneAndDelete({ slideId: slideId });

    if (!deletedSlide) {
      return res.status(404).json({ message: 'Slide not found' });
    }
    
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete the slide' });
  }
});

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sample API',
      version: '1.0.0',
      description: 'Sample API documentation',
    },
  },
  apis: ['./index.js'], // Specify the file(s) where your JSDoc annotations are present
};

// Generate Swagger specification
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening on port");
});


module.exports = app ;