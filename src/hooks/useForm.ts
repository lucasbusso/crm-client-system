import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FormHooks, Client } from "../interfaces/form.interface";

function useForm(initialValues: Client): FormHooks {
  const [formData, setFormData] = useState<Client>(initialValues);

  function generateUniqueId() {
    const id = uuidv4();
    return id.toString();
  }

  function generateDate() {
    const date = new Date(Date.now());
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return date.toLocaleDateString(undefined, options);
  }

  function resetForm() {
    setFormData(initialValues);
  }

  return {
    formData,
    setFormData,
    resetForm,
    generateUniqueId,
    generateDate,
  };
}

export default useForm;
