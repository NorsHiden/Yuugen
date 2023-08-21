import {
  BiRepeat,
  BiShuffle,
  BiSkipNext,
  BiSkipPrevious,
  BiSolidVolumeFull,
} from "react-icons/bi";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { FaPauseCircle } from "react-icons/fa";
import { Guild, Song } from "../interfaces";
import axios from "axios";

interface MusicPlayerProps {
  currentGuild: Guild | null;
  queue: Song[];
  currentIndex: number;
  currentState: string;
}

export const MusicPlayer = ({
  currentGuild,
  queue,
  currentIndex,
  currentState,
}: MusicPlayerProps) => {
  const hideOrDisplay = () => {
    if (queue.length > 0)
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

  return (
    <div className="music-player" style={hideOrDisplay()}>
      <div
        className="music-player-song-pic"
        style={{
          backgroundImage: `url(${
            queue.length > 0 ? queue[currentIndex].thumbnail : ""
          })`,
        }}
      />
      <div>
        <div className="music-player-song-title">
          {queue.length > 0 ? queue[currentIndex].title : "Nothing is Playing"}
        </div>
        <div className="music-player-song-artist">
          {queue.length > 0 ? queue[currentIndex].author : ""}
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
      <input type="range" className="music-player-song-range-bar" />
      <div className="music-player-song-time">
        {queue.length > 0 ? queue[currentIndex].raw_duration : ""}
      </div>
      <div className="music-player-song-volume">
        <BiSolidVolumeFull className="music-player-song-volume-icon" />
        <input type="range" className="music-player-song-volume-bar" />
      </div>
      <BiShuffle className="music-player-song-shuffle" />
      <BiRepeat className="music-player-song-loop" />
    </div>
  );
};
