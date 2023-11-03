import {
  useState,
  ChangeEvent,
  FormEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { Client } from "../interfaces/form.interface";
import { useClientContext } from "../context/client.context";
import { useNotificationContext } from "../context/notification.context";
import { createClientService } from "../services/clients/createClient";

type createClientHook = {
  formData: Client;
  setFormData: Dispatch<SetStateAction<Client>>;
  resetForm: () => void;
  generateUniqueId: () => string;
  generateDate: () => string;
  handleSubmitCreate: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleInputCreate: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

function useCreateClient(initialValues: Client): createClientHook {
  const [formData, setFormData] = useState<Client>(initialValues);
  const { setLoading, setClients } = useClientContext();
  const { setMessage, setStatusColor } = useNotificationContext();

  function generateUniqueId() {
    const id = uuidv4();
    return id.toString();
  }

  function generateDate() {
    const date = new Date(Date.now());
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return date.toLocaleDateString(undefined, options);
  }

  async function handleSubmitCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(undefined);
    try {
      const response = await createClientService(formData);
      if (response.code) {
        setMessage(response.code);
        setStatusColor("danger");
        setLoading(false);
      } else {
        setClients((prevClients) => [...prevClients, response.data]);
        setMessage(response.statusText);
        setStatusColor("success");
        setLoading(false);
        resetForm();
      }
    } catch (error: any) {
      console.log(error);
      setMessage("Error creating client");
      setLoading(false);
    }
  }

  function handleInputCreate(
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

  return {
    formData,
    setFormData,
    resetForm,
    generateUniqueId,
    generateDate,
    handleSubmitCreate,
    handleInputCreate,
  };
}

export default useCreateClient;
