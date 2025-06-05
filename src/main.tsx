import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { FilterProvider } from "./context/FilterContext.tsx";
import { NavigateProvider } from "./context/NavigateContext.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { env } from "./config/env.ts";
import { Provider } from "react-redux";
import store from "./store";
import { OrderProvider } from "./context/OrderContext.tsx";

const clientId = env.GG_CLIENT_ID;

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={clientId}>
      <OrderProvider>
        <NavigateProvider>
          <FilterProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </FilterProvider>
        </NavigateProvider>
      </OrderProvider>
    </GoogleOAuthProvider>
  </Provider>
);
