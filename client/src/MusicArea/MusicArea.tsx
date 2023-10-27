import { VoiceChannels } from "./VoiceChannels";

export const MusicController = () => {
  return (
    <div className="md:w-full border rounded-2xl lg:min-w-[30rem] h-40"></div>
  );
};

export const Queue = () => {};

export const MusicArea = () => {
  return (
    <div className="flex">
      <div className="flex flex-col m-2 w-full">
        <div className="flex flex-col md:flex-row gap-2">
          <MusicController />
          <VoiceChannels />
        </div>
        <div>Queue</div>
      </div>
      <div className="hidden lg:flex flex-grow border-l lg:w-96">Logs</div>
    </div>
  );
};
