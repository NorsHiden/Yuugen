import { BiLogoYoutube, BiTime, BiTrash, BiUserCircle } from "react-icons/bi";
import { BsFillPlayCircleFill, BsFillStopCircleFill } from "react-icons/bs";
import { PiWaveformBold } from "react-icons/pi";
import { AiOutlineClear } from "react-icons/ai";
import { MdDragHandle } from "react-icons/md";
import { Guild, Song } from "../interfaces";
import axios from "axios";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface QueueItemProps {
  currentGuild: Guild | null;
  song: Song;
  index: number;
  currentIndex: number;
  currentState: "playing" | "paused" | "idle";
  provided: any;
}

const QueueItem = ({
  currentGuild,
  song,
  index,
  currentIndex,
  currentState,
  provided,
}: QueueItemProps) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const removeFromQueue = () => {
    axios.delete(`/api/voice/queue?guildId=${currentGuild?.id}&index=${index}`);
  };

  const selectSong = () => {
    if (index === currentIndex) {
      if (currentState == "playing")
        axios.post(`/api/voice/stop?guildId=${currentGuild?.id}`);
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
              <BsFillStopCircleFill size="24" />
            ) : (
              <BsFillPlayCircleFill size="24" />
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
            <BsFillPlayCircleFill size="24" />
          </>
        );
      else
        return (
          <>
            <PiWaveformBold size="24" />
          </>
        );
    } else {
      return <>{hovered ? <BsFillPlayCircleFill size="24" /> : index + 1}</>;
    }
  };

  return (
    <div
      className={
        index === currentIndex
          ? "flex flex-row items-center w-full min-h-[4rem] rounded-xl pl-2 duration-200 bg-[#003344] text-yuugenColorFirst"
          : "flex flex-row items-center w-full min-h-[4rem] rounded-xl pl-2 duration-200 opacity-80 hover:opacity-100 hover:bg-gradient-to-r hover:from-yuugenColorSecond to-transparent hover:scale-[101%]"
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="flex items-center justify-center w-10 h-10 mr-2 font-bold rounded-2xl cursor-pointer duration-300 hover:bg-[#002330] hover:text-yuugenColorFirst hover:rounded-full"
        onClick={selectSong}
      >
        {PlaySongHover()}
      </div>
      <img
        className="h-12 w-12 object-cover rounded-xl bg-[#a4a4a4]"
        src={song.thumbnail}
      />
      <div>
        <div className="ml-4 text-xs font-semibold w-60 overflow-hidden whitespace-nowrap text-ellipsis">
          {" "}
          {song.title}
        </div>
        <div className="ml-4 text-[10px] font-light w-60 overflow-hidden whitespace-nowrap text-ellipsis">
          {song.author}
        </div>
      </div>
      <div className="flex flex-row items-center ml-4 text-[10px] font-light">
        <BiTime size="20" className="mr-2" />
        <div className="w-20 text-xs">{song.raw_duration}</div>
      </div>
      <div className="flex flex-row items-center ml-8">
        <BiLogoYoutube size="20" />
      </div>
      <div className="flex flex-row items-center text-xs ml-20">
        <BiUserCircle size="20" />
        <div className="ml-2 text-[10px] font-light max-w-xs overflow-hidden whitespace-nowrap text-ellipsis">
          {song.requester_name}
        </div>
      </div>
      <BiTrash
        size="20"
        className="flex flex-row items-center ml-auto cursor-pointer hover:text-white"
        onClick={removeFromQueue}
      />
      <div {...provided.dragHandleProps}>
        <MdDragHandle
          size="20"
          className="flex flex-row items-center ml-8 mr-4 cursor-grab hover:text-white active:cursor-grabbing"
        />
      </div>
    </div>
  );
};

interface QueueProps {
  currentGuild: Guild | null;
  queue: Song[];
  currentIndex: number;
  currentState: "playing" | "paused" | "idle";
}

const LoadedQueue = ({
  currentGuild,
  queue,
  currentIndex,
  currentState,
}: QueueProps) => {
  return (
    <DragDropContext
      onDragEnd={(result: any) => {
        console.log(result);
        if (!result.destination) return;
        if (result.destination.index === result.source.index) return;
        axios.post(
          `/api/voice/move?guildId=${currentGuild?.id}&from=${result.source.index}&to=${result.destination.index}`
        );
      }}
    >
      <Droppable droppableId="ROOT" type="group">
        {(provided: any) => (
          <div className="flex flex-col w-[95%] pt-6">
            <div
              className="flex flex-col w-full"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {queue.length > 0 ? (
                queue.map((song, index) => (
                  <Draggable key={index} draggableId={`${index}`} index={index}>
                    {(provided: any) => (
                      <div {...provided.draggableProps} ref={provided.innerRef}>
                        <QueueItem
                          key={index}
                          currentGuild={currentGuild}
                          song={song}
                          index={index}
                          currentIndex={currentIndex}
                          currentState={currentState}
                          provided={provided}
                        />
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                <div className="flex justify-center font-bold text-xl text-yuugenColorSecond">
                  Empty
                </div>
              )}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const QueueSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4].map(() => (
        <div className="w-full animate-pulse">
          <div className="flex flex-row items-center w-full min-h-[4rem] rounded-xl pl-2 opacity-30">
            <div className="flex items-center justify-center w-10 h-10 mr-2 font-bold rounded-2xl bg-yuugenColorSecond"></div>
            <div className="h-12 w-12 object-cover rounded-xl bg-yuugenColorSecond" />
            <div className="flex flex-col gap-2">
              <div className="ml-4 text-xs font-semibold w-60 h-4 rounded-full bg-yuugenColorSecond"></div>
              <div className="ml-4 text-[10px] font-light w-20 h-2 rounded-full bg-yuugenColorSecond"></div>
            </div>
            <div className="flex flex-row items-center ml-4 text-[10px] font-light">
              <BiTime size="20" className="mr-2 text-yuugenColorSecond" />
              <div className="w-20 text-xs bg-yuugenColorSecond"></div>
            </div>
            <div className="flex flex-row items-center ml-8 text-yuugenColorSecond">
              <BiLogoYoutube size="20" />
            </div>
            <div className="flex flex-row items-center text-xs ml-20 text-yuugenColorSecond">
              <BiUserCircle size="20" />
              <div className="ml-2 text-[10px] font-light rounded-full w-16 h-2 bg-yuugenColorSecond"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export const Queue = ({
  currentGuild,
  queue,
  currentIndex,
  currentState,
}: QueueProps) => {
  const clearQueue = () => {
    axios.delete(`/api/voice/clear?guildId=${currentGuild?.id}`);
  };

  return (
    <div className="flex flex-col items-center w-full pt-2 font-sans text-[#a4a4a4]">
      <div className="flex flex-row items-center mt-4 w-full text-2xl text-white font-extrabold ">
        <div>Queue</div>
        <div
          className="flex items-center justify-center rounded-full ml-auto mr-2 h-8 w-8 text-yuugenColorSecond cursor-pointer transition-all duration-200 hover:bg-yuugenColorSecond hover:text-yuugenColorFirst"
          onClick={clearQueue}
        >
          <AiOutlineClear />
        </div>
      </div>
      {currentGuild ? (
        <LoadedQueue
          currentGuild={currentGuild}
          queue={queue}
          currentIndex={currentIndex}
          currentState={currentState}
        />
      ) : (
        <QueueSkeleton />
      )}
    </div>
  );
};
