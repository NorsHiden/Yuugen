import axios from "axios";
import { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { TbPlaylist, TbPlaylistAdd } from "react-icons/tb";
import { VscLoading } from "react-icons/vsc";

const ResultItem = ({ result, searchType, queue }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const inQueue = queue?.find((item: any) => item.url === result.url)
    ? true
    : false;

  const AddtoQueue = () => {
    setLoading(true);
    axios
      .post(
        `/api/voice/queue?guildId=${window.location.pathname.slice(
          1
        )}&type=${searchType}&url=${result.url}`
      )
      .then(() => setLoading(false));
  };
  return (
    <div
      onClick={AddtoQueue}
      className={`flex group items-center p-2 gap-2 w-[20rem] h-16 ${
        inQueue ? "text-yuugenColorFirst" : "text-white"
      } cursor-pointer rounded-lg hover:bg-gradient-to-r from-yuugenColorSecond to-transparent ${
        loading && "brightness-50"
      }`}
    >
      <img
        src={result.thumbnail.url}
        className="object-cover object-center w-12 h-12 rounded-lg"
      />
      <div className="flex flex-col overflow-hidden gap-1">
        <p className="font-gilroySemiBold text-sm truncate">{result.title}</p>
        <p className="text-xs truncate">{result.channel.name}</p>
      </div>
      <div className="ml-auto mr-2">
        {loading ? (
          <div className="animate-spin">
            <VscLoading />
          </div>
        ) : (
          <div className="opacity-0 group-hover:opacity-100">
            {inQueue ? <TbPlaylist /> : <TbPlaylistAdd />}
          </div>
        )}
      </div>
    </div>
  );
};

export const Search = ({ queue }: any) => {
  const [searchType, setSearchType] = useState<"video" | "playlist">("video");
  const [results, setResults] = useState<any>(null);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [search, 500]);

  useEffect(() => {
    if (!debouncedSearch.length) {
      setResults(null);
      setLoading(false);
      return;
    }
    axios
      .get(`/api/voice/yt-search?type=${searchType}&prompt=${debouncedSearch}`)
      .then((res) => {
        setResults(res.data);
        setLoading(false);
      });
    setLoading(true);
  }, [debouncedSearch, searchType]);

  return (
    <div className="flex flex-col items-center min-w-[22rem]">
      <div
        tabIndex={0}
        className="flex group items-center w-[calc(100%-2rem)] h-10 rounded-lg px-2 border-2 border-yuugenColorSecond focus-within:border-[#002d3d] transition-all"
      >
        <input
          className="placeholder:text-yuugenColorSecond placeholder:text-sm w-full"
          type="text"
          placeholder="Search for a song..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="text-2xl ml-auto text-yuugenColorSecond transition-all group-focus-within:text-[#002d3d] group-focus-within:scale-110">
          <BiSearchAlt />
        </div>
      </div>
      <div className="flex items-center mt-4 gap-4 font-gilroySemiBold">
        <button
          type="button"
          onClick={() => setSearchType("video")}
          className={
            searchType === "video"
              ? "px-4 py-1 rounded-xl bg-yuugenColorFirst text-yuugenBackgroundColor"
              : "px-4 py-1 rounded-xl bg-yuugenColorSecond text-white cursor-pointer hover:brightness-125"
          }
        >
          Single
        </button>
        <button
          type="button"
          onClick={() => setSearchType("playlist")}
          className={
            searchType === "playlist"
              ? "px-4 py-1 rounded-xl bg-yuugenColorFirst text-yuugenBackgroundColor"
              : "px-4 py-1 rounded-xl bg-yuugenColorSecond text-white cursor-pointer hover:brightness-125"
          }
        >
          Playlist
        </button>
      </div>
      <div className="flex flex-col w-full h-[calc(100vh-16rem)] mt-4 overflow-y-auto">
        {loading
          ? Array(0, 0, 0, 0, 0, 0, 0).map((_, index: number) => (
              <div
                key={index}
                className="flex items-center p-2 gap-2 w-[20rem] h-16 animate-pulse"
              >
                <div className="h-12 w-12 bg-yuugenColorSecond rounded-lg" />
                <div className="flex flex-col justify-center gap-2">
                  <div className="w-36 h-3 bg-yuugenColorSecond rounded-lg" />
                  <div className="w-16 h-2 bg-yuugenColorSecond rounded-lg" />
                </div>
              </div>
            ))
          : results?.map((result: any, index: number) => (
              <ResultItem
                key={index}
                result={result}
                searchType={searchType}
                queue={queue}
              />
            ))}
      </div>
    </div>
  );
};
