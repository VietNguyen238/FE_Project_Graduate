import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { FilterProvider } from "./context/FilterContext.tsx";
import { NavigateProvider } from "./context/NavigateContext.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { env } from "./env/index.ts";

const clientId = env.GG_CLIENT_ID;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <NavigateProvider>
        <FilterProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </FilterProvider>
      </NavigateProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
