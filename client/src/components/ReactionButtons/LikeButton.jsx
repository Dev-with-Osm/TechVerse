import React from 'react';
import { BsHandThumbsUp, BsHandThumbsUpFill } from 'react-icons/bs';

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
        body: JSON.stringify({ postId }),
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
  return (
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
  );
}
