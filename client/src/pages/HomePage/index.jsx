
import CursorAnimation from './components/CursorAnimation';
import LeftHomePage from './components/CursorAnimation/LeftHomePage';
import RightHomePage from './components/RightHomePage';

export default function HomePage() {

  

  return (
    <div className="">
      <CursorAnimation/>
      <div className=" flex flex-col md:flex-row mt-10 gap-3 items-center justify-between">
        <LeftHomePage />
        <RightHomePage/>
      </div>
    </div>
  );
}
