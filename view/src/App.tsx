import { useEffect, useState } from "react";
import { MusicController } from "./Desktop/MusicController";
import { NavBar } from "./Desktop/NavBar";
import { NowPlaying } from "./Desktop/NowPlaying";
import { Queue } from "./Desktop/Queue";
import { Search } from "./Desktop/Search";
import { VoiceChannels } from "./Desktop/VoiceChannels";
import axios from "axios";
import { LoginModal } from "./Desktop/LoginModal";
import { GuildSelectModal } from "./Desktop/SelectGuildModal";
import { Helmet } from "react-helmet";

export interface Guild {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: number;
  features: string[];
  permissions_new: string;
}

export interface Channel {
  id: string;
  name: string;
  type: number;
  guild_id: string;
  position: number;
  permission_overwrites: any[];
  rate_limit_per_user: number;
  nsfw: boolean;
  topic: string;
  raw_position: number;
  parent_id: string;
  last_message_id: string;
  bitrate: number;
  user_limit: number;
  rtc_region: string;
  video_quality_mode: number;
  message_count: number;
  member_count: number;
  thread_metadata: any;
  member: any;
  default_auto_archive_duration: number;
  permissions: string;
}

export interface Song {
  title: string;
  author: string;
  url: string;
  thumbnail: string;
  duration: number;
  raw_duration: string;
  requester_id: string;
  requester_name: string;
}

export interface GuildUpdate {
  id: string;
  voices: Channel[];
  currentVoice: Channel;
  queue: Song[];
  currentIndex: number;
  state: "playing" | "paused" | "idle";
  loopState: "queue" | "song" | "none";
  volume: number;
  seek: number;
}

export const App = () => {
  const [user, setUser] = useState<any>(null);
  const [guilds, setGuilds] = useState<any>(null);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showGuildModal, setShowGuildModal] = useState<boolean>(false);
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

  useEffect(() => {
    axios
      .get("/api/user/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setShowLoginModal(true);
      });
    axios.get("/api/user/guilds").then((res) => {
      const currentGuild = window.location.pathname.slice(1);
      if (!res.data.find((guild: any) => guild.id === currentGuild))
        setShowGuildModal(true);
      setGuilds(res.data);
    });
    const event = new EventSource(
      `/api/voice/updates?guildId=${window.location.pathname.slice(1)}`,
      {
        withCredentials: true,
      }
    );
    event.onmessage = (e) => {
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
  }, []);
  return (
    <div className="flex flex-col w-screen h-screen overflow-auto bg-yuugenBackgroundColor text-neutral-400 font-gilroy gap-4">
      <Helmet>
        <title>
          {currentIndex > -1
            ? `${queue[currentIndex].title} | YuugenMusic`
            : "YuugenMusic"}
        </title>
      </Helmet>
      <NavBar user={user} guilds={guilds} />
      <div className="flex w-full h-full flex-row gap-4">
        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-row w-full h-[13rem] gap-4">
            <NowPlaying queue={queue} currentIndex={currentIndex} />
            <VoiceChannels
              voiceChannels={voiceChannels}
              currentVoiceChannel={currentVoiceChannel}
            />
          </div>
          <Queue queue={queue} currentIndex={currentIndex} />
        </div>
        <Search queue={queue} />
      </div>
      <MusicController
        queue={queue}
        currentIndex={currentIndex}
        seek={seek}
        currentState={currentState}
        volume={volume}
        loopState={loopState}
      />
      {showLoginModal && <LoginModal />}
      {showGuildModal && <GuildSelectModal guilds={guilds} />}
    </div>
  );
};
