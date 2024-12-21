import React from "react";
import { Outlet } from "react-router";
import NavBar from "./component/headers/NavBar";

export default function Root() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}
