import { ChangeEvent } from "react";

export interface FormValues {
  name: string;
  business: string;
  date: string;
  email: string;
  description: string;
}

export interface FormHooks {
  formData: FormValues;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  resetForm: () => void;
}

export interface NotificationProps {
  errorMessage: string[];
  error: boolean;
}
