import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./i18n/i18n.js";
import "@/styles/index.css";
import { ThemeProvider } from "./components/ThemeProvider/index.jsx";
import { TooltipProvider } from "@/components/ui/tooltip";

createRoot(document.getElementById("root")).render(
  <ThemeProvider defaultTheme="dark" storageKey="my-app-theme">
    <TooltipProvider>
      <App />
    </TooltipProvider>
  </ThemeProvider>,
);
