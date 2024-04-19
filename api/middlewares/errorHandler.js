// not found
const notFound = (req, res, next) => {
  const error = new Error(`Not Found : ${req.originalUrl}`);
  res.status(404);
  next(error);
};
// Error handler
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
  res.status(statusCode);

  // Check if the error message starts with "Error: "
  const errorMessage = err?.message?.startsWith('Error: ')
    ? err.message.slice(7)
    : err.message;

  res.json({
    message: errorMessage,
    stack: err?.stack,
  });
};

module.exports = {
  errorHandler,
  notFound,
};
