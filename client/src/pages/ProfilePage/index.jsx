import React, { useEffect, useRef, useState } from 'react';
import { IoLockClosedOutline, IoPersonOutline } from 'react-icons/io5';
import { MdOutlineMailOutline } from 'react-icons/md';
import { BsPencilSquare } from 'react-icons/bs';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../firebase.js';

import { PiEyeLight, PiEyeSlash } from 'react-icons/pi';
import ProgressBar from '@ramonak/react-progress-bar';

import FromLabel from '../Authentication/components/Label/index';
import ConfirmationModal from '../../components/Modals/confirmationModal/index';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from '../../redux/user/userSlice';

export default function Profile() {
  const fileRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const [file, setFile] = useState(undefined);
  const [filePercentage, setfilePercentage] = useState(0);
  const [fileError, setFileError] = useState(false);
  const { loading, error, currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    password: '',
    avatar: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (file) {
      handleFile(file);
    }
  }, [file]);

  const handleFile = (file) => {
    setFileError(false);
    const storage = getStorage(app);
    const fileName = file.name + new Date().getTime();
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setfilePercentage(Math.round(progress));
      },
      (error) => {
        setFileError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      },
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    // Validate form inputs
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    setErrors(newErrors);

    // If there are no errors, proceed with sign-up
    if (Object.keys(newErrors).length === 0) {
      // Perform sign-up action
      dispatch(updateUserStart());

      try {
        const res = await fetch(`/api/user/update/${currentUser._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log(data);
        // If there is an error, display it
        if (data.success === false) {
          dispatch(updateUserFailure(data.message));

          return;
        }
        dispatch(updateUserSuccess(data));

        setShowPopup(true);
      } catch (error) {
        dispatch(updateUserFailure(error.message));
      }
    }
  };

  return (
    <div className="flex items-center justify-center  p-4">
      {showPopup && (
        <ConfirmationModal open={showPopup}>
          <div className="text-center ">
            <div className="mx-auto my-4">
              <h3 className="text-lg font-black text-green-400">
                Registration successfully done
              </h3>
              <h3 className="text-lg font-black text-black">
                welcome to the community
              </h3>
            </div>
            <div className="flex gap-4 items-center justify-center">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-black/90 p-3 rounded-lg hover:bg-black/70  "
              >
                continue
              </button>
            </div>
          </div>
        </ConfirmationModal>
      )}
      <div className="border border-white rounded-md backdrop-blur-md w-full md:w-auto p-3 px-5">
        <form className="py-4 flex flex-col gap-3.5" onSubmit={handleSignUp}>
          <div
            className="flex flex-col items-center mb-3 relative w-fit mx-auto cursor-pointer"
            onClick={() => fileRef.current.click()}
          >
            <div className="absolute right-0 bottom-0 p-0.5 w-7 h-7  rounded-full bg-[#1B1C1C] text-white">
              <BsPencilSquare className=" bg-white p-1 rounded-full text-2xl text-black" />
            </div>

            <img
              src={formData.avatar || currentUser?.avatar}
              alt=""
              className="w-20 h-20 rounded-full"
            />
          </div>

          {file && fileError ? (
            <div className="-mt-5 mb-3 flex justify-center text-xs text-red-600">
              Error uploading image (image must be less than 4 MB)
            </div>
          ) : (
            ''
          )}

          {file && !fileError ? (
            filePercentage === 100 ? (
              <div className="-mt-5 mb-3 flex justify-center text-xs text-green-600">
                Profile image updated successfully
              </div>
            ) : filePercentage > 0 && filePercentage < 100 ? (
              <div className="-mt-5 mb-3 flex justify-center text-xs">
                Load{' '}
                <span className="text-slate-300 ml-1">{filePercentage}</span>%
                of the image.
              </div>
            ) : (
              ''
            )
          ) : (
            ''
          )}

          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            multiple={false}
          />
          <div className="flex justify-between flex-col md:flex-row gap-3">
            <div className="flex justify-center gap-2 flex-col">
              <FromLabel title={'First Name'} />
              <div>
                <IoPersonOutline className="absolute text-lg mt-3 ml-3" />
                <input
                  disabled={loading}
                  type="text"
                  className={`disabled:cursor-not-allowed border border-text-secondary focus:border-0 bg-transparent hover:border-[#755d8c] focus:ring-2 outline-none focus:ring-[#755d8c] duration-300 ease-in-out  py-2.5 pl-10 rounded-full placeholder:text-xs placeholder:text-text-secondary w-full ${
                    errors.firstName && 'border-red-500'
                  }`}
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-center gap-2 flex-col">
              <FromLabel title={'Last Name'} />
              <div>
                <IoPersonOutline className="absolute text-lg mt-3 ml-3" />
                <input
                  disabled={loading}
                  type="text"
                  className={`disabled:cursor-not-allowed border border-text-secondary focus:border-0 bg-transparent hover:border-[#755d8c] focus:ring-2 outline-none focus:ring-[#755d8c] duration-300 ease-in-out  py-2.5 pl-10 rounded-full placeholder:text-xs placeholder:text-text-secondary w-full ${
                    errors.lastName && 'border-red-500'
                  }`}
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 flex-col">
            <FromLabel title={'Email Address'} />
            <div>
              <MdOutlineMailOutline className="absolute text-lg mt-3.5 ml-3" />
              <input
                disabled={loading}
                type="email"
                placeholder={'example@example.com'}
                className={`border border-text-secondary disabled:cursor-not-allowed focus:border-0 bg-transparent hover:border-[#755d8c] focus:ring-2 outline-none focus:ring-[#755d8c] duration-300 ease-in-out  py-2.5 pl-10 rounded-full placeholder:text-xs placeholder:text-text-secondary w-full ${
                  errors.email && 'border-red-500'
                }`}
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>
          <div className="flex justify-center gap-2 flex-col">
            <FromLabel title={'Password'} />
            <div className="relative">
              <IoLockClosedOutline className="absolute text-lg mt-3.5 ml-3" />
              <button
                type="button"
                className="absolute text-xl mt-3 right-4"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <PiEyeLight /> : <PiEyeSlash />}
              </button>
              <input
                disabled={loading}
                type={showPassword ? 'text' : 'password'}
                placeholder={'Secret Password'}
                className={`border border-text-secondary disabled:cursor-not-allowed focus:border-0 bg-transparent hover:border-[#755d8c] focus:ring-2 outline-none focus:ring-[#755d8c] duration-300 ease-in-out  py-2.5 pl-10 rounded-full placeholder:text-xs placeholder:text-text-secondary w-full ${
                  errors.password && 'border-red-500'
                }`}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="mt-2 flex gap-3 flex-col">
            <button
              type="submit"
              className="bg-primary hover:border-[#755d8c] transition-all duration-300 ease-in-out py-2 w-full rounded-full text-black text-xl font-semibold hover:bg-text"
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
