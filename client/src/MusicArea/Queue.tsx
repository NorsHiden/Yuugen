import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import { FiMoreHorizontal } from "react-icons/fi";
import { Button } from "@/components/ui/button";

const Song = () => {
  return (
    <div className="flex items-center justify-between px-4 my-2 h-16 rounded-xl hover:bg-secondary">
      <span className="w-2">1</span>
      <div className="flex lg:w-12 w-24 justify-center">
        <div
          className="w-12 h-12 bg-cover bg-center rounded-md"
          style={{
            backgroundImage:
              "url(https://assets.st-note.com/production/uploads/images/65874918/rectangle_large_type_2_af9cd561c854e2bb6add9896de8ca16f.jpg?width=2000&height=2000&fit=bounds&quality=85)",
          }}
        />
      </div>
      <span className="w-52 truncate overflow-hidden">
        Aaron Smith - Dancin (KRONO Remix) Aaron Smith - Dancin (KRONO Remix)
      </span>
      <span className="hidden md:flex w-48 truncate overflow-hidden">
        TheSoundYouNeed
      </span>
      <span className="hidden md:flex w-24 truncate overflow-hidden">
        04:22
      </span>
      <span className="hidden md:flex w-24 text-xl">
        <TbBrandYoutubeFilled />
      </span>
      <span className="hidden md:flex w-24 truncate overflow-hidden">Nors</span>
      <Button variant="ghost" className="w-12">
        <FiMoreHorizontal />
      </Button>
    </div>
  );
};

export const Queue = () => {
  return (
    <ScrollArea className="h-full rounded-xl whitespace-nowrap">
      <div className="flex sticky top-0 items-center justify-between px-4 my-2 gap-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <span className="w-2">#</span>
        <span className="lg:w-12 w-24">{""}</span>
        <span className="w-52">Title</span>
        <span className="hidden md:flex w-48">Author</span>
        <span className="hidden md:flex w-24">Duration</span>
        <span className="hidden md:flex w-24">Platform</span>
        <span className="hidden md:flex w-24">Requested By</span>
        <span className="w-12">{""}</span>
      </div>
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
