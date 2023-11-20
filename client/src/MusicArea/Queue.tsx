import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FiMoreHorizontal } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { MusicUpdate } from "@/lib/types/MusicUpdate";
import { secondsToHHMMSS } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { BsStopCircleFill, BsTrash } from "react-icons/bs";
import axios from "axios";
import { useState } from "react";
import {
  AiFillPlayCircle,
  AiOutlineLoading,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

const Song = ({
  musicUpdate,
  index,
}: {
  musicUpdate: MusicUpdate;
  index: number;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRemoveLoading, setIsRemoveLoading] = useState<boolean>(false);
  const removeSong = () => {
    axios
      .delete(
        `/api/music/song?guild_id=${window.location.pathname.slice(
          1
        )}&song=${index}`
      )
      .then(() => setIsRemoveLoading(false));
    setIsRemoveLoading(true);
  };

  const songAction = () => {
    axios
      .post(
        `/api/music/${
          index == musicUpdate.currentSong && musicUpdate.state == "playing"
            ? "stop"
            : "play"
        }?guild_id=${window.location.pathname.slice(1)}&index=${index}`
      )
      .then(() => setIsLoading(false));
    setIsLoading(true);
  };
  return (
    <div
      className={`flex items-center justify-between px-4 my-2 h-16 rounded-xl ${
        index == musicUpdate.currentSong ? "bg-primary" : "hover:bg-secondary"
      }`}
    >
      <span className="w-2">{index + 1}</span>
      <div className="flex lg:w-12 w-24 justify-center" onClick={songAction}>
        <div
          className="flex group relative items-center justify-center w-12 h-12 bg-cover bg-center rounded-md cursor-pointer"
          style={{
            backgroundImage: `url(${musicUpdate.queue[index].thumbnail})`,
          }}
        >
          <div className="absolute bg-primary w-full h-full rounded-md opacity-0 group-hover:opacity-50 transition-all" />
          {isLoading ? (
            <AiOutlineLoading className="text-3xl animate-spin" />
          ) : index == musicUpdate.currentSong &&
            musicUpdate.state == "playing" ? (
            <BsStopCircleFill className="text-2xl scale-0 group-hover:scale-100 transition-all" />
          ) : (
            <AiFillPlayCircle className="text-3xl scale-0 group-hover:scale-100 transition-all" />
          )}
        </div>
      </div>
      <span className="w-52 truncate overflow-hidden">
        {musicUpdate.queue[index].title}
      </span>
      <span className="w-32 truncate overflow-hidden">
        {musicUpdate.queue[index].author}
      </span>
      <span className="hidden md:flex w-24 truncate overflow-hidden">
        {secondsToHHMMSS(musicUpdate.queue[index].duration)}
      </span>
      <span className="hidden md:flex w-24 truncate overflow-hidden">
        {musicUpdate.queue[index].requester.username}
      </span>
      {isRemoveLoading ? (
        <AiOutlineLoading3Quarters className="animate-spin mr-4" />
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-12">
              <FiMoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-24">
            <Button
              variant="destructive"
              className="gap-2"
              onClick={removeSong}
            >
              <BsTrash />
              <p>Remove</p>
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export const Queue = ({ musicUpdate }: { musicUpdate: MusicUpdate }) => {
  return (
    <ScrollArea className="h-full border px-4 rounded-xl whitespace-nowrap">
      <div className="flex sticky top-0 items-center justify-between px-4 py-2 my-2 lg:gap-8 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <span className="w-2">#</span>
        <span className="lg:w-12 w-24">{""}</span>
        <span className="w-52">Title</span>
        <span className="w-32">Author</span>
        <span className="hidden md:flex w-24">Duration</span>
        <span className="hidden md:flex w-24">Requested By</span>
        <span className="w-12">{""}</span>
      </div>
      {musicUpdate.queue &&
        musicUpdate.queue.map((song, index) => (
          <Song key={index} musicUpdate={musicUpdate} index={index} />
        ))}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
