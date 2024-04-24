// update user info
const User = require('../models/user.model.js');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const updateUser = asyncHandler(async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      throw new Error('You are not authorized to update this user');
    }

    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true },
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { updateUser };
