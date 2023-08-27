import { BiVolumeFull } from "react-icons/bi";
import { Channel, Guild } from "../interfaces";
import axios from "axios";
import { BsFillTelephoneXFill } from "react-icons/bs";

interface VoiceChannelItemProps {
  currentGuild: Guild;
  channel: Channel;
  currentVoiceChannel: Channel;
}

const VoiceChannelItem = ({
  currentGuild,
  channel,
  currentVoiceChannel,
}: VoiceChannelItemProps) => {
  const joinChannel = () => {
    axios.post(
      `/api/voice/join?guildId=${currentGuild.id}&channelId=${channel.id}`
    );
  };

  const leaveChannel = () => {
    axios.post(`/api/voice/leave?guildId=${currentGuild.id}`);
  };

  const regularChannel = (
    <div
      className="flex min-h-[2.2rem] items-center rounded-lg pl-2 cursor-pointer text-[#a4a4a4] hover:bg-gradient-to-r hover:from-yuugenColorSecond hover:to-transparent hover:text-white"
      onClick={joinChannel}
    >
      <BiVolumeFull size="24" />
      <div className="ml-4">{channel.name}</div>
    </div>
  );
  const activeChannel = (
    <div className="flex min-h-[2.2rem] items-center rounded-lg pl-2 cursor-pointer text-yuugenColorFirst bg-yuugenColorSecond">
      <BiVolumeFull size="24" color="" />
      <div className="ml-4">{channel.name}</div>
      <div onClick={leaveChannel} className="ml-auto mr-4">
        <BsFillTelephoneXFill size="12" />
      </div>
    </div>
  );
  return (
    <>
      {currentVoiceChannel.id === channel.id ? activeChannel : regularChannel}
    </>
  );
};

interface VoiceChannelsProps {
  currentGuild: Guild | null;
  voiceChannels: Channel[];
  currentVoiceChannel: Channel;
}

export const VoiceChannels = ({
  currentGuild,
  voiceChannels,
  currentVoiceChannel,
}: VoiceChannelsProps) => {
  return (
    <div className="flex flex-col h-60 w-full font-sans text-white mt-2 mr-4 ml-4">
      <div className="mt-4 w-full text-2xl font-extrabold">Voice Channels</div>
      <div className="flex flex-col h-full w-full pt-2 text-xs overflow-y-hidden hover:overflow-y-auto">
        {currentGuild ? (
          voiceChannels.map((channel) => (
            <VoiceChannelItem
              key={channel.id}
              currentGuild={currentGuild}
              channel={channel}
              currentVoiceChannel={currentVoiceChannel}
            />
          ))
        ) : (
          <div className="flex min-h-[2rem] items-center rounded-lg pl-2 cursor-pointer text-[#a4a4a4] bg-gradient-to-r from-yuugenColorSecond to-transparent">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};
