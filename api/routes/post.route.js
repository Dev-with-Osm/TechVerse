const express = require('express');
const { verifyToken } = require('../utils/verifyUser');

const {
  createNewPost,
  editPost,
  likePost,
  dislikePost,
  getPost,
  addComment,
  getAllPosts,
  sharePost,
  deletePost,
} = require('../controllers/post.controller');
const router = express.Router();

router.post('/new-post', verifyToken, createNewPost);
router.put('/edit-post/:id', verifyToken, editPost);
router.put('/like-post', verifyToken, likePost);
router.put('/dislike-post', verifyToken, dislikePost);
router.put('/add-comment/:id', verifyToken, addComment);
router.delete('/delete-post/:id', verifyToken, deletePost);
router.get('/share/:id', sharePost);
router.get('/get-post/:id', getPost);
router.get('/all-posts', getAllPosts);

module.exports = router;
