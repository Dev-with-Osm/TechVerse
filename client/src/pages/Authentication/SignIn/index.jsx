import React, { useEffect, useState } from 'react';
import { IoLockClosedOutline, IoPersonOutline } from 'react-icons/io5';
import { MdOutlineMailOutline } from 'react-icons/md';
import { PiEyeLight, PiEyeSlash } from 'react-icons/pi';

import handWave from '../../../assets/animations/Animation - 1713426469054.json';
import Lottie from 'lottie-react';
import FromLabel from '../components/Label';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../../../components/Modals/confirmationModal/index.jsx';
import done from '../../../assets/animations/Animation - 17135345566734.json';
import { useDispatch, useSelector } from 'react-redux';

import {
  signInFailure,
  signInStart,
  signInSuccess,
} from '../../../redux/user/userSlice.js';
import GoogleAuth from '../OAuth/GoogleAuth/index.jsx';

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: 'Please enter a valid email address.',
        }));
      } else {
        setErrors((prevErrors) => {
          const { email, ...rest } = prevErrors;
          return rest;
        });
      }
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Validate form inputs
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Email is not valid.';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);

    // If there are no errors, proceed with sign-up
    if (Object.keys(newErrors).length === 0) {
      // Perform sign-up action
      dispatch(signInStart());
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        // If there is an error, display it
        if (data.success === false) {
          dispatch(signInFailure(data.message));
          return;
        }
        // If there is no error, redirect to the home page
        dispatch(signInSuccess(data));
        setShowPopup(true);
      } catch (error) {
        dispatch(signInFailure(error.message));
      }
    }
  };

  useEffect(() => {
    document.title = 'TechVerse - Sign in';
  }, []);

  return (
    <div className="flex items-center h-screen justify-center -mt-10 p-4">
      {showPopup && (
        <ConfirmationModal open={showPopup}>
          <div className="text-center ">
            <Lottie animationData={done} className="  w-20 -mt-4 mx-auto" />
            <div className="mx-auto mb-4">
              <h3 className="text-lg  text-green-500">Awesome</h3>
              <h3 className="text-black text-sm">
                Congratulations! <br /> You're now part of our community. <br />
                Let the adventure begin
              </h3>
            </div>
            <div className="flex gap-4 items-center justify-center">
              <Link
                to={'/'}
                className="bg-black/90 p-3 rounded-lg hover:bg-black/70"
              >
                continue
              </Link>
            </div>
          </div>
        </ConfirmationModal>
      )}
      <div className="border border-white rounded-md backdrop-blur-md w-full md:w-auto p-3 px-5">
        <div className="flex flex-col items-center">
          <div className="text-sm flex items-center">
            <p>Welcome Back</p>
            <Lottie animationData={handWave} className="w-7 opacity-90" />
          </div>
          <h1 className="text-base text-text-secondary opacity-90">
            Sign In to your account
          </h1>
        </div>
        <form
          className="py-4 flex flex-col gap-5 md:w-[480px]"
          onSubmit={handleSignUp}
        >
          <div className="flex justify-center gap-2 flex-col">
            <FromLabel title={'Email Address'} />
            <div>
              <MdOutlineMailOutline className="absolute text-lg mt-3.5 ml-3" />
              <input
                type="email"
                placeholder="example@example.com"
                disabled={loading}
                className={`border border-text-secondary focus:border-0 bg-transparent hover:border-[#755d8c] focus:ring-2 outline-none focus:ring-[#755d8c] transition-all duration-300 ease-in-out cursor-pointer py-2.5 pl-10 rounded-full disabled:cursor-not-allowed  placeholder:text-xs placeholder:text-text-secondary w-full ${
                  errors.email && '!border-red-500 focus:ring-red-500'
                }`}
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 absolute">
                  {errors.email}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-center gap-2 flex-col">
            <FromLabel title={'Password'} />
            <div className="relative">
              <IoLockClosedOutline className="absolute text-lg mt-3.5 ml-3" />
              <button
                type="button"
                className="absolute text-lg mt-3.5 right-4"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <PiEyeLight /> : <PiEyeSlash />}
              </button>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Secret Password"
                disabled={loading}
                className={`border border-text-secondary focus:border-0 bg-transparent hover:border-[#755d8c] focus:ring-2 disabled:cursor-not-allowed outline-none focus:ring-[#755d8c] duration-300 ease-in-out cursor-pointer py-2.5 pl-10 rounded-full placeholder:text-xs placeholder:text-text-secondary w-full ${
                  errors.password && '!border-red-500 focus:ring-red-500'
                }`}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 absolute">
                  {errors.password}
                </p>
              )}
            </div>
          </div>

          <div className="mt-2 flex gap-3 flex-col">
            <button
              type="submit"
              className="bg-primary hover:border-[#755d8c] transition-all duration-300 ease-in-out py-2 w-full rounded-full text-black text-xl font-semibold hover:bg-text"
            >
              {loading ? 'Sign In...' : 'Sign In'}
            </button>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            <p className="text-[11px] text-right">
              Don't have an account{' '}
              <Link
                to={'/sign-up'}
                className="text-blue-500 underline underline-offset-2"
              >
                Sign Up
              </Link>
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[0.5px] w-1/4 bg-text-secondary"></div>
              <p className="text-xs">Or sign In with</p>
              <div className="h-[0.5px] w-1/4 bg-text-secondary"></div>
            </div>
            <div className="mt-2 flex items-center gap-10 w-full">
              <GoogleAuth />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
