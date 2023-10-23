import { SetStateAction, Dispatch } from "react";

export type User = {
  name?: string;
  email: string;
  password: string;
  age?: number | string;
};

export type Client = {
  name: string | undefined;
  business: string | undefined;
  date: string | undefined;
  email: string | undefined;
  description?: string | undefined;
  id: string | undefined;
  modifiedDate: string;
};

export type ClientEdit = {
  name?: string;
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
}

export interface NotificationProps {
  errorMessage: string[];
  error: boolean;
}

export interface ContextProps {
  clients: Client[];
  setClients: Dispatch<SetStateAction<Client[]>>;
  clientId: string | undefined;
  setClientId: Dispatch<SetStateAction<string | undefined>>;
  updateClient: (client: ClientEdit) => void;
  deleteClient: (clientId: string | undefined) => void;
  emptyClient: Client;
}
