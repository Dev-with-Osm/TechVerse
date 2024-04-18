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

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  console.log(formData);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First Name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);

    // If there are no errors, proceed with sign-up
    if (Object.keys(newErrors).length === 0) {
      // Perform sign-up action
      console.log('Signing up...');
    }
  };

  return (
    <div className="flex items-center justify-center  p-4">
      <div className="border border-white rounded-md backdrop-blur-md w-full md:w-auto p-3 px-5">
        <div className="flex flex-col items-center">
          <div className="text-sm flex items-center">
            <p>Welcome </p>
            <Lottie animationData={handWave} className="w-7 opacity-90" />
          </div>
          <h1 className="text-base text-text-secondary opacity-90">
            Create your account for free now
          </h1>
        </div>
        <form className="py-4 flex flex-col gap-3.5" onSubmit={handleSignUp}>
          <div className="flex justify-between flex-col md:flex-row gap-3">
            <div className="flex justify-center gap-2 flex-col">
              <FromLabel title={'First Name'} />
              <div>
                <IoPersonOutline className="absolute text-lg mt-3 ml-3" />
                <input
                  type="text"
                  className={`border border-text-secondary bg-transparent hover:border-[#755d8c] transition-all duration-300 ease-in-out cursor-pointer py-2.5 pl-10 rounded-full placeholder:text-xs placeholder:text-text-secondary w-full ${
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
                  type="text"
                  className={`border border-text-secondary bg-transparent hover:border-[#755d8c] transition-all duration-300 ease-in-out cursor-pointer py-2.5 pl-10 rounded-full placeholder:text-xs placeholder:text-text-secondary w-full ${
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
          <div className="flex justify-center gap-2 flex-col">
            <FromLabel title={'Confirm Password'} />
            <div className="relative">
              <IoLockClosedOutline className="absolute text-lg mt-3.5 ml-3" />
              <button
                type="button"
                className="absolute text-lg mt-3.5 right-4"
                onClick={() => setShowConfirmedPassword(!showConfirmedPassword)}
              >
                {showConfirmedPassword ? <PiEyeLight /> : <PiEyeSlash />}
              </button>
              <input
                type={showConfirmedPassword ? 'text' : 'password'}
                placeholder="Confirm secret Password"
                className={`border border-text-secondary bg-transparent hover:border-[#755d8c] transition-all duration-300 ease-in-out cursor-pointer py-2.5 pl-10 rounded-full placeholder:text-xs placeholder:text-text-secondary w-full ${
                  errors.confirmPassword && 'border-red-500'
                }`}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>
          <div className="mt-2 flex gap-3 flex-col">
            <button
              type="submit"
              className="bg-primary hover:border-[#755d8c] transition-all duration-300 ease-in-out py-2 w-full rounded-full text-black text-xl font-semibold hover:bg-text"
            >
              Sign Up
            </button>
            <p className="text-[11px] text-right">
              Already have an account{' '}
              <Link
                to={'/sign-in'}
                className="text-blue-500 underline underline-offset-2"
              >
                Sign In
              </Link>
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[0.5px] w-1/4 bg-text-secondary"></div>
              <p className="text-xs">Or sign up with</p>
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
