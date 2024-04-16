import React from 'react';
import { IoIosSearch } from 'react-icons/io';

export default function SearchBarForResponsive() {
  return (
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
  );
}
