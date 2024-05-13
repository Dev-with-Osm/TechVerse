const express = require('express');
const { updateUser, getUserPosts } = require('../controllers/user.controller');
const { verifyToken } = require('../utils/verifyUser');

const router = express.Router();

router.post('/update/:id', verifyToken, updateUser);
router.get('/posts/:id', verifyToken, getUserPosts);
router.get('/', getUserPosts);

module.exports = router;
