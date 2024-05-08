import React, { useEffect, useState } from 'react';
import PostItem from '../../components/Posts';
import CursorAnimation from './components/CursorAnimation';
import LeftHomePage from './components/LeftHomePage';
import RightHomePage from './components/RightHomePage';
import Statistics from './components/Statistics';
import Loader from '../../components/Loader';
import TrandingPosts from './components/TrandingPosts';
import { AiOutlineThunderbolt } from 'react-icons/ai';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="">
      {/* <CursorAnimation /> */}
      {isLoading ? (
        <div className="h-screen flex items-center justify-center -mt-20">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row mt-10 md:mt-0 md:gap-3 items-center justify-between">
            <LeftHomePage />
            <RightHomePage />
          </div>
          <Statistics />

          <div className=" mt-10">
            <div className=" flex items-center justify-between  ">
              <h1 className="text-left text-2xl flex items-center gap-1">
                <span>
                  <AiOutlineThunderbolt />
                </span>
                Tranding Posts:
              </h1>
              <button className="p-2 bg-text text-black rounded-md">
                see more
              </button>
            </div>
            <TrandingPosts />
          </div>
        </>
      )}
    </div>
  );
}
