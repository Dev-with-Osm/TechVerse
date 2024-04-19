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
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserActions() {
  const [menu, setMenu] = React.useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogoutClick = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/logout');
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
      notify();
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };
  const notify = () =>
    toast.success('Logged out successfully', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });

  return (
    <>
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
              <div className="hover:border  flex items-center overflow-hidden justify-center rounded-md gap-2 w-40 h-12 hover:text-text hover:bg-black/20 transition-all duration-200 ease-in-out cursor-pointer">
                <img
                  src={currentUser.avatar}
                  alt=""
                  className="w-8 h-8 rounded-full border-white border-[1px]"
                />

                <Link to={'/sign-in'}>My profile</Link>
              </div>
              <hr className="h-[1px] bg-white w-full " />

              <div className="hover:border  flex items-center overflow-hidden justify-center rounded-md gap-2 w-40 h-12 hover:text-text hover:bg-black/20 transition-all duration-200 ease-in-out cursor-pointer">
                <IoMdAdd className="text-lg" />

                <Link>Add new post</Link>
              </div>
              <hr className="h-[0.5px] bg-white w-full " />

              <div className="hover:border  flex items-center overflow-hidden justify-center rounded-md gap-2 w-40 h-12 hover:text-text hover:bg-black/20 transition-all duration-200 ease-in-out cursor-pointer">
                <PiFilesLight className="text-lg" />

                <Link to={'/sign-in'}>My posts</Link>
              </div>
              <hr className="h-[0.5px] bg-white w-full " />
              <div className="hover:border  flex items-center overflow-hidden justify-center rounded-md gap-2 w-40 h-12 hover:text-text hover:bg-black/20 transition-all duration-200 ease-in-out cursor-pointer">
                <MdLogout className="text-lg " />

                <button onClick={handleLogoutClick}>Logout</button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center  flex-col rounded-md gap-1 border-white border backdrop-blur-xl p-2">
              <div className="hover:border  flex items-center justify-center rounded-md gap-2 w-40 h-10 hover:text-text hover:bg-black/20 transition-all duration-200 ease-in-out cursor-pointer">
                <RiBodyScanLine className="text-lg" />

                <Link to={'/sign-in'}>Sign In</Link>
              </div>
              <hr className="h-[1px] bg-white w-full " />
              <div className="flex hover:border justify-center items-center rounded-md gap-2 w-40 h-10 hover:text-text hover:bg-black/20 transition-all duration-200 ease-in-out cursor-pointer">
                <GoPersonAdd className="text-lg" />

                <Link to={'/sign-up'} className="">
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </div>
      </OutsideClickHandler>
      <ToastContainer
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
      />
    </>
  );
}
