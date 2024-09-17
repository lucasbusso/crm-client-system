import axios from "axios";
import { getCookie } from "../../utils";
import { Client } from "../../interfaces/";

const getClient = async (id: string | undefined): Promise<Client> => {
  console.log(id);
  try {
    const token = getCookie("accessToken=");
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/client/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data as Client;
  } catch (error: any) {
    return error;
  }
};

export { getClient };
