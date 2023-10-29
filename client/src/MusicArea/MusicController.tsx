import { Slider } from "@/components/ui/slider";
import {
  BsFillPlayCircleFill,
  BsFillSkipEndFill,
  BsFillSkipStartFill,
  BsRepeat,
  BsShuffle,
} from "react-icons/bs";

export const MusicController = () => {
  return (
    <div className="flex relative md:w-full rounded-2xl lg:min-w-[30rem] h-full overflow-hidden">
      <div
        className="flex absolute z-10 w-full h-full bg-cover bg-no-repeat bg-center blur-lg opacity-80"
        style={{
          backgroundImage:
            "url(https://assets.st-note.com/production/uploads/images/65874918/rectangle_large_type_2_af9cd561c854e2bb6add9896de8ca16f.jpg?width=2000&height=2000&fit=bounds&quality=85)",
        }}
      />
      <div className="flex flex-grow z-20 w-full h-full items-center">
        <div className="flex flex-col w-full justify-center">
          <div className="flex items-center">
            <div
              className="h-16 min-w-[4rem] ml-4 bg-secondary-foreground rounded-lg bg-cover bg-no-repeat bg-center shadow-md"
              style={{
                backgroundImage:
                  "url(https://assets.st-note.com/production/uploads/images/65874918/rectangle_large_type_2_af9cd561c854e2bb6add9896de8ca16f.jpg?width=2000&height=2000&fit=bounds&quality=85)",
              }}
            />
            <div className="px-4 overflow-hidden">
              <h3 className="text-sm font-light text-secondary-foreground truncate">
                TheSoundYouNeed
              </h3>
              <h2 className="text-xl font-bold truncate">
                Aaron Smith - Dancin (KRONO Remix)
              </h2>
            </div>
          </div>
          <div className="w-full mt-4 px-4">
            <Slider defaultValue={[80]} max={100} step={1} className="w-full" />
            <div className="flex items-top justify-between text-sm mt-2">
              <p>00:00</p>
              <div className="flex items-center gap-2 text-primary-foreground mt-2">
                <button className="hover:scale-110 hover:text-primary transition-all">
                  <BsShuffle className="text-xl" />
                </button>
                <button className="hover:scale-110 hover:text-primary transition-transform">
                  <BsFillSkipStartFill className="text-2xl" />
                </button>
                <button className="hover:scale-110 hover:text-primary transition-transform">
                  <BsFillPlayCircleFill className="text-3xl" />
                </button>
                <button className="hover:scale-110 hover:text-primary transition-transform">
                  <BsFillSkipEndFill className="text-2xl" />
                </button>
                <button className="hover:scale-110 hover:text-primary transition-transform">
                  <BsRepeat className="text-xl" />
                </button>
              </div>
              <p>00:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
