import React, { Suspense } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useAppSelector } from "../redux/hooks";
import { useClearErrors } from "../hooks/useClearErrors";
import { useRegister } from "../hooks";
const LoadingSpinner = React.lazy(() => import("./Spinner"));

const RegisterModal = (): JSX.Element => {
  const {
    handleInputRegister,
    handleSubmitRegister,
    showModal,
    newUser,
    handleModal,
  } = useRegister();
  const { loading } = useAppSelector((state) => state.registerReducer);
  useClearErrors();

  return (
    <>
      <Modal
        show={showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation
      >
        <Modal.Header className="justify-end border-none pb-0">
          <Button
            onClick={handleModal}
            className="text-black text-2xl hover:bg-transparent border-none"
          >
            ✕
          </Button>
        </Modal.Header>
        <form className="container flex flex-column gap-4 w-[60%] mt-[12px] mb-[48px]">
          <div className="flex gap-4">
            <FloatingLabel controlId="firstName" label="First name">
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={newUser.firstName}
                onChange={handleInputRegister}
                name="firstName"
              />
            </FloatingLabel>
            <FloatingLabel controlId="lastName" label="Last name">
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={newUser.lastName}
                onChange={handleInputRegister}
                name="lastName"
              />
            </FloatingLabel>
          </div>
          <FloatingLabel controlId="ownBusiness" label="Business name">
            <Form.Control
              type="text"
              placeholder="Enter business name"
              value={newUser.ownBusiness}
              onChange={handleInputRegister}
              name="ownBusiness"
            />
          </FloatingLabel>
          <Form.Select
            aria-label="Select a type"
            name="type"
            className="border-2 p-2 rounded-md w-full"
          >
            <option value="admin">Administrator</option>
            <option value="user">Regular User</option>
          </Form.Select>
          <FloatingLabel controlId="email" label="Email">
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={newUser.email}
              onChange={handleInputRegister}
              name="email"
            />
          </FloatingLabel>
          <FloatingLabel controlId="password" label="Password">
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={newUser.password}
              onChange={handleInputRegister}
              name="password"
            />
          </FloatingLabel>
          <Button
            type="submit"
            variant="primary"
            className="bg-indigo-500 hover:bg-indigo-600 font-bold uppercase"
            onClick={(e) => handleSubmitRegister(e)}
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
      </Modal>
    </>
  );
};

export default RegisterModal;
