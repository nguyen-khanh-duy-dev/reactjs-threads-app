import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./i18n/i18n.js";
import "@/styles/index.css";
import { ThemeProvider } from "./components/ThemeProvider/index.jsx";
import { TooltipProvider } from "@/components/ui/tooltip";

// RTK: store and provider
import { persistor, store } from "@/stores";
import { Provider as ProviderRTK } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

console.log(store);

createRoot(document.getElementById("root")).render(
  <ThemeProvider defaultTheme="dark" storageKey="my-app-theme">
    <TooltipProvider>
      <ProviderRTK store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </ProviderRTK>
    </TooltipProvider>
  </ThemeProvider>,
);
