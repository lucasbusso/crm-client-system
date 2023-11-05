import axios, { AxiosResponse } from "axios";
import { getCookie } from "../../utils";
import { Client } from "../../interfaces/form.interface";

interface SuccessResponse extends AxiosResponse {
  data: {
    data: Client[];
  };
  status: number;
  statusText: string;
}

const getClients = async (query: string): Promise<SuccessResponse> => {
  try {
    const token = getCookie("accessToken=");
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/client${query}`,
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

export { getClients };
