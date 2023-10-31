import axios from "axios";
import { User } from "../interfaces/form.interface";

const registerService = async (userData: User) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/register`,
      userData
    );
    return { data: response.data, status: response.status };
  } catch (error: any) {
    const { response } = error;
    return response;
  }
};

export { registerService };
