import { MusicController } from "./MusicController";
import { VoiceChannels } from "./VoiceChannels";
import { Queue } from "./Queue";
import { useEffect, useState } from "react";
import { getSSEUpdates } from "./MusicAreaControl";

export const MusicArea = () => {
  const [musicUpdate, setMusicUpdate] = useState({});

  useEffect(() => {
    getSSEUpdates(window.location.pathname.slice(1));
  }, []);

  return (
    <div className="flex h-[calc(100%-3.5rem)] gap-2">
      <div className="flex flex-col m-2 pt-2 gap-4 w-full">
        {/* <div>{musicUpdate}</div> */}
        <div className="flex flex-col md:flex-row md:min-h-[12rem] min-h-[24rem] gap-4">
          <MusicController />
          <VoiceChannels />
        </div>
        <Queue />
      </div>
      <div className="hidden lg:flex lg:flex-col border-l lg:w-96 h-full">
        <h2 className="text-xl font-bold m-4 tracking-tight">Audit Log</h2>
        <div className="flex h-full items-center justify-center text-secondary">
          <h3>Under Development...</h3>
        </div>
      </div>
    </div>
  );
};
