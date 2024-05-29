const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const supportSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

//Export the model
module.exports = mongoose.model('Support', supportSchema);
