import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

export const PrivateRoute: React.FC<{}> = () => {
  const { isAuth } = useAppSelector((state) => state.authReducer);

  return !isAuth ? <Navigate to="/login" /> : <Outlet />;
};
