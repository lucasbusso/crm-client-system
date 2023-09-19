import React, { ChangeEvent, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useAppDispatch } from "../redux/hooks";
import { registerThunk } from "../redux/thunks/register.thunk";
import { useUserContext } from "../context/register.context";

type User = {
  username: string;
  password: string;
};

export const RegisterModal = (): JSX.Element => {
  const [newUser, setNewUser] = useState<User>({ username: "", password: "" });
  const { register, setRegister } = useUserContext();
  const dispatch = useAppDispatch();
  const showModal = register;

  function handleSubmitRegister(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(registerThunk(newUser));
    setRegister(false);
  }

  function handleRegister(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

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
          name="username"
          type="email"
          placeholder="Email"
          className="border-2 p-2 rounded-md"
          value={newUser.username}
          onChange={handleRegister}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border-2 p-2 rounded-md"
          value={newUser.password}
          onChange={handleRegister}
        />
        <Button
          type="submit"
          variant="primary"
          className="bg-indigo-500 hover:bg-indigo-600 font-bold  uppercase"
          onClick={(e) => handleSubmitRegister(e)}
        >
          Register
        </Button>
      </form>
    </Modal>
  );
};
