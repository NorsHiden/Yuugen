import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import { DiscordLogoIcon } from "@radix-ui/react-icons";

export const LoginModal = () => {
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
