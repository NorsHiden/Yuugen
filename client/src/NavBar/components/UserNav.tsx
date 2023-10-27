import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, Settings2, User } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export const UserNav = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full mr-4">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="https://cdn.discordapp.com/avatars/225682077134094336/2e5012cc18f9de1273d3f7a94bc80ef1"
              alt="Nors"
            />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="flex font-normal">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="https://cdn.discordapp.com/avatars/225682077134094336/2e5012cc18f9de1273d3f7a94bc80ef1"
              alt="Nors"
            />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1 ml-2">
            <p className="text-sm font-medium leading-none">Nors</p>
            <p className="text-xs leading-none text-muted-foreground">nors_</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Button variant="ghost" className="justify-start w-full">
          <User />
          <span className="ml-2">Profile</span>
        </Button>
        <ModeToggle />
        <Button variant="ghost" className="justify-start w-full">
          <Settings2 />
          <span className="ml-2">Settings</span>
        </Button>
        <DropdownMenuSeparator />
        <Button variant="ghost" className="justify-start w-full">
          <LogOut />
          <span className="ml-2">Logout</span>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
