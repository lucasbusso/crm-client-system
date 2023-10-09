import React, { useState, ChangeEvent } from "react";
import { useForm } from "../hooks";
import { FormValidator, setLocalStorageClient } from "../utils";
import Notification from "./Notification";
import { useClientContext } from "../context/client.context";

const Form: React.FC<object> = (): JSX.Element => {
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const { clients, setClients, emptyClient } = useClientContext();
  const { formData, setFormData, resetForm, generateUniqueId, generateDate } =
    useForm(emptyClient);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    FormValidator.validate(formData, { abortEarly: false })
      .then(() => {
        setError(false);
        resetForm();
        formData.id = generateUniqueId();
        formData.modifiedDate = generateDate();
        setClients([...clients, formData]);
        setLocalStorageClient(formData);
      })
      .catch((e) => {
        console.log(e.errors);
        setError(true);
        setErrorMessage(e.errors);
      })
      .finally(() => {
        setTimeout(() => {
          setError(false);
        }, 3000);
      });
  }

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <div className="md:w-1/2 w-full relative">
      <h2 className="font-bold text-2xl my-6 text-center">Add new client</h2>
      {error && <Notification errorMessage={errorMessage} error={error} />}
      <form
        className="bg-white shadow-sm rounded-md py-10 px-5"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="block mb-6">
          <label htmlFor="name" className="uppercase font-bold text-slate-600">
            Name
          </label>
          <input
            name="name"
            type="text"
            className="border-2 w-full p-2 mt-2 placeholder-slate-500 rounded-md"
            value={formData.name}
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
            value={formData.business}
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
            value={formData.email}
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
            value={formData.date}
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
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full text-white uppercase font-bold hover:bg-indigo-700 transition-colors py-2 rounded-md"
          value="Register"
        />
      </form>
    </div>
  );
};

export default Form;
