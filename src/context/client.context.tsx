import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Client } from "../interfaces/";
import { emptyClient } from "../models/client.model";
import { useAppSelector } from "../redux/hooks";
import { getClients } from "../services/clients/getClients";
import { formatDate, formatPrice, getCookie } from "../utils";

interface ClientProps {
  clients: Client[];
  setClients: Dispatch<SetStateAction<Client[]>>;
  emptyClient: Client;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  filter: string | null;
  setFilter: Dispatch<SetStateAction<string | null>>;
  fetchClients: (query: string) => Promise<void>;
}

const ClientContext = createContext<ClientProps | null>(null);

export const ClientProvider: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<string | null>(null);

  const isAuth = useAppSelector((state) => state.authReducer.isAuth);

  async function fetchClients(query: string) {
    setLoading(true);

    try {
      const response = await getClients(query);
      const { data } = response;
      const formattedClients = data.data.map((client) => ({
        ...client,
        updatedAt: `last update: ${formatDate(client.updatedAt)}`,
        createdAt: `${formatDate(client.createdAt)}`,
        debt: formatPrice(client.debt).toString(),
      }));
      setClients(formattedClients);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const token = getCookie("accessToken=");
    setLoading(true);

    if (!isAuth) setFilter(null);

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
    emptyClient,
    loading,
    setLoading,
    filter,
    setFilter,
    fetchClients,
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
