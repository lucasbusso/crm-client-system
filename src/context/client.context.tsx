import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { Client } from "../interfaces/form.interface";

type ContextProps = {
  clients: Client[];
  setClients: Dispatch<SetStateAction<Client[]>>;
  isEditing: string;
  setIsEditing: Dispatch<SetStateAction<string>>;
};

const ClientContext = createContext<ContextProps | null>(null);

export const ClientProvider: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isEditing, setIsEditing] = useState<string>("");
  const value: ContextProps = {
    clients,
    setClients,
    isEditing,
    setIsEditing,
  };
  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  );
};

export const useClientContext = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("No context");
  } else {
    return context;
  }
};
