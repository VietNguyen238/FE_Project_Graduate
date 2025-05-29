import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Blog from "../pages/Blog";
import StoreSystem from "../pages/StoreSystem";
import Cart from "../pages/Cart";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ProductDetail from "../pages/ProductDetail";
import Shipping from "../pages/Shipping";
import Checkout from "../pages/Checkout";
import CheckPayment from "../pages/CheckPayment";

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
        path="/product/:id"
        element={
          <Layout isNavigate={true} isFilter={true}>
            <ProductDetail />
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
      <Route
        path="/register"
        element={
          <Layout isNavigate={true} isFooter={false}>
            <Register />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout isNavigate={true} isFooter={false}>
            <Login />
          </Layout>
        }
      />
      <Route
        path="/checkout"
        element={
          <Layout isNavigate={true} isFooter={false}>
            <Checkout />
          </Layout>
        }
      />
      <Route
        path="/checkout/shipping"
        element={
          <Layout isNavigate={true} isFooter={false}>
            <Shipping />
          </Layout>
        }
      />
      <Route
        path="/payment"
        element={
          <Layout isNavigate={true} isFooter={false}>
            <CheckPayment />
          </Layout>
        }
      />
    </Routes>
  );
}
