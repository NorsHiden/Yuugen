import { useEffect, useState } from "react";
import { Channel, Guild, GuildUpdate, Song } from "../interfaces";
import { MusicPlayer } from "./MusicPlayer";
import { PlayingNow } from "./PlayingNow";
import { Queue } from "./Queue";
import { Search } from "./Search";
import { VoiceChannels } from "./VoiceChannels";
import "./mc-styles.css";

interface MusicControllerProps {
  currentGuild: Guild | null;
}

export const MusicController = ({ currentGuild }: MusicControllerProps) => {
  const [voiceChannels, setVoiceChannels] = useState<Channel[]>([]);
  const [currentVoiceChannel, setCurrentVoiceChannel] = useState<Channel>(
    {} as Channel
  );
  const [queue, setQueue] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [currentState, setCurrentState] = useState<
    "playing" | "paused" | "idle"
  >("idle");
  const [loopState, setLoopState] = useState<"none" | "queue" | "song">("none");
  const [volume, setVolume] = useState<number>(100);
  const [seek, setSeek] = useState<number>(0);
  const [event, setEvent] = useState<EventSource | null>(null);

  useEffect(() => {
    if (!currentGuild) return;
    const newEvent = new EventSource(
      `/api/voice/updates?guildId=${currentGuild.id}`
    );
    if (event) event.close();
    newEvent.onmessage = (e) => {
      const data: GuildUpdate = JSON.parse(e.data);
      setVoiceChannels(data.voices);
      setQueue(data.queue);
      setCurrentIndex(data.currentIndex);
      setCurrentState(data.state);
      setLoopState(data.loopState);
      setVolume(data.volume);
      if (data.seek) setSeek(data.seek);
      if (!data.currentVoice) setCurrentVoiceChannel({} as Channel);
      else setCurrentVoiceChannel(data.currentVoice);
    };
    setEvent(newEvent);
  }, [currentGuild]);
  return (
    <div className="flex flex-col h-[calc(100vh-3.2rem)]">
      <div className="flex flex-row h-full w-full overflow-y-auto overflow-x-hidden">
        <div className="flex flex-col h-full w-full">
          <div className="flex flex-row h-60 w-full">
            <PlayingNow queue={queue} currentIndex={currentIndex} />
            <VoiceChannels
              currentGuild={currentGuild}
              voiceChannels={voiceChannels}
              currentVoiceChannel={currentVoiceChannel}
            />
          </div>
          <Queue
            currentGuild={currentGuild}
            queue={queue}
            currentIndex={currentIndex}
            currentState={currentState}
          />
          <div className="w-full min-h-[7rem]"></div>
        </div>
        <Search currentGuild={currentGuild} queue={queue} />
      </div>
      <MusicPlayer
        currentGuild={currentGuild}
        queue={queue}
        currentIndex={currentIndex}
        currentState={currentState}
        loopState={loopState}
        volume={volume}
        seek={seek}
      />
    </div>
  );
};
