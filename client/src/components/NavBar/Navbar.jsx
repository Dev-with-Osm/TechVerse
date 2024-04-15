import { useState } from 'react';
import { navigation } from './Constants';
import { IoCloseOutline, IoPersonOutline } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import { CgMenuLeftAlt } from 'react-icons/cg';

export default function Navbar() {
  const [nav, setNav] = useState(false);
  const [menu, setMenu] = useState(false);

  return (
    <div className="shadow-sm text-white">
      <div className=" flex justify-between items-center py-4 md:py-0 max-w-[1240px] mx-auto px-4">
        <div className="flex items-center gap-1">
          <div
            onClick={() => setNav(!nav)}
            className="block md:hidden cursor-pointer"
          >
            {nav ? <IoCloseOutline size={28} /> : <CgMenuLeftAlt size={24} />}
          </div>
          <h1 className="text-3xl font-medium">
            {/* Logo */}
            Tech<span className="text-xl text-text">Verse</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center">
          {navigation.map((item) => (
            <li
              key={item.id}
              className="p-4 rounded-xl my-2 cursor-pointer duration-300 hover:text-text-secondary"
            >
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
        {/* Mobile Navigation */}
        <div className="flex items-center  gap-4  border-gray-400 rounded-full p-1 text-gray-700">
          <div className="flex text-[#ccd0cf] text-2xl">
            <IoPersonOutline />
            <IoIosArrowDown />
          </div>
        </div>
        <ul
          className={
            nav
              ? 'fixed flex flex-col justify-center md:hidden left-0 top-16 z-50 w-[60%] h-[90vh]  shadow-md text-text-secondary bg-[#021024] ease-in-out duration-500'
              : 'ease-in-out flex flex-col justify-center w-[60%] duration-500 fixed top-16 bottom-0 left-[-100%] '
          }
        >
          {/* Mobile Logo */}
          <div></div>

          {/* Mobile Navigation Items */}
          <div className="-mt-40">
            {navigation.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-center  p-4  text-lg duration-300 font-semibold cursor-pointer"
              >
                <a href={item.url}>{item.title}</a>
              </li>
            ))}
          </div>
          <div></div>
        </ul>
      </div>
    </div>
  );
}
