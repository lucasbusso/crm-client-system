import React, { createContext, useContext, useState } from "react";
import { SetStateAction, Dispatch } from "react";

interface UserContextProps {
  register: boolean;
  setRegister: Dispatch<SetStateAction<boolean>>;
}

const RegisterContext = createContext<UserContextProps | null>(null);

export const RegisterProvider: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const [register, setRegister] = useState<boolean>(false);

  const value: UserContextProps = {
    register,
    setRegister,
  };
  return (
    <RegisterContext.Provider value={value}>
      {children}
    </RegisterContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error("No context");
  } else {
    return context;
  }
};
