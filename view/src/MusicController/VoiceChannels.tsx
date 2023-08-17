import { BiVolumeFull } from "react-icons/bi";

const VoiceChannelItem = () => {
  return (
    <div className="music-channel-item">
      <BiVolumeFull size="32" />
      <div className="music-channel-item-name">General</div>
    </div>
  );
};

export const VoiceChannels = () => {
  return (
    <div className="music-channels">
      <div className="music-header">Voice Channels</div>
      <div className="music-channel-list">
        <VoiceChannelItem />
        <VoiceChannelItem />
        <VoiceChannelItem />
        <VoiceChannelItem />
        <VoiceChannelItem />
        <VoiceChannelItem />
        <VoiceChannelItem />
        <VoiceChannelItem />
      </div>
    </div>
  );
};
