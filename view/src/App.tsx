import { NavBar } from "./NavBar/NavBar";
import { Menu } from "./Menu/Menu";
import { MusicController } from "./MusicController/MusicController";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Guild } from "./interfaces";

export const App = () => {
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [currentGuild, setCurrentGuild] = useState<Guild | null>(null);

  return (
    <div>
      <div className="container">
        <NavBar />
        <div className="sub-container">
          <Menu
            guildsState={{ guilds, setGuilds }}
            currentGuildState={{ currentGuild, setCurrentGuild }}
          />
          <Routes>
            <Route
              path=":id/voice"
              element={<MusicController currentGuild={currentGuild} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};
