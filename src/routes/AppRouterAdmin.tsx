import { Route, Routes } from "react-router-dom";
import FilterAdmin from "../components/layout/FilterAdmin";
import Layout from "../components/layout";
import Dashboard from "../pages/Admin/Dashboard";
import AddProduct from "../pages/Admin/AddProduct";
import ProductList from "../pages/Admin/ProductList";
import UpdateProduct from "../pages/Admin/UpdateProduct";
import OrderAdmin from "../pages/Admin/OrderAdmin";

export default function AppRouterAdmin() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout isWightPage={false} isFooter={false} isAdmin={true}>
            <FilterAdmin>
              <Dashboard />
            </FilterAdmin>
          </Layout>
        }
      />
      <Route
        path="/product/add"
        element={
          <Layout isWightPage={false} isFooter={false} isAdmin={true}>
            <FilterAdmin>
              <AddProduct />
            </FilterAdmin>
          </Layout>
        }
      />
      <Route
        path="/product/update/:id"
        element={
          <Layout isWightPage={false} isFooter={false} isAdmin={true}>
            <FilterAdmin>
              <UpdateProduct />
            </FilterAdmin>
          </Layout>
        }
      />
      <Route
        path="/product"
        element={
          <Layout isWightPage={false} isFooter={false} isAdmin={true}>
            <FilterAdmin>
              <ProductList />
            </FilterAdmin>
          </Layout>
        }
      />
      <Route
        path="/orders"
        element={
          <Layout isWightPage={false} isFooter={false} isAdmin={true}>
            <FilterAdmin>
              <OrderAdmin />
            </FilterAdmin>
          </Layout>
        }
      />
    </Routes>
  );
}
