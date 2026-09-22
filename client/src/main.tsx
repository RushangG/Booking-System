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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider license="LICENSE_KEY">
      <App />
    </PrimeReactProvider>
  </StrictMode>,
);
