import React, { useEffect, useState } from 'react';
import PostItem from '../../components/Posts';
import CursorAnimation from './components/CursorAnimation';
import LeftHomePage from './components/LeftHomePage';
import RightHomePage from './components/RightHomePage';
import Statistics from './components/Statistics';
import Loader from '../../components/Loader';

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
      <CursorAnimation />
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
          <div className="my-20 flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-y-8 md:gap-x-16">
              <PostItem />
              <PostItem />
              <PostItem />
              <PostItem />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
