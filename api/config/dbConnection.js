const mongoose = require('mongoose');

const dbConn = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to Database');
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConn;
