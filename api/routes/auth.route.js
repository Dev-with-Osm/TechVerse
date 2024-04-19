const express = require('express');
const {
  createNewUser,
  loginUser,
  logOutUser,
  loginWithGoogle,
} = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', createNewUser);
router.post('/login', loginUser);
router.post('/google', loginWithGoogle);
router.get('/logout', logOutUser);

module.exports = router;
