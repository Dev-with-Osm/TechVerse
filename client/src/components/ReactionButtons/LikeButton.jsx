import React, { useState } from 'react';
import { BsHandThumbsUp, BsHandThumbsUpFill } from 'react-icons/bs';
import Loader from '../Loader';
import ReactionSpinner from './ReactionSpinner';

export default function LikeButton({
  likes,
  isLiked,
  setIsLiked,
  setDislikes,
  setIsDisLiked,
  isDisLiked,
  notify,
  currentUser,
  postId,
  setLikes,
}) {
  const [likeLoading, setLikeLoading] = useState(false);
  const handleLikeClick = async () => {
    try {
      if (!currentUser) {
        console.log('you can not like before sign in ');
        notify('like');
        return;
      }
      setLikeLoading(true);
      const res = await fetch('/api/post/like-post', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId }),
      });
      const data = await res.json();
      if (data.success === false) {
        setLikeLoading(false);
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
      setLikeLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="flex items-center justify-center flex-col"
      onClick={handleLikeClick}
    >
      {likeLoading ? (
        <ReactionSpinner />
      ) : (
        <>
          {isLiked ? (
            <BsHandThumbsUpFill className="hover:fill-red-300 hover:scale-125 transition-scale transition duration-300 w-5" />
          ) : (
            <BsHandThumbsUp className="hover:fill-red-300 hover:scale-125 transition-scale transition duration-300 w-5" />
          )}
          <p className="text-xs">{likes}</p>
        </>
      )}
    </div>
  );
}
