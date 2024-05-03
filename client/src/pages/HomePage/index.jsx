import PostItem from '../../components/Posts';
import CursorAnimation from './components/CursorAnimation';
import LeftHomePage from './components/LeftHomePage';
import RightHomePage from './components/RightHomePage';
import Statistics from './components/Statistics';

export default function HomePage() {
  return (
    <div className="">
      <CursorAnimation />
      <div className="flex flex-col md:flex-row mt-10 md:mt-0 md:gap-3 items-center justify-between">
        <LeftHomePage />
        <RightHomePage />
      </div>
      <Statistics />
      <div className="my-20 flex justify-center">
        {/* <div className="my-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-y-8 md:gap-x-16">
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
        </div> */}
      </div>
    </div>
  );
}
