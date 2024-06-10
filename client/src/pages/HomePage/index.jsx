import React, { useEffect, useState } from 'react';
import LeftHomePage from './components/LeftHomePage';
import RightHomePage from './components/RightHomePage';
import Statistics from './components/Statistics';
import Loader from '../../components/Loader';
import TrandingPosts from './components/TrandingPosts';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { BsHandThumbsUp } from 'react-icons/bs';
import MostLikedPosts from './components/MostLikedPosts';
import RecentPosts from './components/RecentPosts';
import { LuCalendarClock, LuMessagesSquare } from 'react-icons/lu';
import Faq from './components/FAQ';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'TechVerse - Home';

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
            <div className=" flex items-center   ">
              <h1 className="text-left text-2xl flex items-center gap-1">
                <span>
                  <AiOutlineThunderbolt />
                </span>
                Tranding posts:
              </h1>
            </div>
            <TrandingPosts />
          </div>
          <div className=" mt-10">
            <div className=" flex items-center   ">
              <h1 className="text-left text-2xl flex items-center gap-2">
                <span>
                  <BsHandThumbsUp className="text-xl" />
                </span>
                Most liked:
              </h1>
            </div>
            <MostLikedPosts />
          </div>
          <div className=" mt-10">
            <div className=" flex items-center   ">
              <h1 className="text-left text-2xl flex items-center gap-2">
                <span>
                  <LuCalendarClock className="text-xl" />
                </span>
                Recent posts:
              </h1>
            </div>
            <RecentPosts />
          </div>
          <div className=" mb-10 mt-20">
            <div className=" flex items-center justify-center mb-5 ">
              <h1 className="text-center text-3xl flex items-center gap-2">
                <span>
                  <LuMessagesSquare className="text-xl" />
                </span>
                FAQ
              </h1>
            </div>
            <Faq />
          </div>
        </>
      )}
    </div>
  );
}
