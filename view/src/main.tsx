import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./Login/Login";
import { App } from "./App";
import "./index.css";

const SelectGuild = () => {
  return <div>Select Guild</div>;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<LoginPage />} />
        <Route path="selectGuild" element={<SelectGuild />} />
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </>
);
