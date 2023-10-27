import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { SelectGuildModal } from "./SelectGuildModal";

export const SelectGuild = () => {
  return (
    <div className="ml-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-[200px] justify-between">
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="truncate">Select a Guild...</span>
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DialogTrigger>
        <SelectGuildModal />
      </Dialog>
    </div>
  );
};
