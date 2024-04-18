const express = require('express');
const dotenv = require('dotenv').config();
const dbConn = require('./config/dbConnection');

const app = express();

// Middleware
app.use(express.json());

dbConn();

app.get('/', (req, res) => {
  res.send('hello wolrd');
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// mongodb+srv://khourssaoussama7:5rCkuNy1MXfVA8I0@cluster0.lduiqsc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
