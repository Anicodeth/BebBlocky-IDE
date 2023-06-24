//Main imports
const express = require("express");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const mongoose = require('mongoose');

app = express();

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
      title: 'Beblocky Web App API',
      version: '1.0.0',
      description: 'Beblocky Web App API documentation',
    },
  },
  apis: ['./routes/*'], // Specify the file(s) where your JSDoc annotations are present
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Route imports
const userRoutes = require("./routes/userRoutes");
const slidesRoutes = require("./routes/slidesRoutes");
const authRoutes = require("./routes/authRoutes");

// Route definitions
VERSION = "v1";
app.use(`/api/${VERSION}/user`, userRoutes);
app.use(`/api/${VERSION}/slides`, slidesRoutes);
app.use(`/auth/${VERSION}`, authRoutes);

const PORT = process.env.PORT || 000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});

module.exports = app;
