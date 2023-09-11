import { ChangeEvent, useState, useEffect } from "react";
import { useClientContext } from "../context/client.context";
import { ClientEdit } from "../interfaces/form.interface";
import { useForm } from "../hooks";

const EditForm = (): JSX.Element => {
  const { clients, setClientId, clientId, updateClient, emptyClient } =
    useClientContext();
  const [clientEdited, setClientEdited] = useState<ClientEdit | undefined>(
    emptyClient
  );

  const { generateDate } = useForm(emptyClient);

  useEffect(() => {
    const clientToEdit = clients.find((client) => client.id === clientId);
    if (clientToEdit) {
      setClientEdited(clientToEdit);
    }
  }, [clients, clientId]);

  const handleSubmitEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (clientEdited) {
      updateClient(clientEdited);
      setClientId("");
    }
  };

  const handleInputEdit = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setClientEdited((prevData) => ({
      ...prevData,
      [name]: value,
      modifiedDate: generateDate(),
    }));
  };

  return (
    <form
      className="bg-white shadow-sm rounded-md pb-10 px-5"
      onSubmit={(e) => handleSubmitEdit(e)}
    >
      <div className="block mb-6">
        <label htmlFor="name" className="uppercase font-bold text-slate-600">
          Name
        </label>
        <input
          name="name"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-slate-500 rounded-md"
          value={clientEdited?.name}
          onChange={handleInputEdit}
        />
      </div>
      <div className="block mb-6">
        <label
          htmlFor="business"
          className="uppercase font-bold text-slate-600"
        >
          Business Name
        </label>
        <input
          name="business"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-slate-500 rounded-md"
          value={clientEdited?.business}
          onChange={handleInputEdit}
        />
      </div>
      <div className="block mb-6">
        <label htmlFor="email" className="uppercase font-bold text-slate-600">
          Email
        </label>
        <input
          name="email"
          type="email"
          className="border-2 w-full p-2 mt-2 placeholder-slate-500 rounded-md"
          value={clientEdited?.email}
          onChange={handleInputEdit}
        />
      </div>
      <div className="block mb-6">
        <label htmlFor="date" className="uppercase font-bold text-slate-600">
          Registration
        </label>
        <input
          name="date"
          type="date"
          className="border-2 w-full p-2 mt-2 placeholder-slate-500 bg-slate-200 rounded-md hover:cursor-not-allowed"
          value={clientEdited?.date}
          onChange={handleInputEdit}
          disabled
        />
      </div>
      <div className="block mb-6">
        <label htmlFor="date" className="uppercase font-bold text-slate-600">
          Description (optional)
        </label>
        <textarea
          name="description"
          id="description"
          className="border-2 w-full p-2 mt-2 placeholder-slate-500 rounded-md"
          value={clientEdited?.description}
          onChange={handleInputEdit}
        />
      </div>

      <input
        type="submit"
        className="bg-indigo-600 w-full text-white uppercase font-bold hover:bg-indigo-700 transition-colors py-2 rounded-md"
        value="Save changes"
      />
    </form>
  );
};
export default EditForm;
