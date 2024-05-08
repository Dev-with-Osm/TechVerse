const asyncHandler = require('express-async-handler');
const Post = require('../models/post.model.js');
const validateDbId = require('../utils/validateDbId.js');
const mongoose = require('mongoose');

// add new post
const createNewPost = asyncHandler(async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    throw new Error(error);
  }
});

//Edit post
const editPost = asyncHandler(async (req, res) => {
  validateDbId(req.params.id);
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      throw new Error('Post not found');
    }
    if (req.user.id !== post.author) {
      throw new Error('You are not authorized to edit this post');
    }
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    throw new Error(error);
  }
});

// add like to post
const likePost = asyncHandler(async (req, res) => {
  const { postId } = req.body;
  validateDbId(postId);

  try {
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error('Post not found');
    }

    const loginUserId = req.user.id;
    const isLiked = post.likes.includes(loginUserId);
    const isDisliked = post.disLikes.includes(loginUserId);

    let updateQuery;
    let responseMessage;

    if (isLiked) {
      updateQuery = { $pull: { likes: loginUserId }, $set: { isLiked: false } };
      responseMessage = 'Post unliked';
    } else if (isDisliked) {
      updateQuery = {
        $pull: { disLikes: loginUserId },
        $push: { likes: loginUserId },
        $set: { isDisLiked: false },
      };
      responseMessage = 'Post disliked removed';
    } else {
      updateQuery = {
        $addToSet: { likes: loginUserId },
        $set: { isLiked: true },
      };
      responseMessage = 'Post liked';
    }

    const updatedPost = await Post.findByIdAndUpdate(postId, updateQuery, {
      new: true,
    });
    res.json({ message: responseMessage, post: updatedPost });
  } catch (error) {
    throw new Error(error.message);
  }
});

// add dislike to post
const dislikePost = asyncHandler(async (req, res) => {
  const { postId } = req.body;
  validateDbId(postId);
  try {
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error('Post not found');
    }

    const loginUserId = req.user.id;
    const isLiked = post.likes.includes(loginUserId);
    const isDisliked = post.disLikes.includes(loginUserId);

    let updateQuery;
    let responseMessage;

    if (isDisliked) {
      updateQuery = {
        $pull: { disLikes: loginUserId },
        $set: { isDisliked: false },
      };
      responseMessage = 'Post undisliked';
    } else if (isLiked) {
      updateQuery = {
        $pull: { likes: loginUserId },
        $set: { isLiked: false },
        $push: { disLikes: loginUserId },
      };
      responseMessage = 'Post like removed';
    } else {
      updateQuery = {
        $addToSet: { disLikes: loginUserId },
        $set: { isDisliked: true },
      };
      responseMessage = 'Post disliked';
    }

    const updatedPost = await Post.findByIdAndUpdate(postId, updateQuery, {
      new: true,
    });
    res.json({ message: responseMessage, post: updatedPost });
  } catch (error) {
    throw new Error(error.message);
  }
});

const getPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateDbId(id);
  try {
    const getPost = await Post.findById(id)
      .populate('likes')
      .populate('disLikes')
      .populate({
        path: 'comments',
        populate: { path: 'commentedBy' }, // Populate the 'commentedBy' field
      });
    await Post.findByIdAndUpdate(
      id,
      {
        $inc: { views: 1 },
      },
      { new: true },
    );
    if (!getPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(getPost);
  } catch (error) {
    throw new Error(error);
  }
});

const addComment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      throw new Error('Post not found');
    }
    const { comment } = req.body;
    const newComment = await Post.findByIdAndUpdate(
      id,
      {
        $push: {
          comments: {
            comment: comment,
            commentedBy: req.user.id,
            commentDate: new Date(),
          },
        },
      },
      { new: true },
    );
    res.json(newComment);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllPosts = asyncHandler(async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const searchTerm = req.query.searchTerm || '';
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';
    const posts = await Post.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { hashtags: { $regex: searchTerm, $options: 'i' } },
      ],
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    res.status(200).json(posts);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createNewPost,
  editPost,
  likePost,
  dislikePost,
  getPost,
  addComment,
  getAllPosts,
};
//const page = parseInt(req.query.page) - 1 || 0;
// // let sort = req.query.sort || 'likes';
// console.log({
//   limit,
//   query: req.query,
//   startIndex,
// });
// const posts = await Post.find({}).limit(limit).skip(startIndex);
// res.json(posts);
