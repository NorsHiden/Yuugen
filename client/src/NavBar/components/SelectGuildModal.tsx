import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export const SelectGuildModal = () => {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Select a Guild</DialogTitle>
        <DialogDescription>Select a guild below to continue.</DialogDescription>
      </DialogHeader>
      <ScrollArea className="h-60 w-full rounded-md border p-4">
        <Button
          variant="ghost"
          className="justify-start w-full overflow-hidden"
        >
          <Avatar className="flex w-8 h-8">
            <AvatarImage
              src="https://cdn.discordapp.com/icons/468511937907523615/7a8d10a6aa8fb5c0255472384db99175.png?size=1024"
              alt="Legends Never Die"
            />
            <AvatarFallback>F</AvatarFallback>
          </Avatar>
          <span className="ml-2 font-normal truncate">Legends Never Die</span>
        </Button>
      </ScrollArea>
    </DialogContent>
  );
};
