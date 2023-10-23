import React, { createContext, useContext, useState } from "react";
import { SetStateAction, Dispatch } from "react";

interface LoginContextProps {
  login: boolean;
  setLogin: Dispatch<SetStateAction<boolean>>;
}

const LoginContext = createContext<LoginContextProps | null>(null);

export const LoginProvider: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const [login, setLogin] = useState<boolean>(false);

  const value: LoginContextProps = {
    login,
    setLogin,
  };
  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("No context");
  } else {
    return context;
  }
};
