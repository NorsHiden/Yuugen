import axios from "axios";
import { useState } from "react";
import { BiSolidVolumeFull } from "react-icons/bi";
import { BsFillTelephoneXFill } from "react-icons/bs";
import { VscLoading } from "react-icons/vsc";

const Channel = ({ channel }: any) => {
  const [loading, setLoading] = useState(false);
  return (
    <div
      onClick={() => {
        if (loading) return;
        setLoading(true);
        axios.post(
          `/api/voice/join?guildId=${window.location.pathname.slice(
            1
          )}&channelId=${channel.id}`
        );
      }}
      className="flex items-center p-2 min-h-[2.5rem] rounded-lg hover:bg-gradient-to-r from-yuugenColorSecond to-transparent cursor-pointer overflow-hidden"
    >
      {loading ? (
        <div className="animate-spin">
          <VscLoading />
        </div>
      ) : (
        <BiSolidVolumeFull />
      )}
      <p className="font-gilroySemiBold ml-2 truncate">
        {channel.name.length > 20
          ? channel.name.slice(0, 20) + "..."
          : channel.name}
      </p>
    </div>
  );
};

const ConnectedChannel = ({ channel }: any) => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex items-center p-2 min-h-[2.5rem] rounded-lg bg-yuugenColorSecond text-yuugenColorFirst cursor-pointer overflow-hidden">
      <BiSolidVolumeFull />
      <p className="font-gilroySemiBold ml-2 truncate">{channel.name}</p>
      {loading ? (
        <div className="ml-auto mr-4 animate-spin text-xl">
          <VscLoading />
        </div>
      ) : (
        <div
          onClick={() => {
            setLoading(true);
            axios.post(
              `/api/voice/leave?guildId=${window.location.pathname.slice(
                1
              )}&channelId=${channel.id}`
            );
          }}
          className="ml-auto mr-4 hover:text-white"
        >
          <BsFillTelephoneXFill />
        </div>
      )}
    </div>
  );
};

export const VoiceChannels = ({ voiceChannels, currentVoiceChannel }: any) => {
  return (
    <div className="w-full h-full">
      <h1 className="font-gilroyBold text-2xl text-white mb-4">
        Voice Channels
      </h1>
      <div className="flex flex-col h-[10rem] overflow-y-auto">
        {voiceChannels
          ? voiceChannels.map((channel: any) => {
              if (currentVoiceChannel && channel.id === currentVoiceChannel.id)
                return <ConnectedChannel key={channel.id} channel={channel} />;
              return <Channel key={channel.id} channel={channel} />;
            })
          : Array(0, 0, 0, 0).map((_, idx) => (
              <div
                key={idx}
                className="flex items-center h-10 gap-4 animate-pulse"
              >
                <div className="w-5 h-5 rounded-full bg-yuugenColorSecond" />
                <div className="w-56 h-3 rounded bg-yuugenColorSecond" />
              </div>
            ))}
      </div>
    </div>
  );
};
