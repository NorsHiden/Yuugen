import { useEffect, useState } from "react";
import { BiChevronDown, BiLogOut } from "react-icons/bi";
import { BsFillMoonStarsFill, BsToggleOn } from "react-icons/bs";
import { TbStatusChange } from "react-icons/tb";

const DropDownProfile = ({ guilds }: any) => {
  const [currentGuild, setCurrentGuild] = useState<any>({});
  useEffect(() => {
    if (!guilds) return;
    const currentGuild = guilds.find(
      (guild: any) => guild.id === window.location.pathname.slice(1)
    );
    if (!currentGuild) return;
    setCurrentGuild(currentGuild);
  }, [guilds]);
  return (
    <div
      className="flex flex-col justify-center absolute z-30 h-0 opacity-0 pointer-events-none w-80 gap-2
                bg-yuugenColorSecond overflow-hidden top-14 translate-x-[-0.5rem] p-2 rounded-lg transition-all
                group-focus:h-44 group-focus:opacity-100 group-focus:pointer-events-auto"
    >
      <div className="flex h-12 items-center rounded-lg bg-yuugenColorFirst brightness-75 hover:brightness-100">
        <img
          src={
            currentGuild.icon
              ? `https://cdn.discordapp.com/icons/${currentGuild.id}/${currentGuild.icon}`
              : "https://cdn.discordapp.com/embed/avatars/0.png"
          }
          className="w-10 h-10 mx-2 rounded-lg"
        />
        <p className="font-gilroyBold text-base text-yuugenColorSecond">
          {currentGuild.name}
        </p>
        <div className="ml-auto mr-4 text-xl text-yuugenColorSecond ">
          <TbStatusChange />
        </div>
      </div>
      <div className="flex items-center p-2 h-12 brightness-75 hover:brightness-100">
        <div className="text-xl">
          <BsFillMoonStarsFill />
        </div>
        <p className="text-sm pl-2">Dark Mode</p>
        <div className="ml-auto mr-2">
          <BsToggleOn />
        </div>
      </div>
      <div
        onClick={() => (window.location.href = "/api/oauth/logout")}
        className="flex items-center p-2 h-12 brightness-75 hover:brightness-100"
      >
        <div className="text-xl">
          <BiLogOut />
        </div>
        <p className="text-sm pl-2">Logout</p>
      </div>
    </div>
  );
};

const Profile = ({ user, guilds }: any) => {
  return (
    <div
      tabIndex={1}
      className="flex group relative ml-auto items-center mr-4 px-2 w-80 h-12 rounded-lg cursor-pointer hover:bg-yuugenColorSecond focus:bg-yuugenColorSecond"
    >
      <div className="flex w-full items-center">
        <img
          className="h-10 w-10 bg-gray-500 rounded-lg"
          src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
        />
        <p className="ml-2 text-neutral-400 text-lg font-gilroyBold">
          {user.global_name}
        </p>
        <div className="flex ml-auto text-neutral-400">
          <BiChevronDown />
        </div>
      </div>
      <DropDownProfile guilds={guilds} />
    </div>
  );
};

export const NavBar = ({ user, guilds }: any) => {
  return (
    <div className="flex items-center w-full h-20 pl-4 text-white text-2xl">
      <h1 className="font-gilroyBold">
        Yuugen<span className="text-yuugenColorFirst">Music</span>
      </h1>
      {user ? (
        <Profile user={user} guilds={guilds} />
      ) : (
        <div className="flex ml-auto items-center mr-4 px-2 w-80 h-12 animate-pulse">
          <div className="flex w-full items-center">
            <div className="h-10 w-10 bg-yuugenColorSecond rounded-lg" />
            <div className="ml-2 w-20 h-4 bg-yuugenColorSecond rounded-lg"></div>
          </div>
        </div>
      )}
    </div>
  );
};
