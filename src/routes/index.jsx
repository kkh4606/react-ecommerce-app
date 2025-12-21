import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../pages/App.jsx";
import Layout from "../componments/Layout.jsx";
import ProductDetail from "../pages/ProductDetail.jsx";
import Notfound from "../componments/Notfound.jsx";
import Register from "../componments/Register.jsx";
import Login from "../componments/Login.jsx";
import Checkout from "../componments/Checkout.jsx";
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
        path: "*",
        Component: Notfound,
      },
    ],
  },
]);
export default router;
