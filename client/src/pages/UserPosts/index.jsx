import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FiEdit } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';

import './style.css';
import { Link } from 'react-router-dom';
import LogoutModal from '../../components/Modals/LogoutModal';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../../components/Loader';

export default function UserPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleDeleteClick = async (id) => {
    console.log(id);
    try {
      const res = await fetch(`/api/post/delete-post/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        return console.log(data);
      }
      setShowPopup(false);
      setUserPosts((prev) => prev.filter((post) => post._id !== id));
      notify();
    } catch (error) {
      console.log(error);
    }
  };

  const notify = () => {
    toast.success('Post deleted successfully! ', {
      duration: 2000,
      position: 'bottom-right',

      style: {
        borderRadius: '10px',
        fontSize: '14px',
      },
    });
  };

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await fetch(`/api/user/posts/${currentUser?._id}`);
        const data = await res.json();
        setUserPosts(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchUserPosts();
  }, [currentUser?.id]);

  const handleDeletePost = (postId) => {
    setPostIdToDelete(postId);
    setShowPopup(true);
  };

  return (
    <div className=" flex flex-col justify-center items-center mt-20">
      {loading ? (
        <div className="h-screen flex items-center justify-center -mt-20">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-y-8 md:gap-x-16">
          {userPosts &&
            userPosts.map((post) => (
              <div key={post._id}>
                <div
                  className="w-[300px] h-full cursor-pointer p-1 pb-3 rounded-md bg-[#1B1C1C] shadow-white border flex flex-col gap-3"
                  style={{ boxShadow: 'rgba(149, 157, 165, 0.1) 0px 8px 24px' }}
                >
                  <Link
                    to={`/post/${post._id}`}
                    className="w-full h-[200px] rounded-md "
                    style={{
                      backgroundImage: `Url(${post.image})`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                    }}
                  ></Link>
                  <div className="px-2">
                    <div className="flex flex-col gap-2">
                      <h2 className="text-sm line-clamp-2">{post.title}</h2>
                      <p className="text-[11px] line-clamp-3 text-white/85">
                        {post.body}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-5">
                    <Link
                      to={`/edit-post/${post._id}`}
                      className="border border-green-500 w-24 flex items-center justify-center gap-1  left-0 py-1 rounded-md hover:bg-green-500 transition ease-in-out duration-150"
                    >
                      <FiEdit />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeletePost(post._id)}
                      className="border border-red-500 flex items-center justify-center gap-1 w-24  right-0  py-1 rounded-md hover:bg-red-500 transition ease-in-out duration-150"
                    >
                      <BsTrash />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
      {showPopup && (
        <LogoutModal open={showPopup} onClose={() => setShowPopup(false)}>
          <div className="text-center w-60">
            <div className="mx-auto my-4">
              <h3 className="font-black text-black">Confirm delete</h3>
              <p className="text-gray-400 text-sm mt-2">
                Are you sure you want to delete this post?
              </p>
            </div>
            <div className="flex items-center justify-evenly">
              <button
                onClick={() => {
                  handleDeleteClick(postIdToDelete);
                  setShowPopup(false);
                }}
                className="text-white bg-red-500 rounded-lg shadow-md shadow-red-400/40 py-2 px-4 hover:bg-red-500/75 transition duration-200 ease-in"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-500 bg-white rounded-lg shadow-md py-2 px-4 hover:bg-gray-200 transition duration-200 ease-in"
              >
                Cancel
              </button>
            </div>
          </div>
        </LogoutModal>
      )}
      <Toaster />
    </div>
  );
}
