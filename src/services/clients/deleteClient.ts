import axios from "axios";
import { getCookie } from "../../utils";

const deleteClientService = async (id: string): Promise<any> => {
  try {
    const token = getCookie("accessToken=");
    const response = await axios.post(
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

export { deleteClientService };
