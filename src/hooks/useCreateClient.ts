import {
  useState,
  ChangeEvent,
  FormEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { Client } from "../interfaces/form.interface";
import { useClientContext } from "../context/client.context";
import { useNotificationContext } from "../context/notification.context";
import { createClientService } from "../services/clients/createClient";

type createClientHook = {
  formData: Client;
  setFormData: Dispatch<SetStateAction<Client>>;
  resetForm: () => void;
  handleSubmitCreate: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleInputCreate: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
};

function useCreateClient(initialValues: Client): createClientHook {
  const [formData, setFormData] = useState<Client>(initialValues);
  const { setLoading, setClients } = useClientContext();
  const { setMessage, setStatusColor } = useNotificationContext();

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
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
    handleSubmitCreate,
    handleInputCreate,
  };
}

export default useCreateClient;
