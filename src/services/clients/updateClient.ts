import axios, { AxiosError, AxiosResponse } from "axios";
import { Client } from "../../interfaces/";
import { getCookie } from "../../utils";

const updateClient = async (
  id: string,
  client: Client
): Promise<AxiosResponse | AxiosError> => {
  try {
    console.log("service:", { client });
    const token = getCookie("accessToken=");
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/client/${id}`,
      client,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log("from service" + { response });
    return response;
  } catch (error: any) {
    return error;
  }
};

export { updateClient };
