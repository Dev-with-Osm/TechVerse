import React from 'react';
import Lottie from 'lottie-react';
import notFound from '../assets/animations/Animation - 17140664299163467.json';

export default function PageNotFound() {
  return (
    <div className="flex items-center flex-col justify-center h-screen -mt-20">
      <Lottie animationData={notFound} />
      <h1 className="md:-mt-20 text-3xl">Page Not Found!</h1>
    </div>
  );
}
