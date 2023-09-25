import {
  BiDotsVerticalRounded,
  BiSolidUserCircle,
  BiTimeFive,
} from "react-icons/bi";
import { AiFillYoutube } from "react-icons/ai";
// import { PiWaveform } from "react-icons/pi";

const Song = () => {
  return (
    <div className="flex items-center w-[calc(100%-0.5rem)] h-20 rounded-xl gap-3 opacity-80">
      <div className="ml-4 text-2xl font-bold">1{/* <PiWaveform /> */}</div>
      <img
        className="w-14 h-14 object-cover rounded-xl"
        src="https://i1.sndcdn.com/artworks-M8Wi9lt9SqthzRKr-glE10g-t500x500.jpg"
        alt="Song Cover"
      />
      <div className="flex flex-col w-1/2 justify-center overflow-hidden">
        <p className="text-xs font-bold truncate">夜に駆ける</p>
        <p className="text-xs font-light truncate opacity-70">YOASOBI</p>
      </div>
      <div className="flex flex-row w-full gap-3 md:text-xl text-xs">
        <div className="flex flex-row md:w-full items-center gap-2">
          <BiTimeFive />
          <p className="md:text-xs font-light truncate">04:21</p>
        </div>
        <div className="flex flex-row md:w-full items-center max-md:hidden">
          <AiFillYoutube />
        </div>
        <div className="flex flex-row md:w-full items-center gap-2">
          <BiSolidUserCircle />
          <p className="md:text-xs font-light truncate">Starlight</p>
        </div>
        <div className="text-xl ml-auto mr-4">
          <BiDotsVerticalRounded />
        </div>
      </div>
    </div>
  );
};

export const Queue = () => {
  return (
    <div className="flex flex-col mt-4">
      <Song />
      {/* <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song /> */}
    </div>
  );
};
