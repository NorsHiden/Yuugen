import { UserNav } from "./components/UserNav";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Search } from "./components/Search";
import { Song } from "@/lib/types/MusicUpdate";

export const NavBar = ({ queue }: { queue: Song[] }) => {
  const { isError, isLoading } = useQuery({
    queryKey: ["getMe"],
    queryFn: async () => axios.get("/api/users/me"),
  });

  return (
    <div className="flex sticky top-0 z-50 h-14 items-center justify-between w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <h2 className="ml-4 text-xl font-bold tracking-tight">
        Yuugen<span className="text-primary">Music</span>
      </h2>
      <div className="flex items-center gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              disabled={isError || isLoading ? true : false}
            >
              <PlusCircledIcon className="mr-2 h-4 w-4" />
              Add music
            </Button>
          </DialogTrigger>
          <Search queue={queue} />
        </Dialog>
        <UserNav />
      </div>
    </div>
  );
};
