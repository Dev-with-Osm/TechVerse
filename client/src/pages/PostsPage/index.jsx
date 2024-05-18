import React from 'react';
import './style.css';

export default function PostsPage() {
  return (
    <div className="flex flex-col md:flex-row gap-5 h-screen">
      <div className=" md:w-1/4 border-b md:border-b-0 md:border-r p-1 md:h-[85vh]">
        left
      </div>
      <div className="md:w-3/4 md:border md:h-[85vh] md:overflow-y-auto">
        <div className=" h-[3000px]">right</div>
      </div>
    </div>
  );
}
