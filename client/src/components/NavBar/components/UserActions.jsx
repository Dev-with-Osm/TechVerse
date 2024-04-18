import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { IoPersonOutline } from 'react-icons/io5';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link } from 'react-router-dom';

export default function UserActions() {
  const [menu, setMenu] = React.useState(false);

  return (
    <OutsideClickHandler onOutsideClick={() => setMenu(false)}>
      <div
        className="flex text-[#ccd0cf] text-2xl cursor-pointer"
        onClick={() => setMenu((prevState) => !prevState)}
      >
        <IoPersonOutline />
        <IoIosArrowDown
          className={`transform transition-transform duration-300 ${
            menu ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </div>
      {/* this div */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          menu ? 'block' : 'hidden'
        } bg-transparent absolute right-0 mt-5 mr-5 2xl:mr-40`}
      >
        <div className="flex items-center justify-center flex-col rounded-md border-white border backdrop-blur-xl">
          <Link
            to={'/sign-in'}
            className="px-8 py-2 hover:text-text hover:underline-offset-2 hover:underline transition-all duration-200 ease-in-out"
          >
            Sign In
          </Link>
          <Link
            to={'/sign-up'}
            className="px-8 py-2 hover:text-text hover:underline-offset-2 hover:underline transition-all duration-200 ease-in-out"
          >
            Sign Up
          </Link>
        </div>
      </div>
      {/* this div */}
    </OutsideClickHandler>
  );
}
