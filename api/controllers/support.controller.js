const Support = require('../models/support.model');
const asyncHandler = require('express-async-handler');

const addSupportMessage = asyncHandler(async (req, res) => {
  try {
    const addSupportMessage = await Support.create({ ...req.body });
    res.status(201).json(addSupportMessage);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { addSupportMessage };
