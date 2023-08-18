import { BiChevronDown } from "react-icons/bi";
import { TbNotification } from "react-icons/tb";
import { useEffect, useState } from "react";
import axios from "axios";
import "./m-styles.css";

interface Guild {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: number;
  features: string[];
  permissions_new: string;
}

interface GuildItemProps {
  guild: Guild;
  setSelectedGuild: (guild: Guild) => void;
  setTabIndex: (index: number) => void;
}

const GuildItem = ({
  guild,
  setSelectedGuild,
  setTabIndex,
}: GuildItemProps) => {
  return (
    <div
      className="guild-list-item"
      onClick={() => {
        setSelectedGuild(guild);
        setTabIndex(-1);
      }}
    >
      <img
        className="selected-guild-pic"
        src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
      />
      <div className="selected-guild-title">{guild.name}</div>
    </div>
  );
};

export const Menu = () => {
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [selectedGuild, setSelectedGuild] = useState<Guild | null>(null);
  const [tabIndex, setTabIndex] = useState<number>(0);

  useEffect(() => {
    axios.get("/api/user/guilds").then((res) => {
      setGuilds(res.data);
    });
  }, []);

  return (
    <div className="menu">
      <div className="select-guild" tabIndex={tabIndex}>
        <div className="selected-guild">
          {selectedGuild ? (
            <>
              <img
                className="selected-guild-pic"
                src={`https://cdn.discordapp.com/icons/${selectedGuild.id}/${selectedGuild.icon}.png`}
              />
              <div className="selected-guild-title">{selectedGuild.name}</div>
            </>
          ) : (
            <>
              <div className="selected-guild-title">Select a guild...</div>
            </>
          )}

          <BiChevronDown size="16" className="selected-guild-icon" />
        </div>
        <div className="guild-list">
          {guilds.map((guild) => (
            <GuildItem
              key={guild.id}
              guild={guild}
              setSelectedGuild={setSelectedGuild}
              setTabIndex={setTabIndex}
            />
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
