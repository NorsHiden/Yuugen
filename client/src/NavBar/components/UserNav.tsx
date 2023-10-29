import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, Settings2 } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { SelectGuild } from "./SelectGuild";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

export const UserNav = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["getMe"],
    queryFn: async () => axios.get("/api/users/me"),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={isError || isLoading ? true : false}
        asChild
      >
        <Button variant="ghost" className="relative h-8 w-8 rounded-full mr-4">
          {isError || isLoading ? (
            <Skeleton className="h-8 w-8 rounded-full" />
          ) : (
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={`https://cdn.discordapp.com/avatars/${data?.data.id}/${data?.data.avatar}`}
                alt={data?.data.username}
              />
              <AvatarFallback>{data?.data.username[0]}</AvatarFallback>
            </Avatar>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="flex font-normal">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={`https://cdn.discordapp.com/avatars/${data?.data.id}/${data?.data.avatar}`}
              alt={data?.data.username}
            />
            <AvatarFallback>{data?.data.username[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1 ml-2">
            <p className="text-sm font-medium leading-none">
              {data?.data.global_name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {data?.data.username}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <SelectGuild />
        <ModeToggle />
        <Button variant="ghost" className="justify-start w-full">
          <Settings2 />
          <span className="ml-2">Settings</span>
        </Button>
        <DropdownMenuSeparator />
        <Button variant="ghost" className="justify-start w-full" asChild>
          <a href="api/auth/logout">
            <LogOut />
            <span className="ml-2">Logout</span>
          </a>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
