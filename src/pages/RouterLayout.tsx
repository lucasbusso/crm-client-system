import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { NavbarComponent, Notification } from "../components";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { getCookie } from "../utils";
import { useNotificationContext, useUpdateContext } from "../context";
import EditModalComponent from "../components/EditModalComponent";

export const RouterLayout: React.FC<{}> = () => {
  const [, setCookie, remove] = useCookies();
  const { isExpired, accessToken } = useAppSelector(
    (state) => state.authReducer
  );
  const isTokenStored = getCookie("accessToken");
  const { message, statusColor } = useNotificationContext();
  const { clientUpdate } = useUpdateContext();

  useEffect(() => {
    if (accessToken && !isTokenStored) {
      setCookie("accessToken", accessToken, { sameSite: "strict" });
    }
  }, [accessToken]);

  useEffect(() => {
    if (isExpired) {
      remove("accessToken");
    }
  }, [isExpired]);

  return (
    <div className="h-[98vh]">
      <NavbarComponent />
      <Outlet />
      {message && <Notification message={message} statusColor={statusColor} />}
      {clientUpdate && <EditModalComponent />}
    </div>
  );
};
