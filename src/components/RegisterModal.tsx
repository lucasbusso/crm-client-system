import React, { Suspense } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
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
            <input
              name="firstName"
              type="text"
              placeholder="First name"
              className="border-2 p-2 rounded-md w-[50%]"
              value={newUser.firstName}
              onChange={handleInputRegister}
            />
            <input
              name="lastName"
              type="text"
              placeholder="Last name"
              className="border-2 p-2 rounded-md w-[50%]"
              value={newUser.lastName}
              onChange={handleInputRegister}
            />
          </div>
          <input
            name="ownBusiness"
            type="text"
            placeholder="Business name"
            className="border-2 p-2 rounded-md"
            value={newUser.ownBusiness}
            onChange={handleInputRegister}
          />
          <select className="border-2 p-2 rounded-md">
            <option>Select your role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="border-2 p-2 rounded-md"
            value={newUser.email}
            onChange={handleInputRegister}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="border-2 p-2 rounded-md"
            value={newUser.password}
            onChange={handleInputRegister}
          />
          <Button
            type="submit"
            variant="primary"
            className="bg-indigo-500 hover:bg-indigo-600 font-bold  uppercase"
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
