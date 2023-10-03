import {
  BiShuffle,
  BiSkipNext,
  BiSkipPrevious,
  BiSolidVolumeFull,
  BiSolidVolumeLow,
  BiSolidVolumeMute,
} from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios";
import { VscLoading } from "react-icons/vsc";
import { FaPauseCircle } from "react-icons/fa";
import { BsFillPlayCircleFill } from "react-icons/bs";
import {
  PiRepeatDuotone,
  PiRepeatFill,
  PiRepeatOnceDuotone,
} from "react-icons/pi";

export const MusicController = ({
  queue,
  currentIndex,
  currentState,
  loopState,
  volume,
  seek,
}: any) => {
  const [playLoading, setPlayLoading] = useState<boolean>(false);
  const [seekCurrent, setSeekCurrent] = useState<string>("0");
  const [seekMouseDown, setSeekMouseDown] = useState<boolean>(false);
  const [volumeMouseDown, setVolumeMouseDown] = useState<boolean>(false);
  const [volumeCurrent, setVolumeCurrent] = useState<string>("0");
  const [volumeLoading, setVolumeLoading] = useState<boolean>(false);

  const audioButton = (action: string) => {
    if (playLoading) return;
    axios
      .post(`/api/voice/${action}?guildId=${window.location.pathname.slice(1)}`)
      .then(() => {
        setPlayLoading(false);
      });
    setPlayLoading(true);
  };

  const changeSeek = (value: string) => {
    if (playLoading) return;
    axios
      .post(
        `/api/voice/seek?guildId=${window.location.pathname.slice(
          1
        )}&value=${value}`
      )
      .then(() => {
        setPlayLoading(false);
      });
    setPlayLoading(true);
    setSeekMouseDown(false);
  };

  const progressBarStyle = () => {
    if (currentIndex > -1)
      return `${(+seekCurrent / queue[currentIndex].duration) * 100}%`;
    else return "0%";
  };

  const changeVolume = (value: string) => {
    if (volumeLoading) return;
    axios
      .post(
        `/api/voice/volume?guildId=${window.location.pathname.slice(
          1
        )}&value=${value}`
      )
      .then(() => {
        setVolumeLoading(false);
      });
    setVolumeLoading(true);
    setVolumeMouseDown(false);
  };

  const fromSecondsToMinutes = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const extraSeconds = Math.floor(seconds % 60);
    const sminutes = minutes < 10 ? "0" + minutes : minutes;
    const sextraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;
    return `${sminutes}:${sextraSeconds}`;
  };

  const VolumeIcon = ({ className }: { className: string }) => {
    if (+volumeCurrent == 0) return <BiSolidVolumeMute className={className} />;
    else if (+volumeCurrent < 50)
      return <BiSolidVolumeLow className={className} />;
    else return <BiSolidVolumeFull className={className} />;
  };

  useEffect(() => {
    if (playLoading) return;
    if (!seekMouseDown) setSeekCurrent(currentIndex > -1 ? `${seek}` : "0");
    if (!volumeLoading && !volumeMouseDown) setVolumeCurrent(`${volume}`);
  }, [seek, volume]);

  return (
    <div className="flex items-center h-20 bg-yuugenColorSecond rounded-t-xl text-yuugenColorFirst gap-4">
      {currentIndex > -1 ? (
        <img
          className="h-16 min-w-[4rem] object-cover object-center rounded-tl-xl"
          src={queue[currentIndex].thumbnail}
        />
      ) : (
        <div className="min-w-[4rem]" />
      )}
      <div className="w-[52rem] overflow-hidden">
        <p className="font-gilroyExtraBold text-lg truncate">
          {currentIndex > -1 ? queue[currentIndex].title : ""}
        </p>
        <p className="text-xs truncate">
          {currentIndex > -1 ? queue[currentIndex].author : ""}
        </p>
      </div>
      <div className="flex items-center text-3xl gap-2">
        <div
          className={`text-xl cursor-pointer transition-all ${
            playLoading || currentIndex < 0
              ? "opacity-40"
              : "hover:text-white hover:scale-110"
          }`}
          onClick={() => audioButton("shuffle")}
        >
          <BiShuffle />
        </div>
        <div
          className={`cursor-pointer ${
            playLoading || currentIndex < 0
              ? "opacity-40"
              : "hover:text-white hover:scale-110"
          }`}
          onClick={() => audioButton("previous")}
        >
          <BiSkipPrevious />
        </div>
        {currentState == "playing" ? (
          <div
            className={`cursor-pointer ${
              playLoading || currentIndex < 0
                ? "opacity-40"
                : "hover:text-white hover:scale-110 transition-all"
            }`}
            onClick={() => audioButton("pause")}
          >
            {playLoading ? (
              <VscLoading className="animate-spin" />
            ) : (
              <FaPauseCircle />
            )}
          </div>
        ) : (
          <div
            className={`cursor-pointer ${
              playLoading || currentIndex < 0
                ? "opacity-40"
                : "hover:text-white hover:scale-110 transition-all"
            }`}
            onClick={() => audioButton("play")}
          >
            {playLoading ? (
              <VscLoading className="animate-spin" />
            ) : (
              <BsFillPlayCircleFill />
            )}
          </div>
        )}
        <div
          className={`cursor-pointer ${
            playLoading || currentIndex < 0
              ? "opacity-40"
              : "hover:text-white hover:scale-110 transition-all"
          }`}
          onClick={() => audioButton("skip")}
        >
          <BiSkipNext />
        </div>
        <div
          className={`text-2xl cursor-pointer ${
            playLoading || currentIndex < 0
              ? "opacity-40"
              : "hover:text-white hover:scale-110"
          }`}
          onClick={() => audioButton("loop")}
        >
          {loopState == "none" ? (
            <PiRepeatFill />
          ) : loopState == "song" ? (
            <PiRepeatOnceDuotone />
          ) : (
            <PiRepeatDuotone />
          )}
        </div>
      </div>
      <p className="text-xs font-bold min-w-[2rem]">
        {currentIndex > -1 ? `${fromSecondsToMinutes(+seekCurrent)}` : "_:_"}
      </p>
      <div
        className="group flex relative items-center h-2 w-full rounded-xl"
        style={{
          opacity: playLoading || currentIndex < 0 ? "0.5" : "1",
        }}
      >
        <input
          type="range"
          min="0"
          max={currentIndex > -1 ? queue[currentIndex].duration : "0"}
          value={seekCurrent}
          onChange={(e) => playLoading || setSeekCurrent(e.target.value)}
          onMouseDown={() => setSeekMouseDown(true)}
          onMouseUp={() => changeSeek(seekCurrent)}
          className="w-full h-2 cursor-pointer transition-all duration-200 bg-[#003344] rounded-lg group-hover:h-4"
        />
        <div
          className={`flex absolute left-auto pointer-events-none h-2 min-w-[0.3rem] bg-[#d4a88b] rounded-lg transition-all group-hover:h-4`}
          style={{
            width: progressBarStyle(),
            transitionDuration: seekMouseDown ? "0s" : "0.2s",
          }}
        ></div>
      </div>
      <p className="text-xs font-bold min-w-[1rem]">
        {currentIndex > -1 ? `${queue[currentIndex].raw_duration}` : "_:_"}
      </p>
      <div className="flex flex-row items-center ml-auto mr-8">
        <div onClick={() => changeVolume(volumeCurrent == "0" ? "50" : "0")}>
          {volumeLoading ? (
            <VscLoading className="mr-2 text-lg cursor-pointer ml-auto hover:text-white animate-spin" />
          ) : (
            <VolumeIcon className="mr-2 text-lg cursor-pointer ml-auto hover:text-white" />
          )}
        </div>
        <div
          className="group flex relative items-center w-24 h-2 rounded-xl"
          style={{
            opacity: volumeLoading ? "0.5" : "1",
          }}
        >
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={volumeCurrent}
            onChange={(e) => volumeLoading || setVolumeCurrent(e.target.value)}
            onMouseDown={() => setVolumeMouseDown(true)}
            onMouseUp={() => changeVolume(volumeCurrent)}
            className="w-24 h-2 cursor-pointer bg-[#003344] rounded-lg group-hover:h-4 transition-all"
          />
          <div
            className={`flex absolute left-auto pointer-events-none h-2 bg-[#d4a88b] rounded-lg group-hover:h-4 transition-all`}
            style={{
              width: `${volumeCurrent}%`,
              transitionDuration: volumeMouseDown ? "0s" : "0.2s",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
