import { useEffect, useState } from "react";
import { getClient } from "../services/clients/getClient";
import { Client } from "../interfaces/";

/**
 * Fetch the client with the given id
 * @param id client id
 * @returns client object
 */
const useGetClient = (id: string | undefined) => {
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    const fetchClient = async () => {
      const clientFetched = await getClient(id);
      setClient(clientFetched);
    };
    fetchClient();
  }, [id]);

  return client;
};
export default useGetClient;
