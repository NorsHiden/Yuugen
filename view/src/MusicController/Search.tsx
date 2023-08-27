import axios from "axios";
import { YouTubePlayList } from "play-dl";
import { useEffect, useState } from "react";
import { BiPlus, BiSearchAlt } from "react-icons/bi";
import { useDebounce } from "use-debounce";
import { Guild, Song } from "../interfaces";
import { MdLibraryAddCheck } from "react-icons/md";

interface SearchItemProps {
  currentGuild: Guild;
  result: YouTubePlayList;
  queue: Song[];
}

const SearchItem = ({ currentGuild, result, queue }: SearchItemProps) => {
  const addSong = () => {
    axios.post(`/api/voice/queue?guildId=${currentGuild.id}&url=${result.url}`);
  };
  return (
    <div
      className="group flex flex-row items-center min-h-[4rem] rounded-xl p-2 cursor-pointer hover:bg-gradient-to-r from-yuugenColorSecond to-transparent hover:text-white "
      onClick={addSong}
    >
      <img
        className="h-14 w-14 object-cover rounded-xl bg-[#003344]"
        src={result.thumbnail?.url}
      />
      <div>
        <div className="ml-2 text-xs font-medium max-w-[14rem] overflow-hidden whitespace-nowrap text-ellipsis">
          {result.title}
        </div>
        <div className="ml-2 text-[10px] font-light max-w-[14rem] overflow-hidden whitespace-nowrap text-ellipsis">
          {result.channel?.name}
        </div>
      </div>
      {queue.find((song) => song.url === result.url) ? (
        <MdLibraryAddCheck className="flex min-w-[1.5rem] min-h-[1.5rem] ml-auto mr-2 text-[#003344]" />
      ) : (
        <BiPlus className="hidden min-w-[1.5rem] min-h-[1.5rem] ml-auto mr-2 text-[#003344] group-hover:flex" />
      )}
    </div>
  );
};

interface SearchProps {
  currentGuild: Guild | null;
  queue: Song[];
}

export const Search = ({ currentGuild, queue }: SearchProps) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [searchResults, setSearchResults] = useState<YouTubePlayList[]>([]);

  useEffect(() => {
    if (debouncedSearch === "") {
      setSearchResults([]);
      return;
    }
    axios.get(`/api/voice/yt-search?prompt=${debouncedSearch}`).then((res) => {
      setSearchResults(res.data);
    });
  }, [debouncedSearch]);
  return (
    <div className="flex flex-col min-w-[22rem] h-[calc(100%-6rem)] font-sans text-white">
      <div className="mt-4 w-full text-2xl font-extrabold">Search</div>
      <div
        tabIndex={2}
        className="group flex flex-row items-center w-[calc(100%-1rem)] min-h-[2.5rem] border-solid border-2 rounded-lg border-yuugenColorSecond pr-3 pl-3 mt-2 duration-200 focus-within:border-[#003344]"
      >
        <input
          type="text"
          placeholder="Search for a song..."
          className="w-full text-xs placeholder-[#001a23]"
          onChange={(e) => setSearch(e.target.value)}
        />
        <BiSearchAlt
          size="26"
          className="text-[#001a23] duration-200 group-focus-within:text-[#003344] group-focus-within:scale-110"
        />
      </div>
      <div className="flex flex-col w-full mt-3">
        {searchResults.map((result) => (
          <SearchItem
            key={result.id}
            currentGuild={
              currentGuild ? currentGuild : ({ id: "", name: "" } as Guild)
            }
            result={result}
            queue={queue}
          />
        ))}
        <div className="w-full min-h-[7rem]"></div>
      </div>
    </div>
  );
};
