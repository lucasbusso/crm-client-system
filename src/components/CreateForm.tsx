import React, { Suspense } from "react";
import { useCreateForm } from "../hooks";
import { useClientContext } from "../context/client.context";
import { Notification } from ".";
import { useNotificationContext } from "../context/notification.context";
import { Button } from "react-bootstrap";
const LoadingSpinner = React.lazy(() => import("../components/Spinner"));

const Form: React.FC<object> = (): JSX.Element => {
  const { message, statusColor } = useNotificationContext();
  const { emptyClient, loading } = useClientContext();
  const { formData, handleSubmitCreate, handleInputCreate } =
    useCreateForm(emptyClient);

  return (
    <div className="md:w-1/2 w-full relative">
      <h2 className="font-bold text-2xl my-6 text-center">Add new client</h2>
      <form
        className="bg-white shadow-sm rounded-md py-10 px-5 mb-12"
        onSubmit={(e) => handleSubmitCreate(e)}
      >
        <div className="flex gap-4">
          <div className="block mb-6 w-[50%]">
            <label
              htmlFor="firstName"
              className="uppercase font-bold text-slate-600"
            >
              First name
            </label>
            <input
              name="firstName"
              type="text"
              className="border-2 w-full p-2 mt-2 placeholder-slate-500 rounded-md"
              value={formData.firstName}
              onChange={handleInputCreate}
            />
          </div>
          <div className="block mb-6 w-[50%]  ">
            <label
              htmlFor="lastName"
              className="uppercase font-bold text-slate-600"
            >
              Last name
            </label>
            <input
              name="lastName"
              type="text"
              className="border-2 w-full p-2 mt-2 placeholder-slate-500 rounded-md"
              value={formData.lastName}
              onChange={handleInputCreate}
            />
          </div>
        </div>
        <div className="block mb-6">
          <label
            htmlFor="businessName"
            className="uppercase font-bold text-slate-600"
          >
            Business Name
          </label>
          <input
            name="businessName"
            type="text"
            className="border-2 w-full p-2 mt-2 placeholder-slate-500 rounded-md"
            value={formData.businessName}
            onChange={handleInputCreate}
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
            onChange={handleInputCreate}
          />
        </div>
        <div className="block mb-6">
          <label htmlFor="phone" className="uppercase font-bold text-slate-600">
            Phone
          </label>
          <input
            name="phone"
            type="text"
            className="border-2 w-full p-2 mt-2 placeholder-slate-500 rounded-md"
            value={formData.phone}
            onChange={handleInputCreate}
          />
        </div>
        <div className="block mb-6">
          <label htmlFor="date" className="uppercase font-bold text-slate-600">
            Debt
          </label>
          <input
            name="debt"
            type="text"
            className="border-2 w-full p-2 mt-2 placeholder-slate-500 rounded-md"
            value={formData.debt}
            onChange={handleInputCreate}
          />
        </div>
        <div className="block mb-6">
          <select name="type" className="border-2 p-2 rounded-md w-full">
            <option>Select a type</option>
            <option value="cliente">Cliente</option>
            <option value="proveedor">Proveedor</option>
          </select>
        </div>

        <Button
          type="submit"
          variant="primery"
          className="bg-indigo-500 hover:bg-indigo-600 font-bold uppercase w-full h-[50px] text-slate-100 hover:text-slate-100"
        >
          {loading ? (
            <Suspense>
              <LoadingSpinner />
            </Suspense>
          ) : (
            "Register"
          )}
        </Button>
      </form>
      {message && <Notification message={message} statusColor={statusColor} />}
    </div>
  );
};

export default Form;
