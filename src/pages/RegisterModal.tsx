import React, { ChangeEvent, useState, Suspense } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useUserContext } from "../context/register.context";
import { User } from "../interfaces/form.interface";
import { mutate } from "swr";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { registerThunk } from "../redux/thunks/register.thunk";
import { ErrorNotification } from "../components";
import { useClearErrors } from "../hooks/useClearErrors";
const LoadingSpinner = React.lazy(() => import("../components/Spinner"));

export const RegisterModal = (): JSX.Element => {
  const { loading, error } = useAppSelector((state) => state.registerReducer);
  const [newUser, setNewUser] = useState<User>({
    firstName: "",
    lastName: "",
    ownBusiness: "",
    email: "",
    password: "",
    role: "admin",
  });
  const { register, setRegister } = useUserContext();
  const dispatch = useAppDispatch();
  const showModal = register;
  useClearErrors();

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(registerThunk(newUser))
      .unwrap()
      .then((response) => {
        if (response?.status === 201) {
          mutate("/user");
          setRegister(false);
          setNewUser({
            firstName: "",
            lastName: "",
            ownBusiness: "",
            email: "",
            password: "",
            role: "admin",
          });
        } else {
        }
      })
      .catch((error) => {
        console.error("Error al registrar el usuario", error);
      });
  };

  function handleModal() {
    setRegister(false);
  }

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
              onChange={handleInputChange}
            />
            <input
              name="lastName"
              type="text"
              placeholder="Last name"
              className="border-2 p-2 rounded-md w-[50%]"
              value={newUser.lastName}
              onChange={handleInputChange}
            />
          </div>
          <input
            name="ownBusiness"
            type="text"
            placeholder="Business name"
            className="border-2 p-2 rounded-md"
            value={newUser.ownBusiness}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="border-2 p-2 rounded-md"
            value={newUser.password}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            variant="primary"
            className="bg-indigo-500 hover:bg-indigo-600 font-bold  uppercase"
            onClick={(e) => handleSubmit(e)}
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
      {error && <ErrorNotification errorMessage={error.code} />}
    </>
  );
};
