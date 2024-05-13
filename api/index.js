const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
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
const dirname = path.resolve();

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);

app.use(notFound);
app.use(errorHandler);

app.use(express.static(path.join(dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(dirname, 'client', 'dist', 'index.html'));
});

app.listen(4000, () => {
  console.log(`Server is running on port ${4000}`);
});
