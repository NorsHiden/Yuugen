import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { YouTubePlayList } from "@/lib/types/YoutubePlaylist";
import { ScrollArea } from "@/components/ui/scroll-area";
import { YouTubeVideo } from "@/lib/types/YoutubeVideo";
import { useDebounce } from "@uidotdev/usehooks";
import { Button } from "@/components/ui/button";
import { TbPlaylistAdd } from "react-icons/tb";
import { Input } from "@/components/ui/input";
import { TbListSearch } from "react-icons/tb";
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import axios from "axios";
import { AiOutlineLoading } from "react-icons/ai";

interface SongOrPlaylistProps {
  result: YouTubeVideo | YouTubePlayList;
  isSong?: boolean;
}

export const SongOrPlaylist = ({ result, isSong }: SongOrPlaylistProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const addSong = () => {
    axios
      .post(
        `/api/music/queue?url=${
          result.url
        }&guild_id=${window.location.pathname.slice(1)}`
      )
      .then((res) => setIsLoading(false));
    setIsLoading(true);
  };

  return (
    <Button
      variant="ghost"
      className="group w-full h-16 justify-between"
      onClick={addSong}
    >
      <div className="flex items-center">
        <img
          className="w-12 h-12 rounded-xl object-cover object-center"
          src={result.thumbnail?.url}
        />
        <div className="flex flex-col items-start ml-2 w-44 text-start overflow-hidden">
          <span className="text-sm font-bold w-44 truncate">
            {result.title}
          </span>
          <span className="text-xs font-normal w-44 truncate">
            {result.channel?.name}
          </span>
        </div>
      </div>
      {isSong && (
        <div className="flex items-center font-normal gap-1">
          <Clock className="h-4 w-4" />
          {(result as YouTubeVideo).durationRaw}
        </div>
      )}
      {isLoading ? (
        <AiOutlineLoading className="animate-spin h-5 w-5" />
      ) : (
        <TbPlaylistAdd className="lg:opacity-0 group-hover:opacity-100 transition-opacity h-5 w-5" />
      )}
    </Button>
  );
};

export const Search = () => {
  const [singleResults, setSingleResults] = useState<YouTubeVideo[]>([]);
  const [playlistResults, setPlaylistResults] = useState<YouTubePlayList[]>([]);
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 1000);

  useEffect(() => {
    if (!debouncedSearchTerm.length)
      return setSingleResults([]), setPlaylistResults([]);
    axios
      .get(`/api/music/search?query=${debouncedSearchTerm}&options=video`)
      .then((res) => {
        console.log(res.data);
        setSingleResults(res.data);
      });
    axios
      .get(`/api/music/search?query=${debouncedSearchTerm}&options=playlist`)
      .then((res) => {
        setPlaylistResults(res.data);
      });
  }, [debouncedSearchTerm]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Search</DialogTitle>
        <DialogDescription>
          Search for your favorite music and add it to the queue.
        </DialogDescription>
      </DialogHeader>
      <Input
        type="search"
        placeholder="Search for a song"
        onChange={(e) => setSearch(e.target.value)}
      />
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
                  <SongOrPlaylist key={result.id} result={result} isSong />
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
                  <SongOrPlaylist key={result.id} result={result} />
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
