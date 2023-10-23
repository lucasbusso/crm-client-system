import axios from "axios";
import { User } from "../interfaces/form.interface";

const registerService = async (userData: User) => {
  try {
    const response = await axios.post(
      `http://localhost:3001/api/auth/register`,
      userData
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export { registerService };
