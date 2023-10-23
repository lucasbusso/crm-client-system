import React, { ChangeEvent, useState, Suspense } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useUserContext } from "../context/register.context";
import { User } from "../interfaces/form.interface";
import { mutate } from "swr";
import { useAppDispatch } from "../redux/hooks";
import { registerThunk } from "../redux/thunks/register.thunk";
const LoadingSpinner = React.lazy(() => import("../components/Spinner"));

export const RegisterModal = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState<User>({
    name: "",
    password: "",
    email: "",
    age: "",
  });
  const { register, setRegister } = useUserContext();
  const dispatch = useAppDispatch();
  const showModal = register;

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    e.preventDefault();
    dispatch(registerThunk(newUser))
      .unwrap()
      .then((response) => {
        if (response?.status === 201) {
          setNewUser({ name: "", password: "", email: "", age: "" });
          mutate("/user");
          setRegister(false);
          setLoading(false);
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
        <input
          name="name"
          type="text"
          placeholder="Name"
          className="border-2 p-2 rounded-md"
          value={newUser.name}
          onChange={handleInputChange}
        />
        <input
          name="age"
          type="text"
          placeholder="Age"
          className="border-2 p-2 rounded-md"
          value={newUser.age}
          onChange={handleInputChange}
        />
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
  );
};
