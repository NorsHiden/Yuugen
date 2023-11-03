import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { SelectGuildModal } from "./SelectGuildModal";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const SelectGuild = () => {
  const { data: guilds } = useQuery({
    queryKey: ["guilds"],
    queryFn: async () => axios.get("/api/guilds/common"),
  });
  const currentGuild = guilds?.data.find(
    (guild) => window.location.pathname.split("/")[1] == guild.id
  );

  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className={`w-full justify-between`}>
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage src={currentGuild?.iconURL} />
              <AvatarFallback>{currentGuild?.name[0]}</AvatarFallback>
            </Avatar>
            <span className="truncate">{currentGuild?.name}</span>
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DialogTrigger>
        <SelectGuildModal />
      </Dialog>
    </div>
  );
};
