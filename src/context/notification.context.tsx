import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  useEffect,
} from "react";

type NotificationContext = {
  message: string | undefined;
  setMessage: (message: string | undefined) => void;
  statusColor: "danger" | "success";
  setStatusColor: Dispatch<SetStateAction<"danger" | "success">>;
};

const NotificationContext = createContext<NotificationContext | null>(null);

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

  const value: NotificationContext = {
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
