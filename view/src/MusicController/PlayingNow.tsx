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
      className="flex flex-col h-full min-w-[27rem] bg-cover bg-center bg-no-repeat rounded-e-2xl mt-2 mr-4 ml-4"
      style={{
        backgroundImage: `url(${
          currentIndex > -1 ? queue[currentIndex].thumbnail : defaultImg
        })`,
      }}
    >
      <div className="h-full w-full bg-gradient-to-r from-yuugenBackgroundColor to-transparent font-sans text-white">
        <div className="mt-4 w-full text-2xl font-extrabold">
          {currentIndex > -1 ? "Playing Now" : "Nothing is Playing"}
        </div>
        <div className="mt-8 text-sm font-light">
          {currentIndex > -1 ? queue[currentIndex].author : ""}
        </div>
        <div className="text-xl font-bold w-[90%] h-24 overflow-hidden text-ellipsis">
          {currentIndex > -1 ? queue[currentIndex].title : ""}
        </div>
        <div className="mt-4 text-xs font-medium">
          {" "}
          {currentIndex > -1
            ? `Requested By ${queue[currentIndex].requester_name}`
            : ""}
        </div>
      </div>
    </div>
  );
};
