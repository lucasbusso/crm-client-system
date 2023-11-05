import { SetStateAction, Dispatch } from "react";

export type User = {
  firstName: string;
  lastName: string;
  ownBusiness: string;
  email: string;
  password: string;
  role: "user" | "admin";
};

export type Client = {
  _id: string;
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  phone: string;
  antiquity: string;
  debt: number;
  userId: string;
  role: "cliente" | "proveedor";
  updatedAt: string;
  createdAt: string;
};

export type ClientEdit = {
  firstname?: string;
  business?: string;
  date?: string;
  email?: string;
  description?: string;
  id?: string;
  modifiedDate: string;
};

export type NotificationProps = {
  message: string | undefined;
  setMessage: (message: string | undefined) => void;
  statusColor: "danger" | "success";
  setStatusColor: Dispatch<SetStateAction<"danger" | "success">>;
};

export interface ClientProps {
  clients: Client[];
  setClients: Dispatch<SetStateAction<Client[]>>;
  clientId: string | undefined;
  setClientId: Dispatch<SetStateAction<string>>;
  emptyClient: Client;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  filter: string | null;
  setFilter: Dispatch<SetStateAction<string | null>>;
}
