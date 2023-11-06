import axios from "axios";
import { Client } from "../../interfaces/";
import { getCookie } from "../../utils";

const createClientService = async (client: Client): Promise<any> => {
  try {
    const token = getCookie("accessToken=");
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/client`,
      client,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response;
  } catch (error: any) {
    console.error(error);
    return error;
  }
};

export { createClientService };
