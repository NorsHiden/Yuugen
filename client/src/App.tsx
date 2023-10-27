import { ThemeProvider } from "@/components/theme-provider";
import { MusicArea } from "./MusicArea/MusicArea";
import NavBar from "./NavBar/NavBar";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <NavBar />
      <MusicArea />
    </ThemeProvider>
  );
}

export default App;
