import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.jsx";
import { AuthContexProvider } from "./contexts/AuthContext.jsx";
import { CartContextProvider } from "./contexts/CartContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContexProvider>
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
    </AuthContexProvider>
  </StrictMode>
);
