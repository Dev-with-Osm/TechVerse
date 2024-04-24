import React from 'react';
import { CiFaceFrown } from 'react-icons/ci';

export default function PageNotFound() {
  return (
    <div className="flex items-center flex-col justify-center h-screen -mt-20">
      <CiFaceFrown className="text-8xl " />

      <h1 className="text-2xl">Page not Found</h1>
    </div>
  );
}
