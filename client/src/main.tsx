import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from "@primereact/core";
import Aura from "@primeuix/themes/aura";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./styles/main.scss";
import "./index.css";
import App from "./App.tsx";


const theme = {
  preset: Aura,
  options: {
    prefix: "p",
    darkModeSelector: "none",
    cssLayer: false,
    cssVariables: true,
    scoped: false,
  },
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider  theme={theme}>
      <App />
    </PrimeReactProvider>
  </StrictMode>,
);
