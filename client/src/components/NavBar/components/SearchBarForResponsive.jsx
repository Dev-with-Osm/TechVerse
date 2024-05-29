import React from 'react';
import { IoIosSearch } from 'react-icons/io';
import { Link } from 'react-router-dom';

export default function SearchBarForResponsive(props) {
  return (
    <div>
      <Link to={'/posts'} className=" text-2xl">
        <IoIosSearch />
      </Link>
    </div>
  );
}
