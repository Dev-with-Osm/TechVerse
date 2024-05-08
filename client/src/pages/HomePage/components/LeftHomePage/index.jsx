import React from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import HomeButton from '../../../../components/Buttons/HomeButton';
import { useSelector } from 'react-redux';

export default function LeftHomePage() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="flex flex-1 flex-col gap-5  justify-center">
      <div className="px-4 md:px-0">
        {currentUser ? (
          <h1 className="text-3xl md:text-[42px] md:leading-snug text-center md:text-left leading-snug font-medium  ">
            Now, Amplify Your Voice: Share Your Latest Tech Discoveries and
            Gaming Experiences with Teck
            <span className="text-text">Verse</span>
          </h1>
        ) : (
          <h1 className="text-3xl md:text-5xl md:leading-snug text-center md:text-left leading-snug font-medium  ">
            Stay Ahead of the Curve with Teck
            <span className="text-text">Verse</span>
            's Tech and Gaming Updates
          </h1>
        )}
      </div>
      <div className="flex justify-center md:justify-normal">
        <HomeButton title={currentUser ? 'Add post ' : 'Join now'} />
      </div>
    </div>
  );
}
