import React, { createContext, useContext, useState, useEffect } from "react";
import { Client, ClientEdit, ContextProps } from "../interfaces/form.interface";
import {
  deleteLocalStorageClient,
  retrieveClientsFromLocalStorage,
  setLocalStorageClient,
} from "../utils";

const ClientContext = createContext<ContextProps | null>(null);

export const ClientProvider: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [clientId, setClientId] = useState<string | undefined>("");

  const emptyClient: Client = {
    name: "",
    business: "",
    email: "",
    date: "",
    description: "",
    id: "",
    modifiedDate: "",
  };

  useEffect(() => {
    const clientsFromLocalStorage = retrieveClientsFromLocalStorage();
    setClients(clientsFromLocalStorage);
  }, []);

  const updateClient = (updatedClient: ClientEdit) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === updatedClient.id
          ? { ...client, ...updatedClient }
          : client
      )
    );
    setLocalStorageClient(updatedClient);
  };

  const deleteClient = (clientId: string | undefined) => {
    setClients((prevClients) =>
      prevClients.filter((client) => client.id !== clientId)
    );
    deleteLocalStorageClient(clientId!);
  };

  const value: ContextProps = {
    clients,
    setClients,
    clientId,
    setClientId,
    updateClient,
    emptyClient,
    deleteClient,
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
