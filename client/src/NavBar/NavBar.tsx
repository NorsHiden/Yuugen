import { SelectGuild } from "./components/SelectGuild";
import { UserNav } from "./components/UserNav";

const NavBar = () => {
  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex w-screen justify-between items-center h-14">
        <SelectGuild />
        <h1>YuugenMusic</h1>
        <UserNav />
      </div>
    </div>
  );
};

export default NavBar;
