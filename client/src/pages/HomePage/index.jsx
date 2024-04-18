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
    </div>
  );
}
