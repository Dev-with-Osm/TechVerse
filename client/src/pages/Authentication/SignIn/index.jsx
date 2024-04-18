import React, { useState } from 'react';
import { IoLockClosedOutline, IoPersonOutline } from 'react-icons/io5';
import { MdOutlineMailOutline } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { PiEyeLight, PiEyeSlash } from 'react-icons/pi';

import handWave from '../../../assets/animations/Animation - 1713426469054.json';
import Lottie from 'lottie-react';
import FromLabel from '../components/Label';
import { Link } from 'react-router-dom';

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  console.log(formData);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // Validate form inputs
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);

    // If there are no errors, proceed with sign-up
    if (Object.keys(newErrors).length === 0) {
      // Perform sign-up action
      console.log('Signing up...');
    }
  };

  return (
    <div className="flex items-center justify-center mt-10 p-4">
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
          className="py-4 flex flex-col gap-3.5 md:w-[480px]"
          onSubmit={handleSignUp}
        >
          <div className="flex justify-center gap-2 flex-col">
            <FromLabel title={'Email Address'} />
            <div>
              <MdOutlineMailOutline className="absolute text-lg mt-3.5 ml-3" />
              <input
                type="email"
                placeholder="example@example.com"
                className={`border border-text-secondary bg-transparent hover:border-[#755d8c] transition-all duration-300 ease-in-out cursor-pointer py-2.5 pl-10 rounded-full placeholder:text-xs placeholder:text-text-secondary w-full ${
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
                className="absolute text-lg mt-3.5 right-4"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <PiEyeLight /> : <PiEyeSlash />}
              </button>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Secret Password"
                className={`border border-text-secondary bg-transparent hover:border-[#755d8c] transition-all duration-300 ease-in-out cursor-pointer py-2.5 pl-10 rounded-full placeholder:text-xs placeholder:text-text-secondary w-full ${
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
              Sign In
            </button>
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
              <button
                type="button"
                className=" w-full hover:border-[#755d8c] transition-all duration-300 ease-in-out h-10 rounded-lg flex justify-center items-center font-medium gap-2.5 border border-primary"
              >
                <FcGoogle />
                Google
              </button>
              <button
                type="button"
                className="w-full hover:border-[#755d8c] transition-all duration-300 ease-in-out h-10 rounded-lg flex justify-center items-center font-medium gap-2.5 border border-primary"
              >
                <FaGithub />
                GitHub
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
