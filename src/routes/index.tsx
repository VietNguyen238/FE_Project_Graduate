import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Blog from "../pages/Blog";
import StoreSystem from "../pages/StoreSystem";
import Cart from "../pages/Cart";

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
      <Route
        path="/products"
        element={
          <Layout isNavigate={true} isFilter={true}>
            <Product />
          </Layout>
        }
      />
      <Route
        path="/category/:categoryTitle"
        element={
          <Layout isNavigate={true} isFilter={true}>
            <Product />
          </Layout>
        }
      />
      <Route
        path="/blog"
        element={
          <Layout isNavigate={true} isFilter={true}>
            <Blog />
          </Layout>
        }
      />
      <Route
        path="/he-thong-cua-hang"
        element={
          <Layout isNavigate={true} isFilter={true}>
            <StoreSystem />
          </Layout>
        }
      />
      <Route
        path="/cart"
        element={
          <Layout isNavigate={true} isFooter={false}>
            <Cart />
          </Layout>
        }
      />
    </Routes>
  );
}
