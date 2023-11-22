// configuration
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

// routes
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const interactionRoute = require("./routes/interactions");

// middlewares
app.use(bodyParser.json());
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/interaction", interactionRoute);

// connection
mongoose
  .connect(process.env.DB_CONNECTOR, {})
  .then(() => {
    console.log("Connected to DB...");
    console.log("Database connected successfully");
  })
  .catch((err) => console.error("Database connection error", err));

app.listen(3000, () => {
  console.log("Server up and running...");
});
