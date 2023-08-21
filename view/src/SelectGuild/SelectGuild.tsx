import { Link } from "react-router-dom";
import { Guild } from "../interfaces";
import "./sg-styles.css";
import { useEffect, useState } from "react";
import axios from "axios";

interface GuildItemProps {
  guild: Guild;
}

const GuildItem = ({ guild }: GuildItemProps) => {
  return (
    <Link className="selectguild-item" to={`/${guild.id}/voice`}>
      <img
        className="selectguild-item-pic"
        src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`}
      />
      <div className="selectguild-item-name">{guild.name}</div>
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
    <div className="selectguild-vp">
      <div className="selectguild-container">
        <div className="selectguild-title">Select Guild</div>
        <div className="selectguild-list">
          {guilds.map((guild) => (
            <GuildItem key={guild.id} guild={guild} />
          ))}
        </div>
      </div>
    </div>
  );
};
