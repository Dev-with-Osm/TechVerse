const express = require('express');
const dotenv = require('dotenv').config();
const dbConn = require('./config/dbConnection');
const authRouter = require('./routes/auth.route.js');
const { notFound, errorHandler } = require('./middlewares/errorHandler.js');

const app = express();
dbConn();
app.use(express.json());

// Middleware
const port = 4000;

app.use('/api/auth', authRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
