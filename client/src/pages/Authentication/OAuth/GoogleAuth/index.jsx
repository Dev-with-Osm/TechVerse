import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../../../../firebase.js';
import { signInSuccess } from '../../../../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';
import ConfirmationModal from '../../../../components/Modals/confirmationModal/index.jsx';
import done from '../../../../assets/animations/Animation - 17135345566734.json';
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';

export default function GoogleAuth() {
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const handleClick = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const result = await signInWithPopup(auth, provider);

    // Split the display name into first name and last name
    const displayName = result.user.displayName || 'Unknown';
    const nameArray = displayName.split(' ');
    let firstName = nameArray[0];
    let lastName = nameArray[nameArray.length - 1];

    // If the first name contains two words, concatenate them
    if (nameArray.length > 2) {
      firstName = nameArray.slice(0, 2).join(' ');
      lastName = nameArray[nameArray.length - 1];
    }

    // send user info to the server
    const res = await fetch('api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: result.user.email,
        avatar: result.user.photoURL,
      }),
    });
    const data = await res.json();
    dispatch(signInSuccess(data));
    setShowPopup(true);
  };

  return (
    <>
      {showPopup && (
        <ConfirmationModal open={showPopup}>
          <div className="text-center ">
            <Lottie animationData={done} className=" w-40 mx-auto" />
            <div className="mx-auto my-4">
              <h3 className="text-lg font-medium text-green-400">
                Registration successfully done
              </h3>
              <h3 className="text-base text-black">
                welcome to the community
              </h3>
            </div>
            <div className="flex gap-4 items-center justify-center">
              <Link
                to={'/'}
                className="bg-black/90 p-3 rounded-lg hover:bg-black/70  "
              >
                continue
              </Link>
            </div>
          </div>
        </ConfirmationModal>
      )}
      <button
        onClick={handleClick}
        type="button"
        className=" w-full hover:border-[#755d8c] transition-all duration-300 ease-in-out h-10 rounded-lg flex justify-center items-center font-medium gap-2.5 border border-primary"
      >
        <FcGoogle />
        Google
      </button>
    </>
  );
}
