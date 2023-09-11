import { ChangeEvent } from "react";

export interface FormValues {
  name: string | undefined;
  business: string | undefined;
  date: string | undefined;
  email: string | undefined;
  description: string | undefined;
  id: string | undefined;
  modifiedDate: string;
}

export interface FormHooks {
  formData: FormValues;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  resetForm: () => void;
  generateUniqueId: () => string;
  generateDate: () => string;
}

export interface NotificationProps {
  errorMessage: string[];
  error: boolean;
}

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
