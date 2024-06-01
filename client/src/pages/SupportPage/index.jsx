import React, { useEffect, useState } from 'react';
import FromLabel from '../Authentication/components/Label';
import { IoPersonOutline } from 'react-icons/io5';
import { MdOutlineMailOutline } from 'react-icons/md';
import { VscSend, VscTag } from 'react-icons/vsc';
import { FiPhone } from 'react-icons/fi';
import Lottie from 'lottie-react';
import contactAnimation from '../../assets/animations/Animation - 1717258090578rr.json';

export default function SupportPage() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const phoneRegex = /^\+?\d{1,14}$/;
      if (value && !phoneRegex.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: 'Please enter a valid phone number.',
        }));
      } else {
        setErrors((prevErrors) => {
          const { phone, ...rest } = prevErrors;
          return rest;
        });
      }
    }

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

  const onSubmit = (e) => {
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
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'subject field is required';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message field is required';
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('done');
    }
  };

  useEffect(() => {
    document.title = 'TechVerse - Support';
  }, []);

  return (
    <div className="h-full flex flex-col gap-5">
      <h1 className="text-3xl mt-5 text-center font-bold">Support Page</h1>
      <div className="flex  flex-col-reverse md:flex-row gap-3 p-4">
        <div className="bg-[#181919] border border-white rounded-md p-2 flex w-full justify-center">
          <form onSubmit={onSubmit} className="p-4 flex w-full flex-col gap-5">
            <div className="flex flex-col md:flex-row justify-between gap-3">
              <div className="flex justify-center gap-2 flex-col w-full">
                <FromLabel title="First Name" />
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
              <div className="flex justify-center gap-2 flex-col w-full">
                <FromLabel title="Last Name" />
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
                    <p className="text-red-500 text-xs mt-1 absolute">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-3">
              <div className="flex justify-center gap-2 flex-col w-full">
                <FromLabel title="Email Address" />
                <div>
                  <MdOutlineMailOutline className="absolute text-lg mt-3.5 ml-3" />
                  <input
                    disabled={loading}
                    type="email"
                    placeholder="example@example.com"
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
              <div className="flex justify-center gap-2 flex-col w-full">
                <label className="text-sm flex items-center gap-1">
                  Phone Number
                  <span className="text-xs text-white/50">(Optional)</span>
                </label>
                <div>
                  <FiPhone className="absolute text-lg mt-3.5 ml-3" />
                  <input
                    disabled={loading}
                    type="number"
                    placeholder="Enter your phone number"
                    className={`border border-text-secondary disabled:cursor-not-allowed focus:border-0 bg-transparent hover:border-[#755d8c] focus:ring-2 outline-none focus:ring-[#755d8c] duration-300 ease-in-out cursor-pointer py-2.5 pl-10 rounded-full placeholder:text-xs placeholder:text-text-secondary w-full ${
                      errors.phone && '!border-red-500 focus:ring-red-500'
                    }`}
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    pattern="/^\+?\d{1,14}$/"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1 absolute ">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-2 flex-col">
              <FromLabel title="Subject" />
              <div>
                <VscTag className="absolute text-lg mt-3.5 ml-3" />
                <input
                  disabled={loading}
                  type="text"
                  placeholder="Type the subject of your message"
                  className={`border border-text-secondary disabled:cursor-not-allowed focus:border-0 bg-transparent hover:border-[#755d8c] focus:ring-2 outline-none focus:ring-[#755d8c] duration-300 ease-in-out cursor-pointer py-2.5 pl-10 rounded-full placeholder:text-xs placeholder:text-text-secondary w-full ${
                    errors.subject && '!border-red-500 focus:ring-red-500'
                  }`}
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                />
                {errors.subject && (
                  <p className="text-red-500 text-xs mt-1 absolute">
                    {errors.subject}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-center gap-2 flex-col">
              <FromLabel title="Message" />
              <div>
                <VscTag className="absolute text-lg mt-3.5 ml-3" />
                <textarea
                  disabled={loading}
                  rows={6}
                  placeholder="Type your message here"
                  className={`border border-text-secondary disabled:cursor-not-allowed focus:border-0 bg-transparent hover:border-[#755d8c] focus:ring-2 outline-none focus:ring-[#755d8c] duration-300 ease-in-out cursor-pointer py-2.5 pl-10 rounded-md placeholder:text-xs placeholder:text-text-secondary w-full ${
                    errors.message && '!border-red-500 focus:ring-red-500'
                  }`}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1 absolute">
                    {errors.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end">
              <button className="bg-white text-primary-dark px-10 py-2  font-medium rounded-md flex gap-1 items-center">
                Send
                <VscSend />
              </button>
            </div>
          </form>
        </div>
        <div className="bg-[#FEF2DD] border-white border rounded-md relative text-black p-2 flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-1 absolute top-0 z-30">
            <div className="flex justify-center mt-5 w-full">
              <h1 className="text-2xl font-medium">Contact us</h1>
            </div>
            <div className="w-4/5 flex mx-auto">
              <h5 className="text-center font-medium">
                Fill out the form and our Support Manager will reach you withing
                24 hours.
              </h5>
            </div>
          </div>
          <div className="">
            <Lottie animationData={contactAnimation} />
          </div>
          <div className="absolute bottom-10 w-full right-0 left-0">
            <div className="flex justify-center items-center w-full">
              <p className="text-center">
                You have an issue. We have a solution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
