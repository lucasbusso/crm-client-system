import axios from "axios";
import { RegistrationData } from "@/interfaces/redux.interface";

const registerService = async (userData: RegistrationData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/register`,
      userData
    );
    return { data: response.data, status: response.status };
  } catch (error: any) {
    const { code } = error;
    return { code };
  }
};

export { registerService };
