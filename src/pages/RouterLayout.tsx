import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { NavbarComponent, Notification } from "../components";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { getCookie } from "../utils";
import { useNotificationContext } from "../context/notification.context";

export const RouterLayout: React.FC<{}> = () => {
  const [, setCookie, remove] = useCookies();
  const { isExpired, accessToken } = useAppSelector(
    (state) => state.authReducer
  );
  const isTokenStored = getCookie("accessToken");
  const { message, statusColor } = useNotificationContext();

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
    </div>
  );
};
