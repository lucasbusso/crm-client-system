import React, { Suspense } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useUpdateContext } from "../context";
import CustomModal from "./CustomModal";

const LoadingSpinner = React.lazy(() => import("../components/Spinner"));

const EditForm = (): JSX.Element => {
  const {
    handleInputUpdate,
    handleSubmitUpdate,
    clientUpdate,
    loading,
    openModal,
    setOpenModal,
    setClientUpdate,
  } = useUpdateContext();

  function closeModal() {
    setOpenModal(false);
    setClientUpdate(null);
  }

  return (
    <CustomModal fn={closeModal} state={openModal}>
      <form
        className="bg-white shadow-sm rounded-md pb-10 px-5"
        onSubmit={(e) => handleSubmitUpdate(e)}
      >
        <div className="mb-6 flex gap-4 w-full">
          <FloatingLabel
            controlId="firstName"
            label="First name"
            className="w-full"
          >
            <Form.Control
              type="text"
              placeholder="Enter first name"
              value={clientUpdate?.firstName}
              onChange={(e) => handleInputUpdate(e)}
              name="firstName"
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="lastName"
            label="Last name"
            className="w-full"
          >
            <Form.Control
              type="text"
              placeholder="Enter last name"
              value={clientUpdate?.lastName}
              onChange={(e) => handleInputUpdate(e)}
              name="lastName"
            />
          </FloatingLabel>
        </div>
        <div className="block mb-6">
          <FloatingLabel controlId="business" label="Business name">
            <Form.Control
              type="text"
              placeholder="Enter business name"
              value={clientUpdate?.businessName}
              onChange={(e) => handleInputUpdate(e)}
              name="businessName"
            />
          </FloatingLabel>
        </div>
        <div className="block mb-6">
          <FloatingLabel controlId="email" label="Email">
            <Form.Control
              type="text"
              placeholder="Enter email"
              value={clientUpdate?.email}
              onChange={(e) => handleInputUpdate(e)}
              name="email"
            />
          </FloatingLabel>
        </div>
        <div className="block mb-6">
          <FloatingLabel controlId="phone" label="Phone">
            <Form.Control
              type="text"
              placeholder="Enter phone"
              value={clientUpdate?.phone}
              onChange={(e) => handleInputUpdate(e)}
              name="phone"
            />
          </FloatingLabel>
        </div>
        <div className="block mb-6">
          <FloatingLabel controlId="debt" label="Debt">
            <Form.Control
              type="number"
              placeholder="Debt"
              value={clientUpdate?.debt}
              onChange={(e) => handleInputUpdate(e)}
              name="debt"
            />
          </FloatingLabel>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="bg-indigo-600 w-full text-white uppercase font-bold hover:bg-indigo-700 transition-colors py-2 rounded-md"
        >
          {loading ? (
            <Suspense>
              <LoadingSpinner />
            </Suspense>
          ) : (
            "Save changes"
          )}
        </Button>
      </form>
    </CustomModal>
  );
};
export default EditForm;
