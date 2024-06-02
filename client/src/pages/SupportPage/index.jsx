import React, { useEffect, useState } from 'react';
import FromLabel from '../Authentication/components/Label';
import { IoPersonOutline, IoWarningOutline } from 'react-icons/io5';
import { MdOutlineMailOutline } from 'react-icons/md';
import { VscSend, VscTag } from 'react-icons/vsc';
import { FiPhone } from 'react-icons/fi';
import Lottie from 'lottie-react';
import contactAnimation from '../../assets/animations/Animation - 1717258090578rr.json';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { FaRegCheckCircle, FaRegTimesCircle } from 'react-icons/fa';

export default function SupportPage() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    userId: currentUser?._id,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  console.log(errors);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    if (name === 'phone') {
      const phoneRegex = /^\+?\d{1,14}$/;
      if (value && !phoneRegex.test(value)) {
        newErrors.phone = 'Please enter a valid phone number.';
      } else {
        delete newErrors.phone;
      }
    }

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        newErrors.email = 'Please enter a valid email address.';
      } else {
        delete newErrors.email;
      }
    }

    if (name === 'firstName') {
      const nameRegex = /^[A-Za-z ]*$/;
      if (value && !nameRegex.test(value)) {
        newErrors.firstName = 'First name should not contain numbers.';
      } else {
        delete newErrors.firstName;
      }
    }

    if (name === 'lastName') {
      const nameRegex = /^[A-Za-z]*$/;
      if (value && !nameRegex.test(value)) {
        newErrors.lastName = 'Last name should only contain letters.';
      } else {
        delete newErrors.lastName;
      }
    }

    setErrors(newErrors);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    const firstNameRegex = /^[A-Za-z ]*$/;
    const lastNameRegex = /^[A-Za-z]*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{1,14}$/;

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

    if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Phone number is not valid.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject field is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message field is required';
    }

    setErrors(newErrors);

    if (Object.keys(errors).length === 0) {
      fetchSupport();
    } else {
      notify('emptyFields');
    }
  };

  const resetFields = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: '',
      phone: '',
    });
  };

  const fetchSupport = async () => {
    if (!currentUser) {
      notify('noUser');
      return;
    }
    const response = await fetch('/api/support', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (data.success === false) {
      console.log(data);
      notify('failed');

      return;
    }
    resetFields();
    notify('success');
  };

  const notify = (action) => {
    let message = '';
    let icon = <IoWarningOutline className="text-orange-400 text-xl" />;
    switch (action) {
      case 'emptyFields':
        message = 'Fill the required firlds';
        break;
      case 'noUser':
        message = 'Sign in first';
        break;
      case 'success':
        message = 'Your message has been sent';
        icon = <FaRegCheckCircle className="text-green-400 text-xl" />;
        break;
      case 'failed':
        message = 'Something went wrong';
        icon = <FaRegTimesCircle className="text-red-400 text-xl" />;
      default:
        break;
    }
    toast(message, {
      duration: 3000,
      position: 'bottom-right',
      icon: icon,
      style: {
        borderRadius: '10px',
        fontSize: '14px',
      },
    });
  };

  useEffect(() => {
    document.title = 'TechVerse - Support';
  }, []);

  return (
    <>
      <div className="h-full flex flex-col gap-5">
        <div className="flex  flex-col-reverse md:flex-row gap-3 p-4">
          <div className="bg-[#181919] border border-white rounded-md p-2 flex w-full justify-center">
            <form
              onSubmit={onSubmit}
              className="p-4 flex w-full flex-col gap-5"
            >
              <div className="flex flex-col md:flex-row justify-between gap-5">
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
              <div className="flex flex-col md:flex-row justify-between gap-5">
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
            <div className="flex flex-col gap-1 md:absolute top-0 z-[1]">
              <div className="flex justify-center mt-5 w-full">
                <h1 className="text-2xl font-medium">Contact us</h1>
              </div>
              <div className="w-4/5 flex mx-auto">
                <h5 className="text-center font-medium">
                  Fill out the form <span className="md:hidden">Bellow</span>{' '}
                  and our Support Manager will reach you withing 24 hours.
                </h5>
              </div>
            </div>
            <div className="md:mt-5 -mt-14">
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
      <Toaster />
    </>
  );
}
