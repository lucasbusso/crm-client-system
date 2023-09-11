import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { Client, ClientEdit } from "../interfaces/form.interface";

type ContextProps = {
  clients: Client[];
  setClients: Dispatch<SetStateAction<Client[]>>;
  isEditing: string | undefined;
  setIsEditing: Dispatch<SetStateAction<string | undefined>>;
  updateClient: (client: ClientEdit) => void;
};

const ClientContext = createContext<ContextProps | null>(null);

export const ClientProvider: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isEditing, setIsEditing] = useState<string | undefined>("");

  const updateClient = (updatedClient: ClientEdit) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === updatedClient.id
          ? { ...client, ...updatedClient }
          : client
      )
    );
  };

  const value: ContextProps = {
    clients,
    setClients,
    isEditing,
    setIsEditing,
    updateClient,
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
