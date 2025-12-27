import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../pages/App.jsx";
import Layout from "../componments/Layout.jsx";
import ProductDetail from "../pages/ProductDetail.jsx";
import Notfound from "../componments/Notfound.jsx";
import Register from "../componments/Register.jsx";
import Login from "../componments/Login.jsx";
import Checkout from "../componments/Checkout.jsx";
import Test from "../componments/Test.jsx";
import Orders from "../pages/Orders.jsx";
import AdminLayout from "../pages/admin/AdminLayout.jsx";
import AdminProductCreate from "../pages/admin/AdminProductCreate.jsx";
import AdminProducts from "../pages/admin/AdminProducts.jsx";
import AdminOrderList from "../pages/admin/AdminOrderList.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/",
        Component: App,
      },
      { path: "/products/:id", Component: ProductDetail },
      {
        path: "/profile",
        Component: () => <div>Profile Page</div>,
      },

      {
        path: "/register",
        Component: Register,
      },

      {
        path: "/login",
        Component: Login,
      },

      {
        path: "/checkout",
        Component: Checkout,
      },

      {
        path: "/orders",
        Component: Orders,
      },
      {
        path: "/test",
        Component: Test,
      },
      {
        path: "*",
        Component: Notfound,
      },
    ],
  },
  {
    path: "/admin",
    Component: () => {
      let isLoggedIn = localStorage.getItem("token");
      return isLoggedIn ? <AdminLayout /> : <Navigate to={"/login"} />;
    },
    children: [
      {
        path: "orders",
        Component: AdminOrderList,
      },
      {
        path: "products",
        Component: AdminProducts,
      },
      {
        path: "products/create",
        Component: AdminProductCreate,
      },

      {
        path: "products/edit/:id",
        Component: AdminProductCreate,
      },
    ],
  },
]);
export default router;
