import React from "react";
import { NavbarComponent } from "../components";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

export const RouterLayout: React.FC<{}> = () => {
  const { isAuth } = useAppSelector((state) => state.authReducer);
  return isAuth ? (
    <>
      <NavbarComponent />
      <Outlet />
    </>
  ) : (
    <>
      <Navigate to="/login" />
      <NavbarComponent />
      <Outlet />
    </>
  );
};
