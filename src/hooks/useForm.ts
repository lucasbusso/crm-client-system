import { useState, ChangeEvent } from "react";
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

  function resetForm() {
    setFormData(initialValues);
  }

  return { formData, handleInputChange, resetForm };
}

export default useForm;
