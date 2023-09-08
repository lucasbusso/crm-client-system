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

  function resetForm() {
    setFormData(initialValues);
  }

  return { formData, handleInputChange, resetForm, generateUniqueId };
}

export default useForm;
