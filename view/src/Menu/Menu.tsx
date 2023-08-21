import { BiChevronDown } from "react-icons/bi";
import { TbNotification } from "react-icons/tb";
import { useEffect } from "react";
import axios from "axios";
import "./m-styles.css";
import { Guild } from "../interfaces";

interface GuildItemProps {
  guild: Guild;
}

const GuildItem = ({ guild }: GuildItemProps) => {
  return (
    <div
      className="guild-list-item"
      onClick={() => window.location.replace(`/${guild.id}/voice`)}
    >
      <img
        className="selected-guild-pic"
        src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
      />
      <div className="selected-guild-title">{guild.name}</div>
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
  useEffect(() => {
    axios.get("/api/user/guilds").then((res) => {
      const currentGuildId = window.location.pathname.split("/")[1];
      if (!currentGuildId) return window.location.replace("/selectGuild");
      const currentGuild = res.data.find(
        (guild: Guild) => guild.id === currentGuildId
      );
      if (!currentGuild) return window.location.replace("/selectGuild");
      currentGuildState.setCurrentGuild(currentGuild);
      guildsState.setGuilds(res.data);
    });
  }, []);

  return (
    <div className="menu">
      <div className="select-guild" tabIndex={0}>
        <div className="selected-guild">
          {currentGuildState.currentGuild ? (
            <>
              <img
                className="selected-guild-pic"
                src={`https://cdn.discordapp.com/icons/${currentGuildState.currentGuild.id}/${currentGuildState.currentGuild.icon}.png`}
              />
              <div className="selected-guild-title">
                {currentGuildState.currentGuild.name}
              </div>
            </>
          ) : (
            <>
              <div className="selected-guild-title">Select a guild...</div>
            </>
          )}

          <BiChevronDown size="16" className="selected-guild-icon" />
        </div>
        <div className="guild-list">
          {guildsState.guilds.map((guild) => (
            <GuildItem key={guild.id} guild={guild} />
          ))}
        </div>
      </div>
      <div className="menu-profile">
        <TbNotification size="32" className="menu-notification" />
        <div className="menu-profile-highlight">
          <div className="menu-profile-pic"></div>
        </div>
      </div>
    </div>
  );
};
