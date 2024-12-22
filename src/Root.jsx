import React from "react";
import { Outlet } from "react-router";
import Footer from "./component/Footer";
import NavBar from "./component/NavBar";

export default function Root() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}
