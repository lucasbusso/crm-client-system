import axios from "axios";
import { AuthCredentials } from "../../interfaces/redux.interface";

const loginService = async (userData: AuthCredentials) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      userData
    );
    return response;
  } catch (error: any) {
    const { response } = error;
    return response;
  }
};

export { loginService };
