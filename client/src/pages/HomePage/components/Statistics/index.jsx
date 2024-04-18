import React from 'react';
import { IoPerson } from 'react-icons/io5';
import { BsFilePost } from 'react-icons/bs';
import { RiHashtag } from 'react-icons/ri';

import CountUp from 'react-countup';

export default function Statistics() {
  return (
    <div className="flex flex-wrap px-1 md:mt-10 mt-5 gap-10 justify-center md:justify-around items-center">
      <div className="flex flex-col">
        <div className="flex justify-center items-center flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <IoPerson className="text-3xl" />
            <h1 className="text-2xl md:text-4xl font-medium">
              <CountUp end={1038} duration={5} /> +
            </h1>
          </div>

          <p className="text-2xl font-medium">user</p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-center items-center flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <BsFilePost className="text-3xl" />
            <h1 className="text-2xl md:text-4xl font-medium">
              <CountUp end={3084} duration={5} /> +
            </h1>
          </div>

          <p className="text-2xl font-medium">posts</p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-center items-center flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <RiHashtag className="text-3xl" />
            <h1 className="text-2xl md:text-4xl font-medium">
              <CountUp end={74} duration={5} /> +
            </h1>
          </div>

          <p className="text-2xl font-medium">tag</p>
        </div>
      </div>
    </div>
  );
}
