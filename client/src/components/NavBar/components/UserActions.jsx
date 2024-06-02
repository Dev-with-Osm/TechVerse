import React from 'react';
import { IoIosArrowDown, IoMdAdd } from 'react-icons/io';
import { IoPersonOutline } from 'react-icons/io5';
import { RiBodyScanLine } from 'react-icons/ri';
import { PiFilesLight } from 'react-icons/pi';
import { GoPersonAdd } from 'react-icons/go';
import OutsideClickHandler from 'react-outside-click-handler';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from '../../../redux/user/userSlice';
import toast, { Toaster } from 'react-hot-toast';
import LogoutModal from '../../Modals/LogoutModal';

export default function UserActions() {
  const [menu, setMenu] = React.useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = React.useState(false);

  const handleCloseMenu = () => {
    setMenu(false);
  };
  const handleLogoutClick = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/logout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
      setShowPopup(false);
      notify();
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };
  const notify = () =>
    toast.success('Logged out successfully', {
      duration: 2000,
      position: 'bottom-right',

      style: {
        borderRadius: '10px',
        fontSize: '14px',
      },
    });

  const handleLogout = () => {
    handleCloseMenu();
    setShowPopup(true);
  };

  return (
    <>
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
                onClick={handleLogoutClick}
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
      <OutsideClickHandler onOutsideClick={() => setMenu(false)}>
        <div
          className="flex text-[#ccd0cf] text-2xl cursor-pointer items-center"
          onClick={() => setMenu((prevState) => !prevState)}
        >
          <IoPersonOutline />
          <IoIosArrowDown
            className={`transform transition-transform duration-300 text-base ${
              menu ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </div>

        <div
          className={`transition-all duration-500 ease-in-out ${
            menu ? 'block' : 'hidden'
          } bg-transparent z-10 absolute right-0 mt-5 mr-5 2xl:mr-40`}
        >
          {currentUser ? (
            <div className="flex items-center justify-center  flex-col rounded-md gap-1 border-white border backdrop-blur-xl p-2">
              <Link
                to={'/profile'}
                onClick={handleCloseMenu}
                className="hover:border  flex items-center overflow-hidden justify-center rounded-md gap-2 w-40 h-12 hover:text-text hover:bg-black/20 transition-all duration-200 ease-in-out cursor-pointer"
              >
                <img
                  src={currentUser?.avatar}
                  alt=""
                  className="w-8 h-8 rounded-full border-white border-[1px]"
                />
                My profile
              </Link>
              <hr className="h-[1px] bg-white w-full " />

              <Link
                to={'/new-post'}
                onClick={handleCloseMenu}
                className="hover:border  flex items-center overflow-hidden justify-center rounded-md gap-2 w-40 h-12 hover:text-text hover:bg-black/20 transition-all duration-200 ease-in-out cursor-pointer"
              >
                <IoMdAdd className="text-lg" />
                Add new post
              </Link>
              <hr className="h-[0.5px] bg-white w-full " />

              <Link
                onClick={handleCloseMenu}
                to={'/my-posts'}
                className="hover:border  flex items-center overflow-hidden justify-center rounded-md gap-2 w-40 h-12 hover:text-text hover:bg-black/20 transition-all duration-200 ease-in-out cursor-pointer"
              >
                <PiFilesLight className="text-lg" />
                My posts
              </Link>
              <hr className="h-[0.5px] bg-white w-full " />
              <button
                onClick={handleLogout}
                className="hover:border  flex items-center overflow-hidden justify-center rounded-md gap-2 w-40 h-12 hover:text-text hover:bg-black/20 transition-all duration-200 ease-in-out cursor-pointer"
              >
                <MdLogout className="text-lg " />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center flex-col rounded-md gap-1 border-white border backdrop-blur-xl p-2">
              <Link
                onClick={handleCloseMenu}
                to={'/sign-in'}
                className="hover:border  flex items-center justify-center rounded-md gap-2 w-40 h-10 hover:text-text hover:bg-black/20 transition-all duration-200 ease-in-out cursor-pointer"
              >
                <RiBodyScanLine className="text-lg" />

                <>Sign In</>
              </Link>
              <hr className="h-[1px] bg-white w-full " />
              <Link
                onClick={handleCloseMenu}
                to={'/sign-up'}
                className="flex hover:border justify-center items-center rounded-md gap-2 w-40 h-10 hover:text-text hover:bg-black/20 transition-all duration-200 ease-in-out cursor-pointer"
              >
                <GoPersonAdd className="text-lg" />
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </OutsideClickHandler>
      {/* <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      /> */}
      <Toaster />
    </>
  );
}
