import { ChangeEvent } from "react";

export interface FormValues {
  name: string | undefined;
  business: string | undefined;
  date: string | undefined;
  email: string | undefined;
  description: string | undefined;
  id: string | undefined;
}

export interface FormHooks {
  formData: FormValues;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  resetForm: () => void;
  generateUniqueId: () => string;
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
};
