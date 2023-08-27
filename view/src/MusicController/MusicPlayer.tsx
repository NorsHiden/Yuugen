import {
  BiShuffle,
  BiSkipNext,
  BiSkipPrevious,
  BiSolidVolumeFull,
} from "react-icons/bi";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { FaPauseCircle } from "react-icons/fa";
import { Guild, Song } from "../interfaces";
import axios from "axios";
import {
  PiRepeatDuotone,
  PiRepeatFill,
  PiRepeatOnceDuotone,
} from "react-icons/pi";

interface MusicPlayerProps {
  currentGuild: Guild | null;
  queue: Song[];
  currentIndex: number;
  currentState: string;
  loopState: "none" | "queue" | "song";
  volume: number;
  seek: number;
}

export const MusicPlayer = ({
  currentGuild,
  queue,
  currentIndex,
  currentState,
  loopState,
  volume,
  seek,
}: MusicPlayerProps) => {
  const hideOrDisplay = () => {
    if (currentIndex > -1)
      return {
        bottom: "2rem",
        opacity: "100%",
        visibility: "visible",
      } as React.CSSProperties;
    else
      return {
        bottom: "0rem",
        opacity: "0%",
        visibility: "hidden",
      } as React.CSSProperties;
  };

  const audioButton = (action: string) => {
    if (!currentGuild) return;
    axios.post(`/api/voice/${action}?guildId=${currentGuild.id}`);
  };

  const changeSeek = (value: string) => {
    if (!currentGuild) return;
    axios.post(`/api/voice/seek?guildId=${currentGuild.id}&value=${value}`);
  };

  const changeVolume = (value: string) => {
    if (!currentGuild) return;
    axios.post(`/api/voice/volume?guildId=${currentGuild.id}&value=${value}`);
  };

  const progressBarStyle = () => {
    if (currentIndex > -1)
      return `${(seek / 1000 / queue[currentIndex].duration) * 100}%`;
    else return "0%";
  };

  const fromSecondsToMinutes = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const extraSeconds = Math.floor(seconds % 60);
    const sminutes = minutes < 10 ? "0" + minutes : minutes;
    const sextraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;
    return `${sminutes}:${sextraSeconds}`;
  };

  return (
    <div
      className="flex flex-row items-center absolute z-1 h-[4.5rem] right-4 w-[calc(100%-5rem)] bg-[#001a23] text-yuugenColorFirst rounded-xl transition-all duration-200"
      style={hideOrDisplay()}
    >
      <div
        className="min-w-[4.5rem] h-[4.5rem] bg-cover bg-center rounded-l-xl"
        style={{
          backgroundImage: `url(${
            currentIndex > -1 ? queue[currentIndex].thumbnail : ""
          })`,
        }}
      />
      <div>
        <div className="text-sm font-bold w-64 overflow-hidden whitespace-nowrap text-ellipsis ml-4">
          {currentIndex > -1 ? queue[currentIndex].title : "Nothing is Playing"}
        </div>
        <div className="text-xs max-w-[16rem] overflow-hidden whitespace-nowrap text-ellipsis ml-4">
          {currentIndex > -1 ? queue[currentIndex].author : ""}
        </div>
      </div>
      <div className="flex flex-row items-center mr-4">
        <div onClick={() => audioButton("previous")}>
          <BiSkipPrevious className="mr-2 text-2xl cursor-pointer hover:text-white" />
        </div>
        {currentState == "playing" ? (
          <div onClick={() => audioButton("pause")}>
            <FaPauseCircle className="mr-2 text-2xl cursor-pointer hover:text-white" />
          </div>
        ) : (
          <div onClick={() => audioButton("play")}>
            <BsFillPlayCircleFill className="mr-2 text-2xl cursor-pointer hover:text-white" />
          </div>
        )}
        <div onClick={() => audioButton("skip")}>
          <BiSkipNext className="mr-2 text-2xl cursor-pointer hover:text-white" />
        </div>
      </div>
      <div className="group flex relative items-center h-2 w-full rounded-xl">
        <input
          type="range"
          min="0"
          max={currentIndex > -1 ? queue[currentIndex].duration : "0"}
          value={currentIndex > -1 ? seek / 1000 : "0"}
          onChange={(e) => changeSeek(e.target.value)}
          className="mr-2 w-full h-2 cursor-pointer transition-all duration-200 bg-[#003344] rounded-lg group-hover:h-4"
        />
        <div
          className={`flex absolute left-auto pointer-events-none h-2 min-w-[0.3rem] bg-[#d4a88b] rounded-lg transition-all duration-200 group-hover:h-4`}
          style={{ width: progressBarStyle() }}
        ></div>
      </div>
      <div className="text-xs font-bold mr-4 ml-2">
        {currentIndex > -1 ? `${fromSecondsToMinutes(seek / 1000)}` : ""}
      </div>
      <div className="flex flex-row items-center ml-auto">
        <BiSolidVolumeFull className="mr-2 text-lg cursor-pointer ml-auto hover:text-white" />
        <div className="group flex relative items-center w-24 h-2 rounded-xl">
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={volume}
            onChange={(e) => changeVolume(e.target.value)}
            className="mr-2 w-24 h-2 cursor-pointer bg-[#003344] rounded-lg group-hover:h-4 transition-all duration-200"
          />
          <div
            className={`flex absolute left-auto pointer-events-none h-2 bg-[#d4a88b] rounded-lg group-hover:h-4 transition-all duration-200`}
            style={{ width: `${volume}%` }}
          ></div>
        </div>
      </div>
      <div onClick={() => audioButton("shuffle")}>
        <BiShuffle className="mr-4 ml-4 min-w-[1rem] text-2xl cursor-pointer hover:text-white" />
      </div>
      <div onClick={() => audioButton("loop")}>
        {loopState == "none" ? (
          <PiRepeatFill className="mr-4 min-w-[1rem] text-2xl cursor-pointer hover:text-white" />
        ) : loopState == "song" ? (
          <PiRepeatOnceDuotone className="mr-4 min-w-[1rem] text-2xl cursor-pointer hover:text-white" />
        ) : (
          <PiRepeatDuotone className="mr-4 min-w-[1rem] text-2xl cursor-pointer hover:text-white" />
        )}
      </div>
    </div>
  );
};
