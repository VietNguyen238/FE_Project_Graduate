import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "../components/layout";
import Home from "../pages/Home";

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout isNavigate={true} isFilter={true}>
            <Home />
          </Layout>
        }
      />
    </Routes>
  );
}
