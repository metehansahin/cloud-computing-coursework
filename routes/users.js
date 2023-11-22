const express = require("express");
const router = express.Router();

const User = require("../models/User");
const {
  registerValidation,
  loginValidation,
} = require("../validations/validation");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Action 1: Authorised users access the Piazza API using the oAuth v2 protocol to perform any interaction.
router.post("/register", async (req, res) => {
  // Validate the data before we make a user
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send({ message: error["details"][0]["message"] });
  }

  // Validate if the user is already in the database
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res.status(400).send({ message: "User already exists..." });
  }

  // Hash the password
  const salt = await bcryptjs.genSalt(5);
  const hashedPassword = await bcryptjs.hash(req.body.password, salt);

  // Code to insert data
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

router.post("/login", async (req, res) => {
  // Validate the data before we make a user
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send({ message: error["details"][0]["message"] });
  }

  // Validate if the user is already in the database
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send({ message: "User does not exist..." });
  }

  // Check if password is correct
  const validPassword = await bcryptjs.compare(
    req.body.password,
    user.password
  );
  if (!validPassword) {
    return res.status(400).send({ message: "Invalid password..." });
  }

  // Create and assign a token
  const token = jwt.sign(
    { _id: user._id, username: user.username },
    process.env.TOKEN_SECRET
  );
  res.header("auth-token", token).send({ "auth-token": token });
});

module.exports = router;
