import { useState, ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { FormHooks, FormValues } from "../interfaces/form.interface";

function useForm(initialValues: FormValues): FormHooks {
  const [formData, setFormData] = useState<FormValues>(initialValues);

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

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
    handleInputChange,
    resetForm,
    generateUniqueId,
    generateDate,
  };
}

export default useForm;
