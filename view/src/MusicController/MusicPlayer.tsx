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
      return {
        width: `${(seek / 1000 / queue[currentIndex].duration) * 100}%`,
      };
    else
      return {
        width: "0%",
      };
  };

  const fromSecondsToMinutes = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const extraSeconds = Math.floor(seconds % 60);
    const sminutes = minutes < 10 ? "0" + minutes : minutes;
    const sextraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;
    return `${sminutes}:${sextraSeconds}`;
  };

  return (
    <div className="music-player" style={hideOrDisplay()}>
      <div
        className="music-player-song-pic"
        style={{
          backgroundImage: `url(${
            currentIndex > -1 ? queue[currentIndex].thumbnail : ""
          })`,
        }}
      />
      <div>
        <div className="music-player-song-title">
          {currentIndex > -1 ? queue[currentIndex].title : "Nothing is Playing"}
        </div>
        <div className="music-player-song-artist">
          {currentIndex > -1 ? queue[currentIndex].author : ""}
        </div>
      </div>
      <div className="music-player-controls">
        <div onClick={() => audioButton("previous")}>
          <BiSkipPrevious className="music-player-controls-icon" />
        </div>
        {currentState == "playing" ? (
          <div onClick={() => audioButton("pause")}>
            <FaPauseCircle className="music-player-controls-icon" />
          </div>
        ) : (
          <div onClick={() => audioButton("play")}>
            <BsFillPlayCircleFill className="music-player-controls-icon" />
          </div>
        )}
        <div onClick={() => audioButton("skip")}>
          <BiSkipNext className="music-player-controls-icon" />
        </div>
      </div>
      <div className="music-player-song-range-progress-bar">
        <input
          type="range"
          min="0"
          max={currentIndex > -1 ? queue[currentIndex].duration : "0"}
          step="1"
          value={currentIndex > -1 ? seek / 1000 : "0"}
          onChange={(e) => changeSeek(e.target.value)}
          className="music-player-song-range-bar"
        />
        <div
          className="music-player-song-progress"
          style={progressBarStyle()}
        ></div>
      </div>
      <div className="music-player-song-time">
        {currentIndex > -1 ? `${fromSecondsToMinutes(seek / 1000)}` : ""}
      </div>
      <div className="music-player-song-volume">
        <BiSolidVolumeFull className="music-player-song-volume-icon" />
        <div className="music-player-song-range-progress-bar">
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={volume}
            onChange={(e) => changeVolume(e.target.value)}
            className="music-player-song-volume-bar"
          />
          <div
            className="music-player-song-progress"
            style={{ width: `${volume}%` }}
          ></div>
        </div>
      </div>
      <div onClick={() => audioButton("shuffle")}>
        <BiShuffle className="music-player-song-shuffle" />
      </div>
      <div onClick={() => audioButton("loop")}>
        {loopState == "none" ? (
          <PiRepeatFill className="music-player-song-loop" />
        ) : loopState == "song" ? (
          <PiRepeatOnceDuotone className="music-player-song-loop" />
        ) : (
          <PiRepeatDuotone className="music-player-song-loop" />
        )}
      </div>
    </div>
  );
};
