import { MusicPlayer } from "./MusicPlayer/MusicPlayer";
import { NavBar } from "./NavBar/NavBar";

export const App = () => {
  return (
    <div className="flex flex-col w-full h-ful bg-yuugenBackgroundColor text-white">
      <NavBar />
      <MusicPlayer />
    </div>
  );
};
