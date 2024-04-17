import React, { useRef, useEffect } from 'react';
import HomeButton from '../../components/Buttons/HomeButton';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
// import homeImage from '../../assets/images/Online-tech-talks-unscreen.png';
// import homeImage2 from '../../assets/images/Globalization-cuate-2.png';

export default function HomePage() {
  const [typeEffect] = useTypewriter({
    words: ['Verse'],
    loop: true,
    typeSpeed: 120,
    deleteSpeed: 80,
  });

  const cursorDotRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorDotRef.current.style.top = e.clientY + 'px';
      cursorDotRef.current.style.left = e.clientX + 'px';
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="homeSection">
      <div ref={cursorDotRef} className="md:cursor-dot"></div>
      <div className=" flex flex-col md:flex-row mt-16 gap-3 items-center justify-between">
        <div className="flex flex-1 flex-col gap-5">
          <div className="px-2">
            <h1 className="text-4xl md:text-5xl md:leading-snug text-center md:text-left leading-snug font-medium  ">
              Unlock Your Gaming and Tech Journey with
              <br className="hidden md:block" /> Teck
              <span className="text-text">{typeEffect}</span>
              <Cursor />
            </h1>
          </div>
          <div className="flex justify-center md:justify-normal">
            <HomeButton title={'Join now'} />
          </div>
        </div>
        <div className="relative flex flex-1 items-center justify-center">
          {/* <video src={homeImage}></video> */}
        </div>
      </div>
    </div>
  );
}
