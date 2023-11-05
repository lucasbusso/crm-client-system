import React, { createContext, useContext, useState, useEffect } from "react";
import { Client, ClientProps } from "../interfaces/form.interface";
import { getClients } from "../services/clients/getClients";
import { formatDate, getCookie } from "../utils";
import { useAppSelector } from "../redux/hooks";

const ClientContext = createContext<ClientProps | null>(null);

const emptyClient: Client = {
  _id: "",
  firstName: "",
  lastName: "",
  businessName: "",
  email: "",
  phone: "",
  antiquity: "",
  debt: 0,
  userId: "",
  role: "cliente",
  updatedAt: "",
  createdAt: "",
};

export const ClientProvider: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [clientId, setClientId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<string | null>(null);

  const isAuth = useAppSelector((state) => state.authReducer.isAuth);

  useEffect(() => {
    const token = getCookie("accessToken=");
    setLoading(true);

    if (!isAuth) setFilter(null);

    const fetchClients = async (query: string) => {
      try {
        const response = await getClients(query);
        const { data } = response;
        const formattedClients = data.data.map((client) => ({
          ...client,
          updatedAt: `last update: ${formatDate(client.updatedAt)}`,
          createdAt: `${formatDate(client.createdAt)}`,
        }));
        setClients(formattedClients);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (token && isAuth) {
      if (filter) {
        fetchClients(`?filter=${filter}`);
      } else {
        fetchClients("");
      }
    }
  }, [isAuth, filter]);

  const value: ClientProps = {
    clients,
    setClients,
    clientId,
    setClientId,
    emptyClient,
    loading,
    setLoading,
    filter,
    setFilter,
  };

  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  );
};

export const useClientContext = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("No client context");
  } else {
    return context;
  }
};
