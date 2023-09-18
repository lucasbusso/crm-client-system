import React, { ChangeEvent, useState } from "react";
import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Navigate, useNavigate } from "react-router-dom";
import { authThunk } from "../redux/thunks/auth.thunk";

type User = {
  username: string;
  password: string;
};

export const LoginPage: React.FC<{}> = () => {
  const { isAuth } = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({ username: "", password: "" });

  const dispatch = useAppDispatch();
  function handleSubmit() {
    console.log(user);
    dispatch(authThunk(user));
    navigate("/");
  }

  function handleLogin(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  return isAuth ? (
    <Navigate to="/" replace />
  ) : (
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
      <Button
        type="submit"
        variant="primary"
        className="bg-indigo-500 hover:bg-indigo-600 uppercase"
        onClick={() => handleSubmit()}
      >
        Login
      </Button>
    </form>
  );
};
