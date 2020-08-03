var express = require('express');
var router = express.Router();
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../middleware/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


/* Register User */
router.post('/register', async (req, res) => {

  // Validate user
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Existing user?
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) {
    return res.status(400).send('Email exists already');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // Create new User!
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword
  });

  try {
    const savedUser = await user.save();
    // Create and assign token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN);
    // res.header('auth-token', token).send(token);
    res.send({ user: {name: user.username, id: user._id}, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {

  // Validate User
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // if existing email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send('Email is not found');
  }

  // Password correct?
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send('Invalid password');
  }

  // Create and assign token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN);
  res.header('auth-token', token).send(token);

});


module.exports = router;
