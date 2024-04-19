import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../../../../firebase.js';

export default function GoogleAuth() {
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
    console.log(data);
  };

  const generateRandomString = () => {
    const randomString = Math.random().toString(36).substring(7);
    return randomString;
  };
  return (
    <button
      onClick={handleClick}
      type="button"
      className=" w-full hover:border-[#755d8c] transition-all duration-300 ease-in-out h-10 rounded-lg flex justify-center items-center font-medium gap-2.5 border border-primary"
    >
      <FcGoogle />
      Google
    </button>
  );
}
