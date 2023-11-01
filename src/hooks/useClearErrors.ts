import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { clearAuthError } from "../redux/slices/auth.slice";
import { clearRegisterError } from "../redux/slices/register.slice";

/**
 * Dispatch clear error Redux field (register and login)
 */
export function useClearErrors() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
      dispatch(clearRegisterError());
    };
  }, [dispatch]);
}
