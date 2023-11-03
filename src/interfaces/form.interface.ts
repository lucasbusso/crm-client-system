import { SetStateAction, Dispatch, FormEvent, ChangeEvent } from "react";

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

export interface FormHooks {
  formData: Client;
  setFormData: Dispatch<SetStateAction<Client>>;
  resetForm: () => void;
  generateUniqueId: () => string;
  generateDate: () => string;
  handleSubmitCreate: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleInputCreate: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export type NotificationProps = {
  message: string | undefined;
  setMessage: (message: string) => void;
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
}
