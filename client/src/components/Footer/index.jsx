import React from 'react';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(path);
  };

  return (
    <div className="w-full h-full bg-[#171818] text-white border-t border-text-secondary">
      <div className="max-w-7xl mx-auto py-10 justify-around items-center flex flex-col md:flex-row gap-6">
        <div>
          <Link
            to="/"
            className="text-3xl font-medium md:-mt-2.5"
            onClick={() => handleLinkClick('/')}
          >
            Tech<span className="text-xl text-text">Verse</span>
          </Link>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col gap-2">
            <Link to="/" className="" onClick={() => handleLinkClick('/')}>
              Home
            </Link>
            <Link
              to="/about"
              className=""
              onClick={() => handleLinkClick('/about')}
            >
              About
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <Link
              to="/posts"
              className=""
              onClick={() => handleLinkClick('/posts')}
            >
              Posts
            </Link>
            <Link
              to="/support"
              className=""
              onClick={() => handleLinkClick('/support')}
            >
              Support
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            {!currentUser ? (
              <div className="flex flex-col gap-2">
                <Link
                  to="/sign-in"
                  className=""
                  onClick={() => handleLinkClick('/sign-in')}
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className=""
                  onClick={() => handleLinkClick('/sign-up')}
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div>
          <div className="social-icon">
            <a href="https://www.instagram.com/not_osm97/" target="_blank">
              <FaInstagram />
            </a>
            <a href="#">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
      <div className="h-[0.5px] max-w-7xl mx-auto my-2 bg-gray-500" />
      <div className="p-1 pb-2">
        <p className="text-center text-sm">
          &copy; {currentYear}. All rights reserved.
        </p>
      </div>
    </div>
  );
}
