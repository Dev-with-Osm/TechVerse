import React from 'react';
import { BsHandThumbsDown, BsHandThumbsDownFill } from 'react-icons/bs';
export default function DislikeButton({
  currentUser,
  postId,
  setDislikes,
  isDisLiked,
  setIsDisLiked,
  setLikes,
  setIsLiked,
  dislikes,
  notify,
  isLiked,
}) {
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
        body: JSON.stringify({ postId }),
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
  return (
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
  );
}
