import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
// import "primereact/resources/themes/lara-light-indigo/theme.css";
// import "primereact/resources/primereact.min.css";
import "./index.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./styles/main.scss";
import { PrimeReactProvider } from "@primereact/core";
import Aura from "@primeuix/themes/aura";

const theme = {
  preset: Aura,
  options: {
    prefix: "p",
    darkModeSelector: "system",
    cssLayer: false,
    cssVariables: true,
    scoped: false,
  },
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider license="LICENSE_KEY" theme={theme}>
      <App />
    </PrimeReactProvider>
  </StrictMode>,
);
