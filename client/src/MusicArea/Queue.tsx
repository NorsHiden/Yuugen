import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import { FiMoreHorizontal } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { MusicUpdate, Song as MusicSong } from "@/lib/types/MusicUpdate";
import { secondsToHHMMSS } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { BsTrash } from "react-icons/bs";
import axios from "axios";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Song = ({ song, index }: { song: MusicSong; index: number }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const removeSong = () => {
    axios
      .delete(
        `/api/music/song?guild_id=${window.location.pathname.slice(
          1
        )}&song=${index}`
      )
      .then(() => setIsLoading(false));
    setIsLoading(true);
  };
  return (
    <div className="flex items-center justify-between px-4 my-2 h-16 rounded-xl hover:bg-secondary">
      <span className="w-2">{index + 1}</span>
      <div className="flex lg:w-12 w-24 justify-center">
        <div
          className="w-12 h-12 bg-cover bg-center rounded-md"
          style={{
            backgroundImage: `url(${song.thumbnail})`,
          }}
        />
      </div>
      <span className="w-52 truncate overflow-hidden">{song.title}</span>
      <span className="hidden md:flex w-48 truncate overflow-hidden">
        {song.author}
      </span>
      <span className="hidden md:flex w-24 truncate overflow-hidden">
        {secondsToHHMMSS(song.duration)}
      </span>
      <span className="hidden md:flex w-24 text-xl">
        <TbBrandYoutubeFilled />
      </span>
      <span className="hidden md:flex w-24 truncate overflow-hidden">
        {song.requester.username}
      </span>
      {isLoading ? (
        <AiOutlineLoading3Quarters className="ml-auto animate-spin" />
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
      <div className="flex sticky top-0 items-center justify-between px-4 py-2 my-2 gap-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <span className="w-2">#</span>
        <span className="lg:w-12 w-24">{""}</span>
        <span className="w-52">Title</span>
        <span className="hidden md:flex w-48">Author</span>
        <span className="hidden md:flex w-24">Duration</span>
        <span className="hidden md:flex w-24">Platform</span>
        <span className="hidden md:flex w-24">Requested By</span>
        <span className="w-12">{""}</span>
      </div>
      {musicUpdate.queue &&
        musicUpdate.queue.map((song, index) => (
          <Song key={index} song={song} index={index} />
        ))}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
