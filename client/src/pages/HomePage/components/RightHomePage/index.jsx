import React from 'react';
import Lottie from 'lottie-react';
import homeVid from '../../../../assets/animations/Animation - 1713375383072.json';

export default function RightHomePage() {
  return (
    <div className="relative flex flex-1 items-center justify-center ">
      <Lottie animationData={homeVid} className="w-4/5" />
    </div>
  );
}
