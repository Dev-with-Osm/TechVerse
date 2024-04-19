const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    },
  },
  { timestamps: true },
);

//Export the model
module.exports = mongoose.model('User', userSchema);
