import React, { createContext, useContext, useState, useEffect } from "react";
import { Client, ClientProps } from "../interfaces/form.interface";
import { getClients } from "../services/clients/getClients";
import { getCookie } from "../utils";
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
  updatedAt: "",
  createdAt: "",
};

export const ClientProvider: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [clientId, setClientId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const isAuth = useAppSelector((state) => state.authReducer.isAuth);

  useEffect(() => {
    const token = getCookie("accessToken=");
    setLoading(true);
    const fetchClients = async () => {
      try {
        const response = await getClients();
        const { data } = response;
        setClients(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (token && isAuth) {
      fetchClients();
    }
  }, [isAuth]);

  const value: ClientProps = {
    clients,
    setClients,
    clientId,
    setClientId,
    emptyClient,
    loading,
    setLoading,
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
