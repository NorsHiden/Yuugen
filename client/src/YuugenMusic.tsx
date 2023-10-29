import { MusicArea } from "./MusicArea/MusicArea";
import { NavBar } from "./NavBar/NavBar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import { DiscordLogoIcon } from "@radix-ui/react-icons";

const Login = () => {
  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            It seems like you are not logged in, please login to continue.
          </DialogDescription>
        </DialogHeader>
        <Button variant="default" className="bg-gray-700 gap-2" asChild>
          <a href="api/auth">
            <DiscordLogoIcon />
            <span>Login with Discord</span>
          </a>
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export const YuugenMusic = () => {
  const { isError: meIsError } = useQuery({
    queryKey: ["getMe"],
    queryFn: async () => axios.get("/api/users/me"),
  });

  return (
    <div className="w-screen h-screen">
      {meIsError && <Login />}
      <NavBar />
      <MusicArea />
    </div>
  );
};
