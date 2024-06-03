import React, { useEffect, useState } from 'react';
import { IoLockClosedOutline, IoPersonOutline } from 'react-icons/io5';
import { MdOutlineMailOutline } from 'react-icons/md';
import { PiEyeLight, PiEyeSlash } from 'react-icons/pi';
import handWave from '../../../assets/animations/Animation - 1713426469054.json';
import done from '../../../assets/animations/Animation - 17135345566734.json';
import Lottie from 'lottie-react';
import FromLabel from '../components/Label';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../../../components/Modals/confirmationModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from '../../../redux/user/userSlice';
import GoogleAuth from '../OAuth/GoogleAuth';

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (name === 'firstName') {
      const nameRegex = /^[A-Za-z ]*$/;
      if (value && !nameRegex.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          firstName: 'First name should not contain numbers.',
        }));
      } else {
        setErrors((prevErrors) => {
          const { firstName, ...rest } = prevErrors;
          return rest;
        });
      }
    }

    if (name === 'lastName') {
      const nameRegex = /^[A-Za-z]*$/;
      if (value && !nameRegex.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          lastName: 'Last name should only contain letters.',
        }));
      } else {
        setErrors((prevErrors) => {
          const { lastName, ...rest } = prevErrors;
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
    // Validate form inputs
    const firstNameRegex = /^[A-Za-z ]*$/;
    const lastNameRegex = /^[A-Za-z]*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First Name is required';
    } else if (!firstNameRegex.test(formData.firstName.trim())) {
      newErrors.firstName = 'First Name should not contain numbers.';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last Name is required';
    } else if (!lastNameRegex.test(formData.lastName.trim())) {
      newErrors.lastName = 'Last Name should only contain letters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Email is not valid.';
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
      dispatch(signInStart());

      try {
        const res = await fetch('/api/auth/register', {
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
          dispatch(signInFailure(data.message));

          return;
        }
        dispatch(signInSuccess(data));

        setShowPopup(true);
      } catch (error) {
        dispatch(signInFailure(error.message));
      }
    }
  };

  useEffect(() => {
    document.title = 'TechVerse - Sign up';
  }, []);

  return (
    <div className="flex items-center justify-center h-full my-3  p-4">
      {showPopup && (
        <ConfirmationModal open={showPopup}>
          <div className="text-center ">
            <Lottie animationData={done} className=" w-40 mx-auto" />
            <div className="mx-auto my-4">
              <h3 className="text-lg font-medium text-green-400">
                Registration successfully done
              </h3>
              <h3 className="text-base  text-black">
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
        <form className="py-4 flex flex-col gap-5" onSubmit={handleSignUp}>
          <div className="flex justify-between flex-col md:flex-row gap-5">
            <div className="flex justify-center gap-2 flex-col">
              <FromLabel title={'First Name'} />
              <div>
                <IoPersonOutline className="absolute text-lg mt-3 ml-3" />
                <input
                  disabled={loading}
                  type="text"
                  className={`disabled:cursor-not-allowed border border-text-secondary focus:border-0 bg-transparent hover:border-[#755d8c] focus:ring-2 outline-none focus:ring-[#755d8c] duration-300 ease-in-out cursor-pointer py-2.5 pl-10 rounded-full placeholder:text-xs placeholder:text-text-secondary w-full ${
                    errors.firstName && '!border-red-500 focus:ring-red-500'
                  }`}
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1 absolute">
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
                  className={`disabled:cursor-not-allowed border border-text-secondary focus:border-0 bg-transparent hover:border-[#755d8c] focus:ring-2 outline-none focus:ring-[#755d8c] duration-300 ease-in-out cursor-pointer py-2.5 pl-10 rounded-full placeholder:text-xs placeholder:text-text-secondary w-full ${
                    errors.lastName && '!border-red-500 focus:ring-red-500'
                  }`}
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1 absolute ">
                    {errors.lastName}
                  </p>
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
                className={`border border-text-secondary disabled:cursor-not-allowed focus:border-0 bg-transparent hover:border-[#755d8c] focus:ring-2 outline-none focus:ring-[#755d8c] duration-300 ease-in-out cursor-pointer py-2.5 pl-10 rounded-full placeholder:text-xs placeholder:text-text-secondary w-full ${
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
                className="absolute text-xl mt-3 right-4"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <PiEyeLight /> : <PiEyeSlash />}
              </button>
              <input
                disabled={loading}
                type={showPassword ? 'text' : 'password'}
                placeholder={'Secret Password'}
                className={`border border-text-secondary disabled:cursor-not-allowed focus:border-0 bg-transparent hover:border-[#755d8c] focus:ring-2 outline-none focus:ring-[#755d8c] duration-300 ease-in-out cursor-pointer py-2.5 pl-10 rounded-full placeholder:text-xs placeholder:text-text-secondary w-full ${
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
          <div className="flex justify-center gap-2 flex-col">
            <FromLabel title={'Confirm Password'} />
            <div className="relative">
              <IoLockClosedOutline className="absolute text-lg mt-3.5 ml-3" />
              <button
                type="button"
                className="absolute text-xl mt-3 right-4"
                onClick={() => setShowConfirmedPassword(!showConfirmedPassword)}
              >
                {showConfirmedPassword ? <PiEyeLight /> : <PiEyeSlash />}
              </button>
              <input
                disabled={loading}
                type={showConfirmedPassword ? 'text' : 'password'}
                placeholder={'Confirm secret Password'}
                className={`border border-text-secondary disabled:cursor-not-allowed focus:border-0 bg-transparent hover:border-[#755d8c] focus:ring-2 outline-none focus:ring-[#755d8c] duration-300 ease-in-out cursor-pointer py-2.5 pl-10 rounded-full placeholder:text-xs placeholder:text-text-secondary w-full ${
                  errors.confirmPassword && '!border-red-500 focus:ring-red-500'
                }`}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1 absolute">
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
              {loading ? 'Sign Up...' : 'Sign Up'}
            </button>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
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
              <GoogleAuth />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
