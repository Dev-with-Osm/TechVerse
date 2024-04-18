import React from 'react';
import Lottie from 'lottie-react';
import homeVid from '../../../../assets/animations/Animation - 1713375383072.json';

export default function RightHomePage() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Lottie animationData={homeVid} className="w-5/6" />
    </div>
  );
}
