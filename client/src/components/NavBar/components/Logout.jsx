import React from 'react';
import { MdLogout } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from '../../../redux/user/userSlice';

export default function Logout() {
  const dispatch = useDispatch();
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
      <div className="hover:border  flex items-center overflow-hidden justify-center rounded-md gap-2 w-40 h-12 hover:text-text hover:bg-black/20 transition-all duration-200 ease-in-out cursor-pointer">
        <MdLogout className="text-lg " />

        <button onClick={handleLogoutClick}>Logout</button>
      </div>
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
