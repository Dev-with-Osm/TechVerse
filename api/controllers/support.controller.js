const Support = require('../models/support.model');
const asyncHandler = require('express-async-handler');

const addSupportMessage = asyncHandler(async (req, res) => {
  try {
    console.log('start');
    if (req.user.id !== req.params.id) {
      throw new Error('You are not authorized to get this user posts');
    }
    const addSupportMessage = await Support.create({ ...req.body });
    res.status(201).json(addSupportMessage);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { addSupportMessage };
