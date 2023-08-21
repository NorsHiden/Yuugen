import { BiLogoYoutube, BiTime, BiTrash, BiUserCircle } from "react-icons/bi";
import { PiWaveformBold } from "react-icons/pi";
import { MdDragHandle } from "react-icons/md";
import { Guild, Song } from "../interfaces";
import axios from "axios";
import { useState } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";

interface QueueItemProps {
  currentGuild: Guild | null;
  song: Song;
  index: number;
  currentIndex: number;
  currentState: "playing" | "paused" | "idle";
}

const QueueItem = ({
  currentGuild,
  song,
  index,
  currentIndex,
  currentState,
}: QueueItemProps) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const removeFromQueue = () => {
    axios.delete(`/api/voice/queue?guildId=${currentGuild?.id}&index=${index}`);
  };

  const selectSong = () => {
    if (index === currentIndex) {
      if (currentState == "playing")
        axios.post(`/api/voice/pause?guildId=${currentGuild?.id}`);
      else if (currentState == "paused")
        axios.post(`/api/voice/play?guildId=${currentGuild?.id}`);
      else
        axios.post(
          `/api/voice/play-index?guildId=${currentGuild?.id}&index=${index}`
        );
    } else
      axios.post(
        `/api/voice/play-index?guildId=${currentGuild?.id}&index=${index}`
      );
  };

  const PlaySongHover = () => {
    if (index === currentIndex) {
      if (hovered)
        return (
          <>
            {currentState == "playing" ? (
              <BsFillPauseFill size="32" />
            ) : (
              <BsFillPlayFill size="32" />
            )}
          </>
        );
      else if (currentState == "playing")
        return (
          <>
            <PiWaveformBold size="24" />
          </>
        );
      else if (currentState == "paused")
        return (
          <>
            <BsFillPlayFill size="32" />
          </>
        );
      else
        return (
          <>
            <PiWaveformBold size="24" />
          </>
        );
    } else {
      return <>{hovered ? <BsFillPlayFill size="32" /> : index + 1}</>;
    }
  };

  return (
    <div
      className={
        index === currentIndex
          ? "music-queue-item-selected"
          : "music-queue-item"
      }
    >
      <div
        className="music-queue-item-num"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={selectSong}
      >
        {PlaySongHover()}
      </div>
      <img className="music-queue-item-pic" src={song.thumbnail} />
      <div>
        <div className="music-queue-item-title"> {song.title}</div>
        <div className="music-queue-item-artist">{song.author}</div>
      </div>
      <div className="music-queue-item-duration">
        <BiTime size="24" className="music-queue-item-duration-icon" />
        <div className="music-queue-item-duration-time">
          {song.raw_duration}
        </div>
      </div>
      <div className="music-queue-item-source">
        <BiLogoYoutube size="24" />
      </div>
      <div className="music-queue-item-requester">
        <BiUserCircle size="24" />
        <div className="music-queue-item-requester-name">
          {song.requester_name}
        </div>
      </div>
      <BiTrash
        size="24"
        className="music-queue-item-remove"
        onClick={removeFromQueue}
      />
      <MdDragHandle size="24" className="music-queue-item-drag" />
    </div>
  );
};

interface QueueProps {
  currentGuild: Guild | null;
  queue: Song[];
  currentIndex: number;
  currentState: "playing" | "paused" | "idle";
}

export const Queue = ({
  currentGuild,
  queue,
  currentIndex,
  currentState,
}: QueueProps) => {
  return (
    <div className="music-queue">
      <div className="music-header">Queue</div>
      <div className="music-queue-list">
        {queue.map((song, index) => (
          <QueueItem
            key={index}
            currentGuild={currentGuild}
            song={song}
            index={index}
            currentIndex={currentIndex}
            currentState={currentState}
          />
        ))}
      </div>
    </div>
  );
};
