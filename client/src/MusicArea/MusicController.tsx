import { Search } from "@/NavBar/components/Search";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { MusicUpdate } from "@/lib/types/MusicUpdate";
import { secondsToHHMMSS } from "@/lib/utils";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import {
  BsFillPauseCircleFill,
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isError, isLoading: isMeLoading } = useQuery({
    queryKey: ["getMe"],
    queryFn: async () => axios.get("/api/users/me"),
  });

  const actionSong = (action: string, index: number = 0) => {
    if (
      index < 0 ||
      index > musicUpdate.queue.length ||
      isLoading ||
      isMeLoading
    )
      return;
    axios
      .post(
        `/api/music/${action}?guild_id=${window.location.pathname.slice(
          1
        )}&index=${index}`
      )
      .then(() => setIsLoading(false));
    setIsLoading(true);
  };

  if (musicUpdate.queue && musicUpdate.queue.length > 0)
    return (
      <div className="flex relative md:w-full rounded-2xl lg:min-w-[30rem] md:h-full py-4 overflow-hidden">
        <div
          className="flex absolute z-10 w-full h-full bg-cover bg-no-repeat bg-center blur-lg opacity-80"
          style={{
            backgroundImage: `url(${
              musicUpdate.queue[
                musicUpdate.currentSong > -1 ? musicUpdate.currentSong : 0
              ].thumbnail
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
                      musicUpdate.currentSong > -1 ? musicUpdate.currentSong : 0
                    ].thumbnail
                  })`,
                }}
              />
              <div className="px-4 overflow-hidden">
                <h3 className="text-sm font-light text-secondary-foreground truncate">
                  {
                    musicUpdate.queue[
                      musicUpdate.currentSong > -1 ? musicUpdate.currentSong : 0
                    ].author
                  }
                </h3>
                <h2 className="text-xl font-bold truncate">
                  {
                    musicUpdate.queue[
                      musicUpdate.currentSong > -1 ? musicUpdate.currentSong : 0
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
                disabled={isLoading ? true : false}
                className={`w-full ${
                  isLoading && "opacity-50 cursor-not-allowed"
                }`}
              />
              <div className="flex items-top justify-between text-sm mt-2">
                <p>00:00</p>
                <div className="flex items-center gap-2 text-primary-foreground mt-2">
                  <button
                    className={`hover:scale-110 hover:text-primary transition-all ${
                      isLoading && "opacity-50 cursor-not-allowed"
                    }`}
                    onClick={() => actionSong("shuffle")}
                  >
                    <BsShuffle className="text-xl" />
                  </button>
                  <button
                    className={`hover:scale-110 hover:text-primary transition-transform ${
                      isLoading && "opacity-50 cursor-not-allowed"
                    }`}
                    onClick={() =>
                      actionSong("play", musicUpdate.currentSong - 1)
                    }
                  >
                    <BsFillSkipStartFill className="text-2xl" />
                  </button>
                  <button
                    className={`hover:scale-110 hover:text-primary transition-transform ${
                      isLoading && "opacity-50 cursor-not-allowed"
                    }`}
                    onClick={() =>
                      actionSong(
                        musicUpdate.state == "playing" ? "pause" : "play",
                        musicUpdate.currentSong < 0
                          ? 0
                          : musicUpdate.currentSong
                      )
                    }
                  >
                    {isLoading ? (
                      <AiOutlineLoading className="text-3xl animate-spin" />
                    ) : musicUpdate.state == "playing" ? (
                      <BsFillPauseCircleFill className="text-3xl" />
                    ) : (
                      <BsFillPlayCircleFill className="text-3xl" />
                    )}
                  </button>
                  <button
                    className={`hover:scale-110 hover:text-primary transition-transform ${
                      isLoading && "opacity-50 cursor-not-allowed"
                    }`}
                    onClick={() =>
                      actionSong("play", musicUpdate.currentSong + 1)
                    }
                  >
                    <BsFillSkipEndFill className="text-2xl" />
                  </button>
                  <button
                    className={`hover:scale-110 hover:text-primary transition-transform ${
                      isLoading && "opacity-50 cursor-not-allowed"
                    }`}
                    onClick={() => actionSong("loop")}
                  >
                    <BsRepeat className="text-xl" />
                  </button>
                </div>
                <p>
                  {secondsToHHMMSS(
                    musicUpdate.queue[
                      musicUpdate.currentSong > -1 ? musicUpdate.currentSong : 0
                    ].duration
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  return (
    <div className="flex relative md:w-full rounded-2xl lg:min-w-[30rem] h-full overflow-hidden">
      <div className="flex w-full h-full items-center justify-center border ">
        {musicUpdate.queue ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                disabled={isError || isMeLoading ? true : false}
              >
                <PlusCircledIcon className="mr-2 h-4 w-4" />
                Add music
              </Button>
            </DialogTrigger>
            <Search queue={musicUpdate.queue} />
          </Dialog>
        ) : (
          <AiOutlineLoading className="animate-spin h-10 w-10" />
        )}
      </div>
    </div>
  );
};
