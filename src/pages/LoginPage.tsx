import React, { ChangeEvent, useState } from "react";
import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Navigate, useNavigate } from "react-router-dom";
import { authThunk } from "../redux/thunks/auth.thunk";
import { useUserContext } from "../context/register.context";
import { RegisterModal } from ".";

type User = {
  username: string;
  password: string;
};

export const LoginPage: React.FC<{}> = () => {
  const { isAuth } = useAppSelector((state) => state.authReducer);
  const [user, setUser] = useState<User>({ username: "", password: "" });
  const { setRegister } = useUserContext();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function handleSubmit() {
    dispatch(authThunk(user));
    navigate("/dashboard");
  }

  function handleLogin(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  return isAuth ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <>
      <form className="container flex flex-column gap-4 w-[50%] mt-[64px]">
        <input
          name="username"
          type="email"
          placeholder="Email"
          className="border-2 p-2 rounded-md"
          value={user.username}
          onChange={handleLogin}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border-2 p-2 rounded-md"
          value={user.password}
          onChange={handleLogin}
        />
        <div className="flex flex-col gap-2">
          <Button
            type="submit"
            variant="primary"
            className="bg-indigo-500 hover:bg-indigo-600 font-bold uppercase"
            onClick={() => handleSubmit()}
          >
            Login
          </Button>
          <Button
            type="button"
            variant="primery-outline"
            className=" hover:bg-slate-300 text-slate-500 font-bold uppercase"
            onClick={() => setRegister(true)}
          >
            Register
          </Button>
        </div>
      </form>
      <RegisterModal />
    </>
  );
};
