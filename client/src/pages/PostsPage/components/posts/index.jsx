import React, { useEffect, useState } from 'react';

import { IoSendOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
// import Loader from '../../components/Loader';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import toast, { Toaster } from 'react-hot-toast';
// import LikeButton from '../../components/ReactionButtons/LikeButton';
// import DislikeButton from '../../components/ReactionButtons/DislikeButton';
import { FaRegCopy } from 'react-icons/fa6';
// import ShareButton from '../../components/ReactionButtons/ShareButton';
import Loader from '../../../../components/Loader';
import LikeButton from '../../../../components/ReactionButtons/LikeButton';
import DislikeButton from '../../../../components/ReactionButtons/DislikeButton';
import ShareButton from '../../../../components/ReactionButtons/ShareButton';

export default function PostPage({ postId }) {
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
  const [user, setUser] = useState();
  const [sharesLength, setSahresLength] = useState(0);
  const [copied, setCopied] = useState(false);
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
    // const postHashtags = post?.hashtags
    //   ? post?.hashtags.split(/[# ]+/).filter(Boolean).toString()
    //   : [];
    const postLink = window.location.href;
    const shares = post?.shares;
    const user = currentUser;
    const comments = post?.comments || [];
    const sortedComments = comments.sort(
      (a, b) => new Date(b.commentDate) - new Date(a.commentDate),
    ); // Sort comments by commentDate
    const liked = post?.likes?.some((like) => like._id === currentUser?._id);
    const disliked = post?.disLikes?.some(
      (dislike) => dislike._id === currentUser?._id,
    );
    // setHashtags(postHashtags);
    setUser(user);
    setIsLiked(liked);
    setIsDisLiked(disliked);
    setLikes(post?.likes?.length || 0);
    setDislikes(post?.disLikes?.length || 0);
    setAllComments(sortedComments);
    setCommentsLength(sortedComments.length);
    setSahresLength(shares);
    setCopied(postLink);
  }, [post, currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    notify('comment');
    setComment('');
  };

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
      case 'comment':
        message = 'Comment Added';
        icon = '✅';
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

  dayjs.extend(relativeTime);

  return (
    <>
      <div>
        {loading && (
          <div className="h-screen flex items-center justify-center -mt-20">
            <Loader />
          </div>
        )}
        {error && (
          <div className="h-screen">
            <p>{error}</p>
          </div>
        )}
        {post && (
          <div className=" flex flex-col gap-10 justify-center items-center md:items-start h-full md:flex-row px-2">
            <div className="bg-[#1B1C1C] md:mt-4 p-4 border rounded-md flex flex-col gap-4  w-full h-fit">
              <div className="md:px-4 flex items-start gap-4">
                <div className="flex items-center gap-2 ">
                  <div className="w-8 h-8">
                    <img
                      src={post?.author.avatar}
                      alt=""
                      className=" h-full w-full rounded-full"
                    />
                  </div>
                  <div
                    style={{
                      width: 'calc(200px - 100px)',
                    }}
                  >
                    <p
                      className="text-sm truncate"
                      title={`${post?.author.firstName} ${post?.author.lastName}`}
                    >
                      {post?.author.firstName + ' ' + post?.author.lastName}
                    </p>
                    <p className="text-xs">
                      {dayjs(post?.createdAt).fromNow()}
                    </p>
                  </div>
                </div>
                <div className="w-full">
                  <h1 className="text-text text-center ">{post.title}</h1>
                </div>
              </div>
              <div>
                <img
                  src={post.image}
                  alt={post.title}
                  className="rounded-md "
                />
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
                      <LikeButton
                        currentUser={currentUser}
                        isDisLiked={isDisLiked}
                        isLiked={isLiked}
                        likes={likes}
                        notify={notify}
                        postId={postId}
                        setDislikes={setDislikes}
                        setIsDisLiked={setIsDisLiked}
                        setIsLiked={setIsLiked}
                        setLikes={setLikes}
                      />
                      <DislikeButton
                        currentUser={currentUser}
                        isDisLiked={isDisLiked}
                        isLiked={isLiked}
                        notify={notify}
                        postId={postId}
                        setDislikes={setDislikes}
                        setIsDisLiked={setIsDisLiked}
                        setIsLiked={setIsLiked}
                        setLikes={setLikes}
                        dislikes={dislikes}
                      />
                      {/* share */}
                      <ShareButton
                        copied={copied}
                        notify={notify}
                        postId={postId}
                        setSahresLength={setSahresLength}
                        sharesLength={sharesLength}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <textarea
                      disabled={!user}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                      placeholder="type your comment here"
                      className="disabled:cursor-not-allowed border border-text-secondary focus:border-0 bg-transparent hover:border-[#755d8c] focus:ring-2 outline-none focus:ring-[#755d8c] duration-300 ease-in-out  py-2.5 pl-5 rounded-md placeholder:text-xs placeholder:text-text-secondary w-full"
                    ></textarea>
                    <button
                      onClick={handleSubmit}
                      disabled={!user}
                      className=" disabled:cursor-not-allowed rounded-md flex gap-1 items-center font-medium text-text   duration-200 ease-in-out p-3 absolute bottom-2 right-2"
                    >
                      <IoSendOutline className="" />
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
                            {currentUser?.firstName +
                              ' ' +
                              currentUser?.lastName}
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
                      className=" text-white text-right  rounded-md px-1 text-xs mt-1 underline underline-offset-2"
                    >
                      {showAllComments
                        ? 'Show Less Comments'
                        : 'Show All Comments'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Toaster />
    </>
  );
}
