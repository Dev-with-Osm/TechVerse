import React from 'react';
import { FaGithub } from 'react-icons/fa';

export default function GithubAuth() {
  return (
    <button
      type="button"
      className="w-full hover:border-[#755d8c] transition-all duration-300 ease-in-out h-10 rounded-lg flex justify-center items-center font-medium gap-2.5 border border-primary"
    >
      <FaGithub />
      GitHub
    </button>
  );
}
