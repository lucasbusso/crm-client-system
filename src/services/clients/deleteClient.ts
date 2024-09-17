import axios from "axios";
import { getCookie } from "../../utils";

const deleteClient = async (id: string): Promise<any> => {
  try {
    const token = getCookie("accessToken=");
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/client/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response;
  } catch (error: any) {
    return error;
  }
};

export { deleteClient };
