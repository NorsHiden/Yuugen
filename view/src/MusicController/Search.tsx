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
  type: "video" | "playlist";
}

const SearchItem = ({ currentGuild, result, queue, type }: SearchItemProps) => {
  const addSong = () => {
    axios.post(
      `/api/voice/queue?guildId=${currentGuild.id}&type=${type}&url=${result.url}`
    );
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

const SearchSkeleton = () => {
  return (
    <div className="animate-pulse">
      {[1, 2, 3, 4, 5, 6].map(() => (
        <div className="group flex flex-row items-center min-h-[4rem] rounded-xl p-2 opacity-30">
          <div className="h-14 w-14 object-cover rounded-xl bg-[#003344]" />
          <div className="flex flex-col gap-2">
            <div className="ml-2 text-xs font-medium w-[12rem] h-3 rounded-full bg-[#003344]"></div>
            <div className="ml-2 text-[10px] font-light w-[6rem] h-2 rounded-full bg-[#003344]"></div>
          </div>
        </div>
      ))}
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
  const [searchType, setSearchType] = useState<"video" | "playlist">("video");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<YouTubePlayList[]>([]);

  useEffect(() => {
    setSearchResults([]);
    if (debouncedSearch === "") return;
    axios
      .get(`/api/voice/yt-search?type=${searchType}&prompt=${debouncedSearch}`)
      .then((res) => {
        setSearchResults(res.data);
        setLoading(false);
      });
    setLoading(true);
  }, [debouncedSearch, searchType]);
  return (
    <div className="flex flex-col items-center min-w-[22rem] h-[calc(100%-6rem)] font-sans text-white">
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
      <div className="flex flex-row justify-center w-full pt-2 gap-4">
        {searchType === "video" ? (
          <div className="flex flex-col items-center font-bold cursor-pointer text-yuugenColorFirst">
            <div>Single</div>
            <div className="flex w-12 h-1 rounded-full transition-all durarion-200 bg-yuugenColorFirst"></div>
          </div>
        ) : (
          <div
            className="flex flex-col items-center font-semibold cursor-pointer transtion-all duration-200 hover:font-bold"
            onClick={() => setSearchType("video")}
          >
            <div>Single</div>
            <div className="w-0 h-1 rounded-full transition-all durarion-200 bg-yuugenColorFirst"></div>
          </div>
        )}
        {searchType === "playlist" ? (
          <div className="flex flex-col items-center font-bold cursor-pointer text-yuugenColorFirst">
            <div>Playlist</div>
            <div className="flex w-14 h-1 rounded-full transition-all durarion-200 bg-yuugenColorFirst"></div>
          </div>
        ) : (
          <div
            className="flex flex-col items-center font-semibold cursor-pointer transtion-all duration-200 hover:font-bold"
            onClick={() => setSearchType("playlist")}
          >
            <div>Playlist</div>
            <div className="w-0 h-1 rounded-full transition-all durarion-200 bg-yuugenColorFirst"></div>
          </div>
        )}
      </div>
      <div className="flex flex-col w-full mt-3">
        {searchResults.length === 0 && loading ? (
          <SearchSkeleton />
        ) : (
          searchResults.map((result) => (
            <SearchItem
              key={result.id}
              currentGuild={
                currentGuild ? currentGuild : ({ id: "", name: "" } as Guild)
              }
              result={result}
              queue={queue}
              type={searchType}
            />
          ))
        )}
        <div className="w-full min-h-[7rem]"></div>
      </div>
    </div>
  );
};
