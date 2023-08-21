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
    <div className="music-search-item" onClick={addSong}>
      <img className="music-search-item-pic" src={result.thumbnail?.url} />
      <div>
        <div className="music-search-item-title">{result.title}</div>
        <div className="music-search-item-artist">{result.channel?.name}</div>
      </div>
      {queue.find((song) => song.url === result.url) ? (
        <MdLibraryAddCheck
          className="music-search-item-icon"
          style={{ display: "flex" }}
        />
      ) : (
        <BiPlus className="music-search-item-icon" />
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
    <div className="music-search">
      <div className="music-header">Search</div>
      <div className="music-search-input">
        <input
          type="text"
          placeholder="Search for a song..."
          className="music-search-bar"
          onChange={(e) => setSearch(e.target.value)}
        />
        <BiSearchAlt size="32" className="music-search-bar-icon" />
      </div>
      <div className="music-search-results">
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
        <div className="musicplayer-placeholder"></div>
      </div>
    </div>
  );
};
