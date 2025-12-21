import NavBar from "./NavBar";
import { Outlet } from "react-router";

function Layout() {
  return (
    <>
      <NavBar filterProductsBySearch={() => console.log("Hello World")} />
      <Outlet />
    </>
  );
}

export default Layout;
