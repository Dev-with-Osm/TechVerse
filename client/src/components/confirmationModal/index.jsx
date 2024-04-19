import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';

export default function ConfirmationModal({ open, onClose, children }) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? 'visible bg-black/60 z-10 ' : 'invisible'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow p-6 transition-all ${
          open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
        }`}
      >
        {/* <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-3xl p-1 rounded-lg bg-black hover:bg-gray-700 cursor-pointer"
        >
          <IoCloseOutline />
        </button> */}
        {children}
      </div>
    </div>
  );
}
