import { MusicPlayer } from "./MusicPlayer";
import { PlayingNow } from "./PlayingNow";
import { Queue } from "./Queue";
import { Search } from "./Search";
import { VoiceChannels } from "./VoiceChannels";
import "./mc-styles.css";

export const MusicController = () => {
  return (
    <div className="music-controller-container">
      <div className="music-controller">
        <div className="music-controller-horizontal-split">
          <div className="music-controller-vertical-split">
            <PlayingNow />
            <VoiceChannels />
          </div>
          <Queue />
        </div>
        <Search />
      </div>
      <MusicPlayer />
    </div>
  );
};
