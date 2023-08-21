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
    <div className="music-channel-item" onClick={joinChannel}>
      <BiVolumeFull size="32" />
      <div className="music-channel-item-name">{channel.name}</div>
    </div>
  );
  const activeChannel = (
    <div className="music-channel-item-active">
      <BiVolumeFull size="32" color="" />
      <div className="music-channel-item-name">{channel.name}</div>
      <div className="music-channel-item-disconnect-btn" onClick={leaveChannel}>
        <BsFillTelephoneXFill size="16" />
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
    <div className="music-channels">
      <div className="music-header">Voice Channels</div>
      <div className="music-channel-list">
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
          <div className="music-channel-skeleton">Loading...</div>
        )}
      </div>
    </div>
  );
};
