import React from 'react';
import { IoIosSearch } from 'react-icons/io';

export default function SearchBarForResponsive(props) {
  return (
    <div className="flex justify-center items-center relative max-w-48 mx-auto mt-10 md:mt-0">
      <div className="absolute right-0 text-2xl">
        <IoIosSearch />
      </div>

      <input
        type="text"
        placeholder="Search..."
        className={
          'p-2 rounded-md border-primary-dark border bg-transparent outline-none placeholder:text-primary-dark  ' +
          props.className
        }
      />
    </div>
  );
}
