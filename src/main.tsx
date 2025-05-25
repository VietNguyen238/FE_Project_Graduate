import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { FilterProvider } from "./context/FilterContext.tsx";
import { NavigateProvider } from "./context/NavigateContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NavigateProvider>
      <FilterProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FilterProvider>
    </NavigateProvider>
  </StrictMode>
);
