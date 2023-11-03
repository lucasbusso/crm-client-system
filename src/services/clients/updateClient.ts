import axios, { AxiosError, AxiosResponse } from "axios";
import { Client } from "../../interfaces/form.interface";
import { getCookie } from "../../utils";

const updateClient = async (
  id: string,
  client: Client
): Promise<AxiosResponse | AxiosError> => {
  try {
    const token = getCookie("accessToken=");
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/client/${id}`,
      client,
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

export { updateClient };
