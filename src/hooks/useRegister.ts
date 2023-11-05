import {
  useState,
  ChangeEvent,
  MouseEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { mutate } from "swr";

import { useNotificationContext } from "../context/notification.context";
import { User } from "../interfaces/form.interface";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { registerThunk } from "../redux/thunks/register.thunk";
import { useUserContext } from "../context/register.context";

type registerHook = {
  newUser: User;
  setNewUser: Dispatch<SetStateAction<User>>;
  handleInputRegister: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmitRegister: (e: MouseEvent<HTMLButtonElement>) => void;
  showModal: boolean;
  handleModal: () => void;
};

function useRegister(): registerHook {
  const [newUser, setNewUser] = useState<User>({
    firstName: "",
    lastName: "",
    ownBusiness: "",
    email: "",
    password: "",
    role: "admin",
  });
  const { error } = useAppSelector((state) => state.registerReducer);

  const { setMessage, setStatusColor } = useNotificationContext();
  const { register, setRegister } = useUserContext();
  const dispatch = useAppDispatch();
  const showModal = register;

  function handleModal() {
    setRegister(false);
  }

  function handleInputRegister(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  const handleSubmitRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setMessage(undefined);
    dispatch(registerThunk(newUser))
      .unwrap()
      .then((response: any) => {
        if (response?.status === 201) {
          setStatusColor("success");
          setMessage("User created successfully");
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
          setMessage(response.code);
          setStatusColor("danger");
        }
      })
      .catch((error) => {
        console.error("Error al registrar el usuario", error);
        setMessage(error);
        setStatusColor("danger");
      });
  };

  return {
    newUser,
    setNewUser,
    handleInputRegister,
    handleSubmitRegister,
    showModal,
    handleModal,
  };
}

export default useRegister;
