import React, { useEffect, useState } from 'react';
import {
  BsHandThumbsDown,
  BsHandThumbsDownFill,
  BsHandThumbsUp,
  BsHandThumbsUpFill,
  BsShare,
} from 'react-icons/bs';
import { IoSendOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import PostItem from '../../components/Posts';
import Loader from '../../components/Loader';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export default function PostPage() {
  const { postId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const [commentsLength, setCommentsLength] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/post/get-post/${postId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          setLoading(false);
          return;
        }
        setTimeout(() => {
          setPost(data);
          setLoading(false);
        }, 1000);
      } catch (error) {
        setError(error.message || 'An error occurred while fetching the post.');
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  useEffect(() => {
    const comments = post?.comments || [];
    const sortedComments = comments.sort(
      (a, b) => new Date(b.commentDate) - new Date(a.commentDate),
    ); // Sort comments by commentDate
    const liked = post?.likes?.some((like) => like._id === currentUser?._id);
    const disliked = post?.disLikes?.some(
      (dislike) => dislike._id === currentUser?._id,
    );
    setIsLiked(liked);
    setIsDisLiked(disliked);
    setLikes(post?.likes?.length || 0);
    setDislikes(post?.disLikes?.length || 0);
    setAllComments(sortedComments);
    setCommentsLength(sortedComments.length);
  }, [post, currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      console.log('you can not comment before sign in ');
      return;
    }
    const res = await fetch(`/api/post/add-comment/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment: comment,
      }),
    });
    const data = await res.json();
    console.log(data);
    setNewComment(comment);
    setCommentsLength(commentsLength + 1);
  };

  const handleLikeClick = async () => {
    try {
      if (!currentUser) {
        console.log('you can not like before sign in ');
        return;
      }
      const res = await fetch('/api/post/like-post', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId: post._id }),
      });
      const data = await res.json();
      if (data.success === false) {
        return console.log(data);
      }
      setLikes((prevLikes) => {
        if (isLiked) {
          return prevLikes - 1;
        } else {
          return prevLikes + 1;
        }
      });
      setIsLiked(!isLiked);
      if (isDisLiked) {
        setDislikes((prevDislikes) => prevDislikes - 1);
        setIsDisLiked(false);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislikeClick = async () => {
    if (!currentUser) {
      console.log('you can not like before sign in ');
      return;
    }
    try {
      const res = await fetch('/api/post/dislike-post', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId: post._id }),
      });
      const data = await res.json();
      if (data.success === false) {
        return console.log(data);
      }
      setDislikes((prevDislikes) => {
        if (isDisLiked) {
          return prevDislikes - 1;
        } else {
          return prevDislikes + 1;
        }
      });
      setIsDisLiked(!isDisLiked);
      if (isLiked) {
        setLikes((prevLikes) => prevLikes - 1);
        setIsLiked(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  dayjs.extend(relativeTime);

  return (
    <div>
      {loading && (
        <div className="h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}
      {error && <p>{error}</p>}
      {post && (
        <div className=" flex flex-col gap-10 justify-center items-center md:items-start md:flex-row p-5">
          <div className="bg-[#1B1C1C] mt-9 p-4 border rounded-md flex flex-col gap-4 md:w-3/5 w-full h-fit">
            <div className="md:px-4">
              <h1 className="text-text text-center md:text-left text-xl">
                {post.title}
              </h1>
            </div>
            <div>
              <img src={post.image} alt={post.title} className="rounded-md " />
            </div>

            <div className="px-2 flex gap-5 flex-col">
              <div>
                <p className="text-sm">{post.body}</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center px-1">
                  <h1 className="cursor-pointer">
                    <span className="text-text underline underline-offset-2">
                      comments
                    </span>{' '}
                    ({commentsLength})
                  </h1>
                  <div className="flex items-center gap-3">
                    <div
                      className="flex items-center justify-center flex-col"
                      onClick={handleLikeClick}
                    >
                      {isLiked ? (
                        <BsHandThumbsUpFill className="hover:fill-red-300 hover:scale-125 transition-scale transition duration-300 w-5" />
                      ) : (
                        <BsHandThumbsUp className="hover:fill-red-300 hover:scale-125 transition-scale transition duration-300 w-5" />
                      )}
                      <p className="text-xs">{likes}</p>
                    </div>
                    <div
                      className="flex items-center justify-center flex-col"
                      onClick={handleDislikeClick}
                    >
                      {isDisLiked ? (
                        <BsHandThumbsDownFill className="hover:fill-red-300 hover:scale-125 transition-scale transition duration-300 w-5" />
                      ) : (
                        <BsHandThumbsDown className="hover:fill-red-300 hover:scale-125 transition-scale transition duration-300 w-5" />
                      )}
                      <p className="text-xs">{dislikes}</p>
                    </div>
                    <div className="flex items-center justify-center flex-col">
                      <BsShare className="hover:fill-blue-500 hover:scale-125 transition-scale transition duration-300 w-5" />
                      <p className="text-xs">{post.disLikes?.length || 0}</p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <textarea
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    placeholder="type your comment here"
                    className="disabled:cursor-not-allowed border border-text-secondary focus:border-0 bg-transparent hover:border-[#755d8c] focus:ring-2 outline-none focus:ring-[#755d8c] duration-300 ease-in-out cursor-pointer py-2.5 pl-5 rounded-md placeholder:text-xs placeholder:text-text-secondary w-full"
                  ></textarea>
                  <button
                    onClick={handleSubmit}
                    className="bg-text-secondary text-black rounded-md flex gap-1 items-center font-medium hover:bg-text transition  duration-200 ease-in-out px-3 py-1 absolute bottom-5 right-5"
                  >
                    Submit
                    <IoSendOutline className="text-sm" />
                  </button>
                </div>

                {newComment && (
                  <div className="border border-text-secondary/50 p-3 ">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={currentUser?.avatar}
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="text-xs">
                          {currentUser?.firstName + ' ' + currentUser?.lastName}
                        </p>
                      </div>
                      <div className="text-[10px]">{dayjs().fromNow()}</div>
                    </div>
                    <div>
                      <p className="text-sm ml-12 break-all">{newComment}</p>
                    </div>
                  </div>
                )}

                {showAllComments
                  ? allComments.map((value, index) => (
                      <div
                        key={index}
                        className="border border-text-secondary/50 p-3 "
                      >
                        <div className="flex  justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={value.commentedBy?.avatar}
                              alt=""
                              className="w-8 h-8 rounded-full"
                            />
                            <p className="text-xs">
                              {value.commentedBy?.firstName +
                                ' ' +
                                value.commentedBy?.lastName}
                            </p>
                          </div>
                          <div className="text-[10px]">
                            {dayjs(value.commentDate).fromNow()}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm ml-12 break-all">
                            {value.comment}
                          </p>
                        </div>
                      </div>
                    ))
                  : allComments.slice(0, 4).map((value, index) => (
                      <div
                        key={index}
                        className="border border-text-secondary/50 p-3 "
                      >
                        <div className="flex justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={value.commentedBy?.avatar}
                              alt=""
                              className="w-8 h-8 rounded-full"
                            />
                            <p className="text-xs">
                              {value.commentedBy?.firstName +
                                ' ' +
                                value.commentedBy?.lastName}
                            </p>
                          </div>
                          <div className="text-[10px]">
                            {dayjs(value.commentDate).fromNow()}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm ml-12 break-all ">
                            {value.comment}
                          </p>
                        </div>
                      </div>
                    ))}

                {commentsLength > 4 && (
                  <button
                    onClick={() => setShowAllComments(!showAllComments)}
                    className="bg-gray-800 text-white rounded-md px-1 py-1 mt-2"
                  >
                    {showAllComments
                      ? 'Show Less Comments'
                      : 'Show All Comments'}
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="w-full md:w-auto ">
            <h1 className="mb-2 w-full text-xl">Related posts:</h1>
            <div className="flex flex-col items-center justify-center gap-4">
              <PostItem />
              <PostItem />
              <PostItem />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
