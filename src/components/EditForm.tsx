import { useClientContext } from "../context/client.context";
import { useForm } from "../hooks";
import { Client } from "../interfaces/form.interface";

const EditForm = ({ client }: { client: Client }): JSX.Element => {
  const { formData, handleInputChange } = useForm({
    name: client.name,
    business: client.business,
    email: client.email,
    date: client.date,
    description: client.description,
    id: client.id,
  });
  const { clients, setClients } = useClientContext();
  function handleSubmitEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setClients([...clients, formData]);
  }

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
          value={client.name}
          onChange={handleInputChange}
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
          value={client.business}
          onChange={handleInputChange}
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
          value={client.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="block mb-6">
        <label htmlFor="date" className="uppercase font-bold text-slate-600">
          Registration
        </label>
        <input
          name="date"
          type="date"
          className="border-2 w-full p-2 mt-2 placeholder-slate-500 rounded-md"
          value={client.date}
          onChange={handleInputChange}
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
          value={client.description}
          onChange={handleInputChange}
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
