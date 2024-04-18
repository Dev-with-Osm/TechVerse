const express = require('express');
const app = express();

// Middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello wolrd');
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
