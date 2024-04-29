const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const dbConn = require('./config/dbConnection');
const authRouter = require('./routes/auth.route.js');
const userRouter = require('./routes/user.route.js');
const postRouter = require('./routes/post.route.js');
const { notFound, errorHandler } = require('./middlewares/errorHandler.js');

const app = express();
dbConn();
app.use(express.json());
app.use(cookieParser());
// app.use(cors({ allowedHeaders: true, origin: 'http://localhost:3000' }));

// Middleware
const port = 4000;

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
