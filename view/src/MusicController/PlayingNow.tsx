import { Song } from "../interfaces";

interface PlayingNowProps {
  queue: Song[];
  currentIndex: number;
}

export const PlayingNow = ({ queue, currentIndex }: PlayingNowProps) => {
  const defaultImg =
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjAmL4KAKSy3U-6BwpDEvTmSZoFrVwops1WJK5ECjkzbrhuLQnC_UZTteRjVX_PBkTiFYucBY-7kFXq_qbCy4dxgBkP9IQUrWnfR4ztd6a0i6vj35U19NCWOJ39K4ay-1zCuXPblalnMWWSpBJamEzzbCCRoa3Gb2eQcXks7858aopJn2GYGji-7hjvug/s600-rw/lofi-anime-girl-studying-1282023.png";

  return (
    <div
      className="music-playing-now"
      style={{
        backgroundImage: `url(${
          currentIndex > -1 ? queue[currentIndex].thumbnail : defaultImg
        })`,
      }}
    >
      <div className="music-playing-now-grad">
        <div className="music-header">
          {currentIndex > -1 ? "Playing Now" : "Nothing is Playing"}
        </div>
        <div className="music-playing-now-author">
          {currentIndex > -1 ? queue[currentIndex].author : ""}
        </div>
        <div className="music-playing-now-title">
          {currentIndex > -1 ? queue[currentIndex].title : ""}
        </div>
        <div className="music-playing-now-requestedby">
          {" "}
          {currentIndex > -1
            ? `Requested By ${queue[currentIndex].requester_name}`
            : ""}
        </div>
      </div>
    </div>
  );
};
