import React, { useEffect, useState } from 'react';
import {
  BsHandThumbsDown,
  BsHandThumbsDownFill,
  BsHandThumbsUp,
  BsHandThumbsUpFill,
  BsShare,
} from 'react-icons/bs';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function PostItem({ PostItem, id }) {
  const { currentUser } = useSelector((state) => state.user);
  const [post, setPost] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  console.log(id);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/get-post/${id}`);
        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, []);

  useEffect(() => {
    const liked = post?.likes?.some((like) => like._id === currentUser?._id);
    const disliked = post?.disLikes?.some(
      (dislike) => dislike._id === currentUser?._id,
    );

    setIsLiked(liked);
    setIsDisLiked(disliked);
    setLikes(post?.likes?.length || 0);
    setDislikes(post?.disLikes?.length || 0);
  }, [post, currentUser]);

  dayjs.extend(relativeTime);
  const fromNow = dayjs(post?.createdAt).fromNow();

  const handleLikeClick = async () => {
    try {
      if (!currentUser) {
        console.log('you can not like before sign in ');
        notify('like');
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
      notify('dislike');
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

  const notify = (action) => {
    let message =
      action === 'like'
        ? 'Sign in first to like!'
        : 'Sign in first to dislike!';
    toast(message, {
      duration: 2000,
      position: 'bottom-right',
      icon: '⚠️',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
        fontSize: '14px',
      },
    });
  };
  return (
    <>
      <div
        className="w-[300px] h-[400px] relative border flex flex-col gap-3 cursor-pointer bg-[#1B1C1C] shadow-white p-1 rounded-lg hover:scale-105 transition-scale duration-300"
        style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
      >
        <Link
          to={`/post/${id}`}
          className="w-full h-[200px] bg-cover rounded-lg"
          style={{ backgroundImage: `Url(${post.image})` }}
        ></Link>
        <div className="px-2">
          <div className="flex flex-col gap-2">
            <h2 className="text-sm line-clamp-2">{post.title}</h2>
            <p className="text-[11px] line-clamp-3 text-white/85">
              {post.body}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between px-2">
          <div className="flex flex-col gap-1">
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
            </div>
          </div>
          <div className="flex items-center justify-center flex-col">
            <BsShare className="hover:fill-blue-500 hover:scale-125 transition-scale transition duration-300 w-5" />
            <p className="text-xs">{post.disLikes?.length || 0}</p>
          </div>
        </div>
        <div className="px-2 flex flex-col justify-between ">
          <div>
            <p className="text-[10px] text-slate-300">
              {post.views} <span>View(s)</span>
            </p>
          </div>
          <div className="flex justify-between items-center mb-1">
            <p className="text-[10px]">
              View all {post.comments?.length || 0} comment...
            </p>
            <p className="text-[10px]">{fromNow}</p>
          </div>
        </div>
      </div>
      <Toaster />
      {/* <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      /> */}
    </>
  );
}
