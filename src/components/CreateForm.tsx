import React, { Suspense } from "react";
import { useCreateClient } from "../hooks";
import { useClientContext } from "../context/client.context";
import { Button, FloatingLabel, Form } from "react-bootstrap";
const LoadingSpinner = React.lazy(() => import("../components/Spinner"));

const CreateForm: React.FC<object> = (): JSX.Element => {
  const { emptyClient, loading } = useClientContext();
  const { formData, handleSubmitCreate, handleInputCreate } =
    useCreateClient(emptyClient);

  return (
    <div className="md:w-1/2 w-full relative">
      <h2 className="font-bold text-2xl my-6 text-center">Add new client</h2>
      <form
        className="bg-white shadow-sm rounded-md opacity-95 py-10 px-5"
        onSubmit={(e) => handleSubmitCreate(e)}
      >
        <div className="flex gap-4">
          <div className="block mb-6 w-[50%]">
            <FloatingLabel controlId="firstName" label="First name">
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={(e) => handleInputCreate(e)}
                name="firstName"
              />
            </FloatingLabel>
          </div>
          <div className="block mb-6 w-[50%]  ">
            <FloatingLabel controlId="lastName" label="Last name">
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={(e) => handleInputCreate(e)}
                name="lastName"
              />
            </FloatingLabel>
          </div>
        </div>
        <div className="block mb-6">
          <FloatingLabel controlId="businessName" label="Business Name">
            <Form.Control
              type="text"
              placeholder="Enter business name"
              value={formData.businessName}
              onChange={(e) => handleInputCreate(e)}
              name="businessName"
            />
          </FloatingLabel>
        </div>
        <div className="block mb-6">
          <FloatingLabel controlId="email" label="Email">
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) => handleInputCreate(e)}
              name="email"
            />
          </FloatingLabel>
        </div>
        <div className="block mb-6">
          <FloatingLabel controlId="phone" label="Phone">
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={(e) => handleInputCreate(e)}
              name="phone"
            />
          </FloatingLabel>
        </div>
        <div className="block mb-6">
          <FloatingLabel controlId="debt" label="Debt">
            <Form.Control
              type="text"
              placeholder="Enter debt"
              value={formData.debt}
              onChange={(e) => handleInputCreate(e)}
              name="debt"
            />
          </FloatingLabel>
        </div>
        <div className="block mb-6">
          <Form.Select
            aria-label="Select a type"
            name="type"
            className="border-2 p-2 rounded-md w-full"
          >
            <option value="cliente">Cliente</option>
            <option value="proveedor">Proveedor</option>
          </Form.Select>
        </div>

        <Button
          type="submit"
          variant="primary"
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
    </div>
  );
};

export default CreateForm;
