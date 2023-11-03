import {
  MouseEvent,
  ChangeEvent,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { useNavigate } from "react-router-dom";
import { mutate } from "swr";

import { AuthCredentials } from "../interfaces/redux.interface";
import { useNotificationContext } from "../context/notification.context";
import { useLoginContext } from "../context/login.context";
import { useAppDispatch } from "../redux/hooks";
import { authThunk } from "../redux/thunks/auth.thunk";

type loginHook = {
  user: AuthCredentials;
  setUser: Dispatch<SetStateAction<AuthCredentials>>;
  handleInputLogin: (e: ChangeEvent<HTMLInputElement>) => void;
  handleLoginSubmit: (e: MouseEvent<HTMLButtonElement>) => void;
};

function useLogin(): loginHook {
  const [user, setUser] = useState<AuthCredentials>({
    email: "",
    password: "",
  });
  const { setStatusColor, setMessage } = useNotificationContext();
  const { setLogin } = useLoginContext();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function handleInputLogin(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  function handleLoginSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setMessage(undefined);

    dispatch(authThunk(user))
      .unwrap()
      .then((payload) => {
        if (payload?.token && payload?.user) {
          mutate("/user");
          navigate("/dashboard");
          setUser({ email: "", password: "" });
        } else {
          setLogin(true);
          setMessage("Login error");
          setStatusColor("danger");
        }
      })
      .catch(() => {
        navigate("/login");
        setMessage("Login error");
        setStatusColor("danger");
      });
    navigate("/dashboard");
  }

  return {
    user,
    setUser,
    handleInputLogin,
    handleLoginSubmit,
  };
}

export default useLogin;
