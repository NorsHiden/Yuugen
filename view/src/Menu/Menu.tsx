import { BiChevronDown } from "react-icons/bi";
import { TbNotification } from "react-icons/tb";
import { useEffect, useState } from "react";
import axios from "axios";
import { Guild } from "../interfaces";

interface GuildItemProps {
  guild: Guild;
}

const GuildItem = ({ guild }: GuildItemProps) => {
  return (
    <div
      className="flex flex-row items-center min-h-[1.7rem] min-w-full cursor-pointer hover:bg-gradient-to-r hover:from-yuugenColorSecond hover:to-transparent rounded-s-md"
      onClick={() => window.location.replace(`/${guild.id}/voice`)}
    >
      <img
        className="ml-1 w-4 h-4 rounded-2xl bg-yuugenColorFirst"
        src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
      />
      <div className="ml-2">{guild.name}</div>
    </div>
  );
};

interface MenuProps {
  guildsState: {
    guilds: Guild[];
    setGuilds: (guilds: Guild[]) => void;
  };
  currentGuildState: {
    currentGuild: Guild | null;
    setCurrentGuild: (guild: Guild) => void;
  };
}

export const Menu = ({ guildsState, currentGuildState }: MenuProps) => {
  const [user, setUser] = useState<any>({});
  useEffect(() => {
    axios
      .get("/api/user/guilds")
      .then((res) => {
        const currentGuildId = window.location.pathname.split("/")[1];
        if (!currentGuildId) return window.location.replace("/selectGuild");
        const currentGuild = res.data.find(
          (guild: Guild) => guild.id === currentGuildId
        );
        if (!currentGuild) return window.location.replace("/selectGuild");
        currentGuildState.setCurrentGuild(currentGuild);
        guildsState.setGuilds(res.data);
      })
      .catch((err) => {
        if (err.response.status == 401) window.location.href = "/login";
        else console.log(err);
      });

    axios.get("/api/user/me").then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
    <div className="flex flex-row items-center min-h-[2rem] pt-1">
      <div
        className="group flex absolute flex-col text-xs text-[#d3a78a] bg-yuugenBackgroundColor font-sans border-solid border-[1px] rounded-2xl w-52 max-h-7 min-h-7 top-3 duration-200 border-yuugenColorFirst focus:max-h-40 focus:rounded-b-md focus:rounded-t-2xl"
        tabIndex={0}
      >
        <div className="flex flex-row items-center min-h-[1.7rem] min-w-full cursor-pointer">
          {currentGuildState.currentGuild ? (
            <>
              <img
                className="ml-1 w-4 h-4 rounded-2xl bg-yuugenColorFirst"
                src={`https://cdn.discordapp.com/icons/${currentGuildState.currentGuild.id}/${currentGuildState.currentGuild.icon}.png`}
              />
              <div className="ml-2">{currentGuildState.currentGuild.name}</div>
            </>
          ) : (
            <>
              <div className="ml-2">Select a guild...</div>
            </>
          )}

          <BiChevronDown
            size="16"
            className="ml-auto mr-2 duration-500 group-focus:rotate-180"
          />
        </div>
        <div className="hidden flex-col grap-[0.3rem] max-h-80 overflow-auto p-2 group-focus:flex">
          {guildsState.guilds.map((guild) => (
            <GuildItem key={guild.id} guild={guild} />
          ))}
        </div>
      </div>
      <div className="flex flex-row items-center ml-auto mr-4 mt-1 cursor-pointer">
        <TbNotification className="text-yuugenColorSecond pr-4 text-5xl" />
        <div className="flex items-center justify-center bg-gradient-to-b from-yuugenColorThird to-yuugenColorFirst rounded-xl w-9 h-9">
          <img
            className="rounded-xl w-8 h-8 border-solid border-2 border-yuugenBackgroundColor"
            src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}
          />
        </div>
      </div>
    </div>
  );
};
