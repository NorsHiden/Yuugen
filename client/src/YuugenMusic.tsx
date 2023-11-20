import { MusicArea } from "./MusicArea/MusicArea";
import { NavBar } from "./NavBar/NavBar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SelectGuildModal } from "./NavBar/components/SelectGuildModal";
import { Dialog } from "@radix-ui/react-dialog";
import { LoginModal } from "./LoginModal";
import { useEffect, useState } from "react";
import { MusicUpdate } from "./lib/types/MusicUpdate";
import { getSSEUpdates } from "./MusicArea/MusicAreaControl";
import { Guild } from "discord.js";

export const YuugenMusic = () => {
  const { isError: meIsError } = useQuery({
    queryKey: ["getMe"],
    queryFn: async () => axios.get("/api/users/me"),
  });
  const { data: guilds, isLoading } = useQuery({
    queryKey: ["guilds"],
    queryFn: async () => axios.get("/api/guilds/common"),
  });
  const [musicUpdate, setMusicUpdate] = useState<MusicUpdate>(
    {} as MusicUpdate
  );

  useEffect(() => {
    getSSEUpdates(window.location.pathname.slice(1), setMusicUpdate);
  }, []);

  return (
    <div className="flex  flex-col w-screen h-screen">
      {meIsError && <LoginModal />}
      <Dialog
        open={
          isLoading ||
          guilds?.data.find(
            (guild: Guild) => window.location.pathname.split("/")[1] == guild.id
          )
            ? false
            : true
        }
      >
        <SelectGuildModal />
      </Dialog>
      <NavBar queue={musicUpdate.queue} />
      <MusicArea musicUpdate={musicUpdate} />
    </div>
  );
};
