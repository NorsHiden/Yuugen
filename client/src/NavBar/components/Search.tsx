import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock } from "lucide-react";
import { useState } from "react";
import { TbPlaylistAdd } from "react-icons/tb";
import { TbListSearch } from "react-icons/tb";

export const SongOrPlaylist = () => {
  return (
    <Button variant="ghost" className="group w-full h-16 justify-between">
      <div className="flex items-center">
        <img
          className="w-12 h-12 rounded-xl"
          src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
        />
        <div className="flex flex-col items-start ml-2 w-44 text-start overflow-hidden">
          <span className="text-sm font-bold w-44 truncate">
            Aaron Smith - Dancin (KRONO Remix)
          </span>
          <span className="text-xs font-normal w-44 truncate">
            TheSoundYouNeed
          </span>
        </div>
      </div>
      <div className="flex items-center font-normal gap-1">
        <Clock className="h-4 w-4" />
        04:00
      </div>
      <TbPlaylistAdd className="lg:opacity-0 group-hover:opacity-100 transition-opacity h-5 w-5" />
    </Button>
  );
};

export const Search = () => {
  const [singleResults, setSingleResults] = useState([]);
  const [playlistResults, setPlaylistResults] = useState([]);
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Search</DialogTitle>
        <DialogDescription>
          Search for your favorite music and add it to the queue.
        </DialogDescription>
      </DialogHeader>
      <Input type="search" placeholder="Search for a song" />
      <Tabs defaultValue="single">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="single">Single</TabsTrigger>
          <TabsTrigger value="playlist">Playlist</TabsTrigger>
        </TabsList>
        <TabsContent value="single">
          <ScrollArea className="h-[50vh]">
            {singleResults.length ? (
              <>
                <div className="sticky top-[-0.1rem] w-full h-4 bg-gradient-to-b from-background to-transparent pointer-events-none" />
                {singleResults.map((result) => (
                  <SongOrPlaylist key={result.id} />
                ))}
                <div className="sticky bottom-0 w-full h-4 bg-gradient-to-t from-background to-transparent pointer-events-none" />
              </>
            ) : (
              <div className="flex w-full h-[50vh] items-center justify-center">
                <TbListSearch className="h-24 w-24 rounded-xl text-secondary opacity-30" />
              </div>
            )}
          </ScrollArea>
        </TabsContent>
        <TabsContent value="playlist">
          <ScrollArea className="h-[50vh]">
            {playlistResults.length ? (
              <>
                <div className="sticky top-[-0.1rem] w-full h-4 bg-gradient-to-b from-background to-transparent pointer-events-none" />
                {playlistResults.map((result) => (
                  <SongOrPlaylist key={result.id} />
                ))}
                <div className="sticky bottom-0 w-full h-4 bg-gradient-to-t from-background to-transparent pointer-events-none" />
              </>
            ) : (
              <div className="flex w-full h-[50vh] items-center justify-center">
                <TbListSearch className="h-24 w-24 rounded-xl text-secondary opacity-30" />
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
};
