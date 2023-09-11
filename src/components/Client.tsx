import { useClientContext } from "../context/client.context";
import ModalComponent from "./Modal";

const Client = () => {
  const { clients, setClientId, deleteClient } = useClientContext();

  return (
    <>
      {clients.length ? (
        clients.map((client) => (
          <div
            className="m-3 bg-white shadow-md rounded-md px-5 py-10 "
            key={client.id}
            data-clientid={client.id}
          >
            <p className="uppercase font-bold text-slate-600 my-3">
              Name:{" "}
              <span className="font-normal normal-case">{client.name}</span>
            </p>
            <p className="uppercase font-bold text-slate-600 my-3">
              Client email:{" "}
              <span className="font-normal normal-case">{client.email}</span>
            </p>

            <p className="uppercase font-bold text-slate-600 my-3">
              Business name:{" "}
              <span className="font-normal normal-case">{client.business}</span>
            </p>

            <p className="uppercase font-bold text-slate-600 my-3">
              Client since:{" "}
              <span className="font-normal normal-case">{client.date}</span>
            </p>

            <p className="uppercase font-bold text-slate-600 my-3">
              Description:{" "}
              <span className="font-normal normal-case">
                {client.description}
              </span>
            </p>
            <div className="flex justify-start gap-[24px]">
              <button
                type="button"
                className="py-2 px-5 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded"
                onClick={() => setClientId(client.id)}
              >
                Edit
              </button>
              <button
                type="button"
                className="py-2 px-5 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded"
                onClick={() => deleteClient(client.id)}
              >
                Delete
              </button>
            </div>
            <ModalComponent />
            <div className="pt-4 text-sm text-slate-400 flex justify-end">
              {client.modifiedDate}
            </div>
          </div>
        ))
      ) : (
        <div className="w-full h-full text-center mt-[32px]">
          <p className="uppercase text-xl">There are no registered clients</p>
        </div>
      )}
    </>
  );
};

export default Client;
