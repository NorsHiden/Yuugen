import { NowPlaying } from "./NowPlaying";
import { Queue } from "./Queue";

export const MusicPlayer = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <NowPlaying />
      <div className="mt-10 ml-2 z-10">
        <div className="flex flex-row gap-4">
          <p className="text-2xl font-bold">Queue</p>
          <p className="text-2xl font-bold opacity-40">Voices</p>
        </div>
        <Queue />
      </div>
    </div>
  );
};
