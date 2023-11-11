import { Search } from "@/NavBar/components/Search";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { MusicUpdate } from "@/lib/types/MusicUpdate";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import {
  BsFillPlayCircleFill,
  BsFillSkipEndFill,
  BsFillSkipStartFill,
  BsRepeat,
  BsShuffle,
} from "react-icons/bs";

export const MusicController = ({
  musicUpdate,
}: {
  musicUpdate: MusicUpdate;
}) => {
  return (
    <div className="flex relative md:w-full rounded-2xl lg:min-w-[30rem] h-full overflow-hidden">
      {musicUpdate.queue && musicUpdate.queue.length > 0 ? (
        <>
          <div
            className="flex absolute z-10 w-full h-full bg-cover bg-no-repeat bg-center blur-lg opacity-80"
            style={{
              backgroundImage: `url(${
                musicUpdate.queue[musicUpdate.currentSong].thumbnail
              })`,
            }}
          />
          <div className="flex flex-grow z-20 w-full h-full items-center">
            <div className="flex flex-col w-full justify-center">
              <div className="flex items-center">
                <div
                  className="h-16 min-w-[4rem] ml-4 bg-secondary-foreground rounded-lg bg-cover bg-no-repeat bg-center shadow-md"
                  style={{
                    backgroundImage: `url(${
                      musicUpdate.queue[
                        musicUpdate.currentSong > -1
                          ? musicUpdate.currentSong
                          : 0
                      ].thumbnail
                    })`,
                  }}
                />
                <div className="px-4 overflow-hidden">
                  <h3 className="text-sm font-light text-secondary-foreground truncate">
                    {
                      musicUpdate.queue[
                        musicUpdate.currentSong > -1
                          ? musicUpdate.currentSong
                          : 0
                      ].author
                    }
                  </h3>
                  <h2 className="text-xl font-bold truncate">
                    {
                      musicUpdate.queue[
                        musicUpdate.currentSong > -1
                          ? musicUpdate.currentSong
                          : 0
                      ].title
                    }
                  </h2>
                </div>
              </div>
              <div className="w-full mt-4 px-4">
                <Slider
                  defaultValue={[80]}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex items-top justify-between text-sm mt-2">
                  <p>
                    {" "}
                    {
                      musicUpdate.queue[
                        musicUpdate.currentSong > -1
                          ? musicUpdate.currentSong
                          : 0
                      ].title
                    }
                  </p>
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
        </>
      ) : (
        <div className="flex w-full h-full items-center justify-center border ">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                disabled={
                  musicUpdate.queue && musicUpdate.queue.length > 0
                    ? true
                    : false
                }
              >
                <PlusCircledIcon className="mr-2 h-4 w-4" />
                Add music
              </Button>
            </DialogTrigger>
            <Search />
          </Dialog>
        </div>
      )}
    </div>
  );
};
