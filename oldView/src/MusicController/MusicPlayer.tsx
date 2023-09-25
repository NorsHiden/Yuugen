import {
  BiShuffle,
  BiSkipNext,
  BiSkipPrevious,
  BiSolidVolumeFull,
  BiSolidVolumeLow,
  BiSolidVolumeMute,
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
import { useEffect, useState } from "react";
import { VscLoading } from "react-icons/vsc";

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
  const [playLoading, setPlayLoading] = useState<boolean>(false);
  const [seekCurrent, setSeekCurrent] = useState<string>("0");
  const [seekMouseDown, setSeekMouseDown] = useState<boolean>(false);
  const [volumeMouseDown, setVolumeMouseDown] = useState<boolean>(false);
  const [volumeCurrent, setVolumeCurrent] = useState<string>("0");
  const [volumeLoading, setVolumeLoading] = useState<boolean>(false);

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
    if (!currentGuild || playLoading) return;
    axios.post(`/api/voice/${action}?guildId=${currentGuild.id}`).then(() => {
      setPlayLoading(false);
    });
    setPlayLoading(true);
  };

  const changeSeek = (value: string) => {
    if (!currentGuild || playLoading) return;
    axios
      .post(`/api/voice/seek?guildId=${currentGuild.id}&value=${value}`)
      .then(() => {
        setPlayLoading(false);
      });
    setPlayLoading(true);
    setSeekMouseDown(false);
  };

  const changeVolume = (value: string) => {
    if (!currentGuild) return;
    axios
      .post(`/api/voice/volume?guildId=${currentGuild.id}&value=${value}`)
      .then(() => {
        setVolumeLoading(false);
      });
    setVolumeLoading(true);
    setVolumeMouseDown(false);
  };

  const progressBarStyle = () => {
    if (currentIndex > -1)
      return `${(+seekCurrent / queue[currentIndex].duration) * 100}%`;
    else return "0%";
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
    if (!currentGuild) return;
    if (!playLoading && !seekMouseDown)
      setSeekCurrent(currentIndex > -1 ? `${seek}` : "0");
    if (!volumeLoading && !volumeMouseDown) setVolumeCurrent(`${volume}`);
  }, [seek, volume]);

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
          <BiSkipPrevious
            className="mr-2 text-2xl cursor-pointer hover:text-white"
            style={{
              opacity: playLoading ? "0.5" : "1",
            }}
          />
        </div>
        {currentState == "playing" ? (
          <div onClick={() => audioButton("pause")}>
            {playLoading ? (
              <VscLoading className="mr-2 text-2xl cursor-pointer hover:text-white animate-spin" />
            ) : (
              <FaPauseCircle className="mr-2 text-2xl cursor-pointer hover:text-white" />
            )}
          </div>
        ) : (
          <div onClick={() => audioButton("play")}>
            {playLoading ? (
              <VscLoading className="mr-2 text-2xl cursor-pointer hover:text-white animate-spin" />
            ) : (
              <BsFillPlayCircleFill className="mr-2 text-2xl cursor-pointer hover:text-white" />
            )}
          </div>
        )}
        <div onClick={() => audioButton("skip")}>
          <BiSkipNext
            className="mr-2 text-2xl cursor-pointer hover:text-white"
            style={{
              opacity: playLoading ? "0.5" : "1",
            }}
          />
        </div>
      </div>
      <div
        className="group flex relative items-center h-2 w-full rounded-xl"
        style={{
          opacity: playLoading ? "0.5" : "1",
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
          className="mr-2 w-full h-2 cursor-pointer transition-all duration-200 bg-[#003344] rounded-lg group-hover:h-4"
        />
        <div
          className={`flex absolute left-auto pointer-events-none h-2 min-w-[0.3rem] bg-[#d4a88b] rounded-lg transition-all group-hover:h-4`}
          style={{
            width: progressBarStyle(),
            transitionDuration: seekMouseDown ? "0s" : "0.2s",
          }}
        ></div>
      </div>
      <div className="text-xs font-bold mr-4 ml-2">
        {currentIndex > -1 ? `${fromSecondsToMinutes(+seekCurrent)}` : ""}
      </div>
      <div className="flex flex-row items-center ml-auto">
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
            className="mr-2 w-24 h-2 cursor-pointer bg-[#003344] rounded-lg group-hover:h-4 transition-all"
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
