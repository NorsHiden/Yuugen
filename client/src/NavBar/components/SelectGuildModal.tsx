import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const SelectGuildModal = () => {
  const { data: guilds } = useQuery({
    queryKey: ["guilds"],
    queryFn: async () => axios.get("/api/guilds/common"),
  });
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Select a Guild</DialogTitle>
        <DialogDescription>Select a guild below to continue.</DialogDescription>
      </DialogHeader>
      <ScrollArea className="h-60 w-full rounded-md border p-4">
        {guilds?.data.map((guild) => (
          <Button
            variant="ghost"
            className="justify-start w-full overflow-hidden"
            key={guild.id}
            asChild
          >
            <a href={guild.id}>
              <Avatar className="flex w-8 h-8">
                <AvatarImage src={guild.iconURL} />
                <AvatarFallback>guild.name[0]</AvatarFallback>
              </Avatar>
              <span className="ml-2 font-normal truncate">{guild.name}</span>
            </a>
          </Button>
        ))}
      </ScrollArea>
    </DialogContent>
  );
};
