import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { IoPersonOutline } from 'react-icons/io5';

export default function UserActions() {
  const [menu, setMenu] = React.useState(false);

  return (
    <div className="cursor-pointer">
      <div
        className="flex text-[#ccd0cf] text-2xl"
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
        <div
          className="flex items-center justify-center flex-col rounded-md"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2',
          }}
        >
          <a
            href=""
            className="px-8 py-2 hover:text-slate-400 hover:underline-offset-2 hover:underline transition-all duration-200 ease-in-out"
          >
            Sign In
          </a>
          <a
            href=""
            className="px-8 py-2 hover:text-slate-400 hover:underline-offset-2 hover:underline transition-all duration-200 ease-in-out"
          >
            Sign Up
          </a>
        </div>
      </div>
      {/* this div */}
    </div>
  );
}
