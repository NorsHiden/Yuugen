import {
  BiRepeat,
  BiShuffle,
  BiSkipNext,
  BiSkipPrevious,
  BiSolidVolumeFull,
} from "react-icons/bi";
import { BsFillPlayCircleFill } from "react-icons/bs";

export const MusicPlayer = () => {
  return (
    <div className="music-player">
      <div className="music-player-song-pic"></div>
      <div>
        <div className="music-player-song-title">
          2023年 最新】YOASOBI メドレー 全曲 アイドル 最新
        </div>
        <div className="music-player-song-artist">Yoasobi</div>
      </div>
      <div className="music-player-controls">
        <BiSkipPrevious className="music-player-controls-icon" />
        <BsFillPlayCircleFill className="music-player-controls-icon" />
        <BiSkipNext className="music-player-controls-icon" />
      </div>
      <input type="range" className="music-player-song-range-bar" />
      <div className="music-player-song-time">0:00</div>
      <div className="music-player-song-volume">
        <BiSolidVolumeFull className="music-player-song-volume-icon" />
        <input type="range" className="music-player-song-volume-bar" />
      </div>
      <BiShuffle className="music-player-song-shuffle" />
      <BiRepeat className="music-player-song-loop" />
    </div>
  );
};
