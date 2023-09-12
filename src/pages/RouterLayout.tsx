import React from "react";
import { NavbarComponent } from "../components";
import { Outlet } from "react-router-dom";

export const RouterLayout: React.FC<{}> = () => {
  return (
    <>
      <NavbarComponent />
      <Outlet />
    </>
  );
};
