import React from 'react';
import './style.css';

export default function PostsPage() {
  return (
    <div className="flex flex-col md:flex-row gap-5 h-screen">
      <div className="w-1/4 border-b md:border-b-0 md:border-r p-1 h-[85vh]">
        left
      </div>
      <div className="w-3/4 border h-[85vh] overflow-y-auto">
        <div className=" h-[3000px]">right</div>
      </div>
    </div>
  );
}
