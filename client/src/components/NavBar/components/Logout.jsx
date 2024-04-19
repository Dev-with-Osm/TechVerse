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
      console.log(data);
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };
  return (
    <div className="hover:border  flex items-center overflow-hidden justify-center rounded-md gap-2 w-40 h-12 hover:text-text hover:bg-black/20 transition-all duration-200 ease-in-out cursor-pointer">
      <MdLogout className="text-lg " />

      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
}
