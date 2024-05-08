import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function AboutPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <button onClick={notify}>Make me a toast</button>
      <Toaster />
    </div>
  );
}
