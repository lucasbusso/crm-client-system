import { ChangeEvent } from "react";

export interface FormValues {
  name: string;
  business: string;
  date: string;
  email: string;
  description: string;
  id: string;
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
  name: string | null;
  business: string | null;
  date: string | null;
  email: string | null;
  description?: string | null;
  id: string;
};
