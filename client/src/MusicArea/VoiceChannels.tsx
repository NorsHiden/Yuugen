import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MusicUpdate } from "@/lib/types/MusicUpdate";
import axios from "axios";
import { GuildBasedChannel, VoiceChannel } from "discord.js";
import { Replace, Unplug, Volume2 } from "lucide-react";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AvatarGroup = () => {
  return (
    <div className="flex relative items-center gap-2 mt-2 h-8">
      <Avatar className="absolute top-0 left-0 z-0 h-8 w-8 hover:translate-x-[-0.75rem] transition-all">
        <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
        <AvatarFallback>F</AvatarFallback>
      </Avatar>
      <Avatar className="absolute left-4 z-10 h-8 w-8  hover:translate-x-[-0.75rem] transition-all">
        <AvatarImage src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
        <AvatarFallback>F</AvatarFallback>
      </Avatar>
      <Avatar className="absolute left-8 z-20 h-8 w-8  hover:translate-x-[-0.75rem] transition-all">
        <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
        <AvatarFallback>F</AvatarFallback>
      </Avatar>
      <Avatar className="absolute left-12 z-20 h-8 w-8  hover:translate-x-[-0.75rem] transition-all">
        <AvatarImage src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
        <AvatarFallback>F</AvatarFallback>
      </Avatar>
      <Avatar className="absolute left-16 z-20 h-8 w-8">
        <AvatarFallback>+1</AvatarFallback>
      </Avatar>
    </div>
  );
};

interface VoiceChannelItemProps {
  musicUpdate: MusicUpdate;
  channel: GuildBasedChannel;
}

const VoiceChannelItem = ({ musicUpdate, channel }: VoiceChannelItemProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const joinLeaveChannel = (channelId: string) => {
    if (channel.id === musicUpdate.currentVoiceChannel.id)
      axios
        .post(`/api/music/leave?guild_id=${musicUpdate.guildId}`)
        .then(() => {
          setIsLoading(false);
        });
    else
      axios
        .post(
          `/api/music/join?guild_id=${musicUpdate.guildId}&channel_id=${channelId}`
        )
        .then(() => {
          setIsLoading(false);
        });
    setIsLoading(true);
  };

  const ChannelState = () => {
    if (isLoading)
      return <AiOutlineLoading3Quarters className="ml-auto animate-spin" />;
    else if (channel.id === musicUpdate.currentVoiceChannel.id)
      return (
        <Unplug className="ml-auto opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all" />
      );
    else
      return (
        <Replace className="ml-auto opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all" />
      );
  };

  return (
    <Button
      variant={
        channel.id === musicUpdate.currentVoiceChannel.id ? "default" : "ghost"
      }
      className={`group flex w-[calc(100%-1rem)] justify-start items-center gap-2 ${
        isLoading && "cursor-wait opacity-50"
      }`}
      key={channel.id}
      onClick={() => joinLeaveChannel(channel.id)}
    >
      <Volume2 />
      <h3 className="text-lg font-bold">{channel.name}</h3>
      <ChannelState />
    </Button>
  );
};

interface VoiceChannelsProps {
  musicUpdate: MusicUpdate;
}

export const VoiceChannels = ({ musicUpdate }: VoiceChannelsProps) => {
  return (
    <div className="w-full p-4 border rounded-2xl max-md:min-w-fit lg:h-full">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Volume2 />
          <h2 className="text-xl font-bold tracking-tight">Voice Channels</h2>
        </div>
        <div className="flex flex-row">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost">
                <Replace />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle asChild>
                  <h2 className="text-xl font-bold tracking-tight">
                    Voice Channels
                  </h2>
                </DialogTitle>
                <DialogClose />
              </DialogHeader>
              <Separator />
              <ScrollArea className="h-72 rounded-md">
                {musicUpdate.voiceChannels &&
                  musicUpdate.voiceChannels.map(
                    (channel: GuildBasedChannel) => (
                      <VoiceChannelItem
                        musicUpdate={musicUpdate}
                        channel={channel}
                        key={channel.id}
                      />
                    )
                  )}
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex items-center w-full bg-secondary p-2 rounded-lg mt-4 justify-between">
        <div className="flex items-center gap-2 ml-4">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <h3 className="text-lg font-bold">🌍︱Publić</h3>
        </div>
        <Button variant="ghost" size="icon" className="hover:bg-destructive">
          <Unplug />
        </Button>
      </div>
      <AvatarGroup />
    </div>
  );
};
