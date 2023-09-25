import { Link } from "react-router-dom";
import { Guild } from "../interfaces";
import { useEffect, useState } from "react";
import axios from "axios";

interface GuildItemProps {
  guild: Guild;
}

const GuildItem = ({ guild }: GuildItemProps) => {
  return (
    <Link
      className="flex flex-row items-center min-h-[5rem] w-[50rem] mb-4 text-white rounded-2xl cursor-pointer hover:bg-gradient-to-r from-yugeenColorSecond to-transparent"
      to={`/${guild.id}/voice`}
    >
      <img
        className="h-16 w-16 ml-4 mr-4 rounded-2xl bg-[#003344]"
        src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`}
      />
      <div className="text-2xl">{guild.name}</div>
    </Link>
  );
};

export const SelectGuild = () => {
  const [guilds, setGuilds] = useState<Guild[]>([]);

  useEffect(() => {
    axios
      .get("/api/user/guilds")
      .then((res) => {
        setGuilds(res.data);
      })
      .catch((err) => {
        if (err.response.status == 401) window.location.href = "/login";
        else console.log(err);
      });
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen font-sans">
      <div className="flex flex-col items-center h-[50vh] text-white">
        <div className="text-[2rem] font-bold mb-4">Select Guild</div>
        <div className="flex flex-col items-center h-[60vh] w-full overflow-y-auto">
          {guilds.map((guild) => (
            <GuildItem key={guild.id} guild={guild} />
          ))}
        </div>
      </div>
    </div>
  );
};
