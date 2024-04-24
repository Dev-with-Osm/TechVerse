const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

module.exports.verifyToken = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) return new Error('Unauthorized');

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) return new Error('forbidden');
      req.user = user;
      next();
    });
  } catch (error) {
    throw new Error(error);
  }
});
