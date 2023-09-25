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
      <div className="flex flex-row h-screen">
        <NavBar />
        <div className="flex flex-col h-full w-full">
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
