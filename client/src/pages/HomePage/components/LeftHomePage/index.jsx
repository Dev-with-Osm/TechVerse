import React from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import HomeButton from '../../../../components/Buttons/HomeButton';

export default function LeftHomePage() {
  const [typeEffect] = useTypewriter({
    words: ['Verse'],
    loop: true,
    typeSpeed: 120,
    deleteSpeed: 80,
  });

  return (
    <div className="flex flex-1 flex-col gap-5  justify-center">
      <div className="px-4 md:px-0">
        <h1 className="text-4xl md:text-5xl md:leading-snug text-center md:text-left leading-snug font-medium  ">
          Unlock Your Gaming and Tech Journey with
          <br className="hidden lg:block" /> Teck
          <span className="text-text">{typeEffect}</span>
          <Cursor />
        </h1>
      </div>
      <div className="flex justify-center md:justify-normal">
        <HomeButton title={'Join now'} />
      </div>
    </div>
  );
}
