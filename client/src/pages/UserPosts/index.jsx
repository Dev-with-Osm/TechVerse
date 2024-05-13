import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PostItem from '../../components/Posts';
import './style.css';
import { Link } from 'react-router-dom';
import LogoutModal from '../../components/Modals/LogoutModal';

export default function UserPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPost] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const handleDeleteClick = () => {};

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await fetch(`/api/user/posts/${currentUser._id}`);
        const data = await res.json();
        setUserPost(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserPosts();
  }, [currentUser._id]);

  const handleDeletePost = () => {
    setShowPopup(true);
  };
  return (
    <div>
      {showPopup && (
        <LogoutModal open={showPopup} onClose={() => setShowPopup(false)}>
          <div className="text-center w-60">
            <div className="mx-auto my-4">
              <h3 className=" font-black text-black ">Confirm logout</h3>
              <p className="text-gray-400 text-sm mt-2">
                Are you sure want to logout?
              </p>
            </div>
            <div className="flex  items-center justify-evenly">
              <button
                onClick={handleDeleteClick}
                className="text-white bg-red-500 rounded-lg  shadow-md shadow-red-400/40 py-2 px-4 hover:bg-red-500/75 transition duration-200 ease-in"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-500 bg-white rounded-lg  shadow-md py-2 px-4  hover:bg-gray-200 transition duration-200 ease-in "
              >
                Cancel
              </button>
            </div>
          </div>
        </LogoutModal>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-y-8 md:gap-x-16">
        {userPosts &&
          userPosts.map((post) => (
            <div className="relative user-posts-container">
              <Link
                to={`/edit-post/${post._id}`}
                className="bg-green-500 absolute z-20 m-4 left-0  py-1 px-4 rounded-md font-medium user-posts-container-btn"
              >
                Edit
              </Link>
              <button
                onClick={handleDeletePost}
                className="bg-red-500 absolute m-4 z-20 right-0  py-1 px-4 rounded-md font-medium user-posts-container-btn"
              >
                Delete
              </button>
              <PostItem PostItem={post} id={post._id} key={post._id} />
            </div>
          ))}
      </div>
    </div>
  );
}
