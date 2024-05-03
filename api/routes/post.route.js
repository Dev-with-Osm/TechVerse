const express = require('express');
const { verifyToken } = require('../utils/verifyUser');

const {
  createNewPost,
  editPost,
  likePost,
  dislikePost,
  getPost,
  addComment,
} = require('../controllers/post.controller');
const router = express.Router();

router.post('/new-post', verifyToken, createNewPost);
router.put('/edit-post/:id', verifyToken, editPost);
router.put('/like-post', verifyToken, likePost);
router.put('/dislike-post', verifyToken, dislikePost);
router.put('/add-comment/:id', verifyToken, addComment);
router.get('/get-post/:id', getPost);

module.exports = router;
