import { useClientContext } from "../context/client.context";

const Client = () => {
  const { clients } = useClientContext();

  return (
    <>
      {clients.length > 0 &&
        clients.map((client) => (
          <div
            className="m-3 bg-white shadow-md rounded-md px-5 py-10 "
            key={client.name}
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
          </div>
        ))}
    </>
  );
};

export default Client;
