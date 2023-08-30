//Main imports
const express = require("express");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const mongoose = require('mongoose');
const pythonProcess = require("./processes/pythonProcess");
const pythonPusher = require("./processes/pythonPusher");
const errorMiddleware = require("./middlewares/errorMiddleware");
//const Pusher = require("pusher");
app = express();

const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {origin : '*'}
});

// const pusher = new Pusher({
//   appId: "1635738",
//   key: "54bd977b9f1757fcfb9a",
//   secret: "b4491ceb65df4cd7f246",
//   cluster: "us3",
//   useTLS: true,
// });

// pusher.trigger("my-channel", "my-event", { message: "hello world" });

// var Pusher = require('pusher-client');
// var pusher = new Pusher('54bd977b9f1757fcfb9a',  {
//   cluster: 'us3'
// });
// var order_book_channel = pusher.subscribe('my-channel');
// order_book_channel.bind('my-event', function(data) {
//     console.log(data);
// })



// Subscribe to a channel

// Listen for 'execute' event from the client


// Listen for 'disconnect' event

/*
io.on('connection', (socket) => {
  console.log('New client connected');


  // Listen for 'execute' event from the client
  socket.on('execute',  (data) => {
    pythonProcess(data, socket);
  }
  );
    
  // Disconnect event
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
*/
//Database linker


mongoose
  .connect(
    "mongodb+srv://afmtoday:OlxwPFCF0rLMnA3e@cluster0.edrrjyh.mongodb.net/bebblocky?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// App configuration
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);


// Swagger configuration
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Beblocky 2.0 Web App API',
      version: '1.0.0',
      description: 'Beblocky 2.0 Web App API documentation',
    },
  },
  apis: ['./routes/*'], // Specify the file(s) where JSDoc annotations are present
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Route imports  
const userRoutes = require("./routes/userRoutes");
const coursesRoutes = require("./routes/coursesRoutes");
const authRoutes = require("./routes/authRoutes");
const pythonRoutes = require("./routes/pythonRoutes");
const pythonExecution = require("./processes/pythonProcess");

// Route definitions
VERSION = "v1";
app.use(`/api/${VERSION}/user`, userRoutes);
app.use(`/api/${VERSION}/courses`, coursesRoutes);
app.use(`/auth/${VERSION}`, authRoutes);
app.use(`/api/${VERSION}/python`, pythonRoutes);
app.use(errorMiddleware);

/*
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
*/

server.listen(process.env.PORT || 4000, () => {
  console.log(`Server running`);
});

module.exports = app;

 
