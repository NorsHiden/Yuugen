import { ThemeProvider } from "@/components/theme-provider";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { YuugenMusic } from "./YuugenMusic";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <YuugenMusic />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
