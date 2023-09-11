import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { Client, ClientEdit, FormValues } from "../interfaces/form.interface";

type ContextProps = {
  clients: Client[];
  setClients: Dispatch<SetStateAction<Client[]>>;
  clientId: string | undefined;
  setClientId: Dispatch<SetStateAction<string | undefined>>;
  updateClient: (client: ClientEdit) => void;
  emptyClient: FormValues;
};

const ClientContext = createContext<ContextProps | null>(null);

export const ClientProvider: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [clientId, setClientId] = useState<string | undefined>("");
  const emptyClient = {
    name: "",
    business: "",
    email: "",
    date: "",
    description: "",
    id: "",
    modifiedDate: "",
  };

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
    clientId,
    setClientId,
    updateClient,
    emptyClient,
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
