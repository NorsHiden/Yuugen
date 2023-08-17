import { NavBar } from "./NavBar/NavBar";
import { Menu } from "./Menu/Menu";
import { MusicController } from "./MusicController/MusicController";
import { Route, Routes } from "react-router-dom";

export const App = () => {
  return (
    <div>
      <div className="container">
        <NavBar />
        <div className="sub-container">
          <Menu />
          <Routes>
            <Route path=":id/voice" element={<MusicController />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
