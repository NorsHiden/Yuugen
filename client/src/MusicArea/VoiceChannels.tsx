import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Replace, Unplug, Volume2 } from "lucide-react";

export const VoiceChannels = () => {
  return (
    <div className="w-full p-4 border rounded-2xl max-md:min-w-fit h-40">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Volume2 />
          <h2 className="text-xl font-bold tracking-tight">Voice Channels</h2>
        </div>
        <div className="flex flex-row">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost">
                <Replace />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  <h2 className="text-xl font-bold tracking-tight">
                    Voice Channels
                  </h2>
                </DialogTitle>
                <DialogClose />
              </DialogHeader>
              <Separator />
              <ScrollArea className="h-72 rounded-md">
                <Button
                  variant="ghost"
                  className="flex w-full justify-start items-center gap-2"
                >
                  <Volume2 />
                  <h3 className="text-lg font-bold">🌍︱Publić</h3>
                </Button>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex items-center w-full bg-secondary p-2 rounded-lg mt-4 justify-between">
        <div className="flex items-center gap-2 ml-4">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <h3 className="text-lg font-bold">🌍︱Publić</h3>
        </div>
        <Button variant="ghost" size="icon" className="hover:bg-destructive">
          <Unplug />
        </Button>
      </div>
    </div>
  );
};
