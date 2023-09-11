import { Client, ClientEdit } from "../interfaces/form.interface";

export function setLocalStorageClient(client: Client | ClientEdit) {
  try {
    const key = `client_${client.id}`;
    const clientString = JSON.stringify(client);
    localStorage.setItem(key, clientString);
  } catch (error) {
    console.error(`Error saving client to localStorage: ${error}`);
    throw error;
  }
}

export function deleteLocalStorageClient(clientId: string) {
  try {
    const key = `client_${clientId}`;
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error deleting client from localStorage: ${error}`);
    throw error;
  }
}

export function retrieveClientsFromLocalStorage(): Client[] {
  const clients: Client[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("client_")) {
      const clientData = localStorage.getItem(key);
      if (clientData) {
        const client: Client = JSON.parse(clientData);
        clients.push(client);
      }
    }
  }
  return clients;
}
