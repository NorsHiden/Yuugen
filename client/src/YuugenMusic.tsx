import { MusicArea } from "./MusicArea/MusicArea";
import { NavBar } from "./NavBar/NavBar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SelectGuildModal } from "./NavBar/components/SelectGuildModal";
import { Dialog } from "@radix-ui/react-dialog";

export const YuugenMusic = () => {
  const { isError: meIsError } = useQuery({
    queryKey: ["getMe"],
    queryFn: async () => axios.get("/api/users/me"),
  });
  const { data: guilds, isLoading } = useQuery({
    queryKey: ["guilds"],
    queryFn: async () => axios.get("/api/guilds/common"),
  });

  return (
    <div className="flex  flex-col w-screen h-screen">
      {meIsError && <LoginModal />}
      <Dialog
        open={
          isLoading ||
          guilds?.data.find(
            (guild) => window.location.pathname.split("/")[1] == guild.id
          )
            ? false
            : true
        }
      >
        <SelectGuildModal />
      </Dialog>
      <NavBar />
      <MusicArea />
    </div>
  );
};
