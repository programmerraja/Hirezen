import { ThemeProvider } from "./components/theme-provider";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="interview-pro-theme">
      <LandingPage />
    </ThemeProvider>
  );
}

export default App;
