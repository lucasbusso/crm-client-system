import React, { createContext, useContext, useState, useEffect } from "react";
import { NotificationProps } from "../interfaces/form.interface";

const NotificationContext = createContext<NotificationProps | null>(null);

export const NotificationProvider: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [statusColor, setStatusColor] = useState<"danger" | "success">(
    "danger"
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMessage(undefined);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message]);

  const value: NotificationProps = {
    message,
    setMessage,
    statusColor,
    setStatusColor,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("No notification context");
  } else {
    return context;
  }
};
