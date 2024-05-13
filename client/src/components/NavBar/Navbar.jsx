import { useState } from 'react';
import { navigation } from './Constants';
import { IoCloseOutline } from 'react-icons/io5';
import { CgMenuLeftAlt } from 'react-icons/cg';
import OutsideClickHandler from 'react-outside-click-handler';
import UserActions from './components/UserActions';
import SearchBarForResponsive from './components/SearchBarForResponsive';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [nav, setNav] = useState(false);
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
          <Link to={'/'} className="text-3xl font-medium md:-mt-2.5">
            {/* Logo */}
            Tech<span className="text-xl text-text">Verse</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center ml-16">
            {navigation.map((item) => (
              <li
                key={item.id}
                className="p-4 rounded-xl my-2 cursor-pointer duration-300 hover:text-text-secondary"
              >
                <Link to={item.url}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <OutsideClickHandler onOutsideClick={() => setNav(false)}>
          {/* Mobile Navigation */}
          <div className="flex items-center justify-center gap-5">
            <div className="hidden md:block">
              <SearchBarForResponsive
                className={
                  'text-white placeholder:text-white border-text-secondary border-[0.5px] placeholder:text-sm'
                }
              />
            </div>

            <UserActions />
          </div>
          <ul
            className={
              nav
                ? 'fixed flex flex-col md:hidden left-0 top-0 z-[99] w-[60%] h-[100vh] shadow-md text-primary-dark container ease-in-out duration-500 '
                : 'ease-in-out flex flex-col  w-[60%] z-[99] duration-500 fixed top-0 bottom-0 left-[-100%] '
            }
          >
            {/* Mobile Logo */}
            {/* Mobile Navigation Items */}
            <div className="mt-5">
              <SearchBarForResponsive />

              {navigation.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-center m  p-4  text-lg duration-300 font-semibold cursor-pointer"
                >
                  <Link onClick={() => setNav(false)} to={item.url}>
                    {item.title}
                  </Link>
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
