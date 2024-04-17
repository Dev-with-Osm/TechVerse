import { IoPerson } from 'react-icons/io5';
import CursorAnimation from './components/CursorAnimation';
import LeftHomePage from './components/LeftHomePage';
import RightHomePage from './components/RightHomePage';

export default function HomePage() {
  return (
    <div className="">
      <CursorAnimation />
      <div className="flex flex-col md:flex-row mt-10 md:mt-0 md:gap-3 items-center justify-between">
        <LeftHomePage />
        <RightHomePage />
      </div>
      {/* <div className="flex justify-around items-center">
        <div className="flex flex-col">
          <h1 className="text-4xl">+ 1984</h1>
          <div className="flex justify-center items-center gap-1.5">
            <IoPerson className="text-3xl" />
            <p className="text-2xl">User</p>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-4xl">+ 1984</h1>
          <div className="flex justify-center items-center gap-1.5">
            <IoPerson className="text-3xl" />
            <p className="text-2xl">User</p>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-4xl">+ 1984</h1>
          <div className="flex justify-center items-center gap-1.5">
            <IoPerson className="text-3xl" />
            <p className="text-2xl">User</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
