const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');

const createNewUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if user already exist
    const existedUser = await User.findOne({ email });
    if (existedUser) throw new Error('User Already exist');
    // if user does not exist, create new user
    // hash password
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1d',
    });

    res
      .cookie('access_token', token, { maxAge: 86400000, httpOnly: true })
      .status(201)
      .json(newUser);
  } catch (error) {
    throw new Error(error);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    // check if user exist
    const user = await User.findOne({ email });
    if (!user) throw new Error('User does not exist');

    // check if password is correct
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) throw new Error('Invalid Credentials');

    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1d',
    });

    const { password: pass, ...others } = user._doc;
    res
      .cookie('access_token', token, { maxAge: 86400000, httpOnly: true })
      .status(200)
      .json(others);
  } catch (error) {
    throw new Error(error);
  }
});

//logout user
const logOutUser = asyncHandler(async (req, res) => {
  try {
    res.clearCookie('access_token').json('User LoggedOut');
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createNewUser, loginUser, logOutUser };
