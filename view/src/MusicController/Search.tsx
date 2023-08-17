import { BiPlus, BiSearchAlt } from "react-icons/bi";

const SearchItem = () => {
  return (
    <div className="music-search-item">
      <div className="music-search-item-pic"></div>
      <div>
        <div className="music-search-item-title">Song Title</div>
        <div className="music-search-item-artist">Song Artist</div>
      </div>
      <BiPlus className="music-search-item-icon" />
    </div>
  );
};

export const Search = () => {
  return (
    <div className="music-search">
      <div className="music-header">Search</div>
      <div className="music-search-input">
        <input
          type="text"
          placeholder="Search for a song..."
          className="music-search-bar"
        />
        <BiSearchAlt size="32" className="music-search-bar-icon" />
      </div>
      <div className="music-search-results">
        <SearchItem />
      </div>
    </div>
  );
};
