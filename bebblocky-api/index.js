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

// Route imports
const usersRouter = require("./routes/users");
const slidesRouter = require("./routes/slides");
const authRouter = require("./routes/auth");

// Route definitions
VERSION = "v1";
app.use(`/api/${VERSION}/user`, usersRouter);
app.use(`/api/${VERSION}/slides`, slidesRouter);
app.use(`/auth/${VERSION}`, authRouter);

// Serve the application
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});

module.exports = app;
