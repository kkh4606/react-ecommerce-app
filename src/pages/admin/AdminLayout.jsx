import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";

import SideBar from "../../componments/SideBar";

export default function AdminLayout() {
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
}
