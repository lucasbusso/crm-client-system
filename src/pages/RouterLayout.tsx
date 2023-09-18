import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { NavbarComponent } from "../components";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

export const RouterLayout: React.FC<{}> = () => {
  const [, setCookie, remove] = useCookies();
  const { isAuth, isExpired, accessToken } = useAppSelector(
    (state) => state.authReducer
  );

  useEffect(() => {
    if (accessToken) {
      setCookie("accessToken", accessToken, { sameSite: "strict" });
    }
  }, [accessToken]);

  useEffect(() => {
    if (isExpired) {
      remove("accessToken");
    }
  }, [isExpired]);

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
