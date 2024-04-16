import { useState } from 'react';
import { navigation } from './Constants';
import { IoCloseOutline, IoPersonOutline } from 'react-icons/io5';
import { IoIosArrowDown, IoIosSearch } from 'react-icons/io';
import { CgMenuLeftAlt } from 'react-icons/cg';
import OutsideClickHandler from 'react-outside-click-handler';

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
        <OutsideClickHandler onOutsideClick={() => setNav(false)}>
          {/* Mobile Navigation */}
          <div className="">
            <div
              className="flex text-[#ccd0cf] text-2xl"
              onClick={() => setMenu(menu ? false : true)}
            >
              <IoPersonOutline />
              <IoIosArrowDown />
            </div>
            {/* this div */}
            {menu && (
              <div className="bg-transparent absolute right-0 mt-5 mr-5 2xl:mr-40">
                <div
                  className="flex items-center justify-center flex-col rounded-md "
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2',
                  }}
                >
                  <a
                    href=""
                    className="px-8 py-2 hover:text-slate-400 hover:underline-offset-2 hover:underline"
                  >
                    Sign In
                  </a>
                  <a
                    href=""
                    className="px-8 py-2 hover:text-slate-400 hover:underline-offset-2 hover:underline"
                  >
                    Sign Up
                  </a>
                </div>
              </div>
            )}

            {/* this div */}
          </div>

          <ul
            className={
              nav
                ? 'fixed flex flex-col md:hidden left-0 top-16 z-50 w-[60%] h-[100vh] shadow-md text-primary-dark bg-text-secondary ease-in-out duration-500 '
                : 'ease-in-out flex flex-col  w-[60%] duration-500 fixed top-16 bottom-0 left-[-100%] '
            }
          >
            {/* Mobile Logo */}
            <div className="flex justify-center items-center relative max-w-48 mx-auto mt-10">
              <div className="absolute right-0 text-2xl">
                <IoIosSearch />
              </div>

              <input
                type="text"
                placeholder="Search..."
                className="p-2 rounded-md border-primary-dark border-2 bg-transparent outline-none placeholder:text-primary-dark"
              />
            </div>

            {/* Mobile Navigation Items */}
            <div className="mt-5">
              {navigation.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-center m  p-4  text-lg duration-300 font-semibold cursor-pointer"
                >
                  <a href={item.url}>{item.title}</a>
                </li>
              ))}
            </div>
            <div></div>
          </ul>
        </OutsideClickHandler>
      </div>
    </div>
  );
}
