import React, { useEffect, useState } from 'react';
import { FaRegCopy } from 'react-icons/fa6';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import LikeButton from '../ReactionButtons/LikeButton';
import DislikeButton from '../ReactionButtons/DislikeButton';
import ShareButton from '../ReactionButtons/ShareButton';

export default function PostItem({ PostItem, id }) {
  const { currentUser } = useSelector((state) => state.user);
  const [post, setPost] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [sharesLength, setSahresLength] = useState(0);

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
    const shares = post?.shares || 0;
    const liked = post?.likes?.some((like) => like._id === currentUser?._id);
    const disliked = post?.disLikes?.some(
      (dislike) => dislike._id === currentUser?._id,
    );
    setSahresLength(shares);
    setIsLiked(liked);
    setIsDisLiked(disliked);
    setLikes(post?.likes?.length || 0);
    setDislikes(post?.disLikes?.length || 0);
  }, [post, currentUser]);

  dayjs.extend(relativeTime);
  const fromNow = dayjs(post?.createdAt).fromNow();

  const notify = (action) => {
    let message = '';
    let icon = '⚠️';
    switch (action) {
      case 'like':
        message = 'Sign in first to like!';
        break;
      case 'share':
        message = 'Copy to clipboard';
        icon = <FaRegCopy />;
        break;
      case 'dislike':
        message = 'Sign in first to dislike!';
        break;
      default:
        break;
    }
    toast(message, {
      duration: 2000,
      position: 'bottom-right',
      icon: icon,
      style: {
        borderRadius: '10px',
        fontSize: '14px',
      },
    });
  };

  const postUrl = window.location.href + 'post/' + id;

  return (
    <>
      <div
        className="w-[300px] h-[400px] relative border flex flex-col gap-3 cursor-pointer bg-[#1B1C1C] shadow-white p-1 rounded-lg md:hover:scale-105 md:transition-scale duration-300"
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
              {/* like btn */}
              <LikeButton
                currentUser={currentUser}
                isDisLiked={isDisLiked}
                isLiked={isLiked}
                likes={likes}
                notify={notify}
                setDislikes={setDislikes}
                setIsDisLiked={setIsDisLiked}
                setIsLiked={setIsLiked}
                postId={id}
                setLikes={setLikes}
              />
              {/* dislikes button */}
              <DislikeButton
                currentUser={currentUser}
                dislikes={dislikes}
                isDisLiked={isDisLiked}
                isLiked={isLiked}
                notify={notify}
                postId={id}
                setDislikes={setDislikes}
                setIsDisLiked={setIsDisLiked}
                setIsLiked={setIsLiked}
                setLikes={setLikes}
              />
            </div>
          </div>
          <ShareButton
            copied={postUrl}
            setSahresLength={setSahresLength}
            notify={notify}
            postId={id}
            sharesLength={sharesLength}
          />
        </div>
        <div className="absolute bottom-0 w-full pr-4 py-1 pl-2">
          <div className=" flex flex-col justify-between ">
            <div>
              <p className="text-[10px] text-slate-300">
                {post.views} <span>View(s)</span>
              </p>
            </div>
            <div className="flex justify-between items-center mb-1">
              <p className="text-[10px]">
                View all {post.comments?.length || 0} comment...
              </p>
              <p className="text-[10px] ">{fromNow}</p>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}
