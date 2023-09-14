import React from "react";
import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { login } from "../redux/slices/auth.slice";
import { Navigate } from "react-router-dom";

export const LoginPage: React.FC<{}> = () => {
  const { isAuth } = useAppSelector((state) => state.authReducer);

  const dispatch = useAppDispatch();
  function handleLogin() {
    dispatch(login());
  }
  return isAuth ? (
    <Navigate to="/" replace />
  ) : (
    <form className="container flex flex-column gap-4 w-[50%] mt-[64px]">
      <input
        type="email"
        placeholder="Email"
        className="border-2 p-2 rounded-md"
      />
      <input
        type="password"
        placeholder="Password"
        className="border-2 p-2 rounded-md"
      />
      <Button
        type="submit"
        variant="primary"
        className="bg-indigo-500 hover:bg-indigo-600 uppercase"
        onClick={() => handleLogin()}
      >
        Login
      </Button>
    </form>
  );
};
