import React, { Suspense } from "react";
import { Button } from "react-bootstrap";
import { useAppSelector } from "../redux/hooks";
import { Navigate } from "react-router-dom";
import { RegisterModal } from "../components";
import { useClearErrors } from "../hooks/useClearErrors";
import { useLogin } from "../hooks";
import { useUserContext } from "../context/register.context";
const LoadingSpinner = React.lazy(() => import("../components/Spinner"));

export const LoginPage: React.FC<{}> = () => {
  const { isAuth, loading } = useAppSelector((state) => state.authReducer);
  const { handleInputLogin, handleLoginSubmit, user } = useLogin();
  const { setRegister } = useUserContext();

  useClearErrors();

  return isAuth ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <>
      <form className="container flex flex-column justify-center gap-4 w-[50%] h-full">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border-2 p-2 rounded-md"
          value={user.email}
          onChange={handleInputLogin}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border-2 p-2 rounded-md"
          value={user.password}
          onChange={handleInputLogin}
        />
        <div className="flex flex-col gap-2">
          <Button
            type="submit"
            variant="primary"
            className="bg-indigo-500 hover:bg-indigo-600 font-bold uppercase h-[50px]"
            onClick={(e) => handleLoginSubmit(e)}
          >
            {loading ? (
              <Suspense>
                <LoadingSpinner />
              </Suspense>
            ) : (
              "Login"
            )}
          </Button>
          <Button
            type="button"
            variant="primery-outline"
            className=" hover:bg-slate-300 text-slate-500 font-bold uppercase h-[50px]"
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
