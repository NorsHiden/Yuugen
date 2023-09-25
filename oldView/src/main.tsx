import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./Login/Login";
import { App } from "./App";
import "./index.css";
import { SelectGuild } from "./SelectGuild/SelectGuild";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/Login" element={<LoginPage />} />
      <Route path="selectGuild" element={<SelectGuild />} />
      <Route path="/*" element={<App />} />
    </Routes>
  </BrowserRouter>
);
