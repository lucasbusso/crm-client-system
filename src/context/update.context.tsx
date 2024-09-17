import {
  useState,
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  createContext,
  useContext,
} from "react";
import { Client } from "../interfaces";
import { updateClient } from "../services/clients/updateClient";
import { getClient } from "../services/clients/getClient";
import { useClientContext, useNotificationContext } from ".";
import { deleteClient } from "../services";
import { normalizeId } from "../utils/normalizeId";

type UpdateContext = {
  clientUpdate: Client | null;
  setClientUpdate: Dispatch<SetStateAction<Client | null>>;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  confirm: boolean;
  setConfirm: Dispatch<SetStateAction<boolean>>;
  handleSubmitUpdate: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleInputUpdate: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleOpenEditModal: (id?: string) => Promise<void>;
  handleDelete: (id?: string) => Promise<void>;
};

const UpdateContext = createContext<UpdateContext | null>(null);

export const UpdateProvider: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [clientUpdate, setClientUpdate] = useState<Client | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const { setMessage, setStatusColor } = useNotificationContext();
  const { fetchClients } = useClientContext();

  async function handleOpenEditModal(id?: string) {
    try {
      const response = await getClient(id);
      setOpenModal(true);
      setClientUpdate(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmitUpdate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      if (clientUpdate) {
        await updateClient(clientUpdate, normalizeId(clientUpdate));
        setOpenModal(false);
        setMessage("Client updated successfully");
        setStatusColor("success");
        setLoading(false);
        fetchClients("");
        getClient(normalizeId(clientUpdate));
      }
    } catch (error) {
      setMessage("Error updating client");
      console.error(error);
      setLoading(false);
    }
  }

  function handleInputUpdate(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    console.log({ name }, { value });
    if (!clientUpdate) return;
    setClientUpdate((prevData) => {
      if (prevData) {
        return {
          ...prevData,
          [name]: value,
        };
      }
      return prevData;
    });
  }

  async function handleDelete(id?: string) {
    setLoading(true);
    try {
      if (id) {
        await deleteClient(id);
        fetchClients("");
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  const value: UpdateContext = {
    clientUpdate,
    setClientUpdate,
    openModal,
    setOpenModal,
    loading,
    setLoading,
    confirm,
    setConfirm,
    handleSubmitUpdate,
    handleInputUpdate,
    handleOpenEditModal,
    handleDelete,
  };

  return (
    <UpdateContext.Provider value={value}>{children}</UpdateContext.Provider>
  );
};

export const useUpdateContext = () => {
  const context = useContext(UpdateContext);
  if (!context) {
    throw new Error("No client context");
  } else {
    return context;
  }
};
