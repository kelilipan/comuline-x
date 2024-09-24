import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SWRConfig } from "swr";
import App from "./App.tsx";
import "./styles/global.css";
import fetcher from "./lib/fetcher.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        errorRetryCount: 5,
        fetcher,
      }}
    >
      <App />
    </SWRConfig>
  </StrictMode>
);
