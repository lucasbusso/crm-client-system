import React, { Suspense } from "react";
import { useClientContext, useUpdateContext } from "../context/";
import { Link } from "react-router-dom";
const LoadingSpinner = React.lazy(() => import("./Spinner"));

const Client = () => {
  const { clients, loading } = useClientContext();
  const { handleOpenEditModal } = useUpdateContext();

  return (
    <div className="md:max-h-[100%] md:h-[610px] md:overflow-y-scroll rounded-md">
      {loading ? (
        <div className="w-full h-full grid place-content-center">
          <Suspense>
            <LoadingSpinner />
          </Suspense>
        </div>
      ) : clients && clients.length > 0 ? (
        clients.map((client) => (
          <div
            className="mr-3 mb-3 bg-white shadow-sm rounded-md opacity-95 px-5 py-10"
            key={client._id}
            data-clientid={client._id}
          >
            <div className="flex gap-10">
              <p className="uppercase font-bold text-slate-600 py-2">
                First Name:{" "}
                <span className="font-normal normal-case">
                  {client.firstName}
                </span>
              </p>
              <p className="uppercase font-bold text-slate-600 py-2">
                Last Name:{" "}
                <span className="font-normal normal-case">
                  {client.lastName}
                </span>
              </p>
            </div>
            <div className="flex gap-10">
              <p className="uppercase font-bold text-slate-600 py-2">
                Email:{" "}
                <span className="font-normal normal-case">{client.email}</span>
              </p>
              <p className="uppercase font-bold text-slate-600 py-2">
                Phone:{" "}
                <span className="font-normal normal-case">{client.phone}</span>
              </p>
            </div>
            <p className="uppercase font-bold text-slate-600 py-2">
              Business name:{" "}
              <span className="font-normal normal-case">
                {client.businessName}
              </span>
            </p>
            <p className="uppercase font-bold text-slate-600 py-2">
              Client since:{" "}
              <span className="font-normal normal-case">
                {client.createdAt}
              </span>
            </p>
            <p className="uppercase font-bold text-slate-600 py-2">
              Debt:{" "}
              <span
                className={`font-bold normal-case text-white px-2 py-1 rounded-md ${
                  client.role == "cliente" ? "bg-green-400" : "bg-red-400"
                }`}
              >
                {client.debt}
              </span>
            </p>
            <div className="flex justify-between my-3">
              <Link className="font-semibold" to={`/dashboard/${client._id}`}>
                View details →
              </Link>
              <p className="text-sm text-slate-400">{client.updatedAt}</p>
            </div>

            <p
              className="cursor-pointer font-semibold"
              onClick={() => handleOpenEditModal(client._id)}
            >
              Update
            </p>
          </div>
        ))
      ) : (
        <div className="w-full h-full text-center mt-[32px]">
          <p className="uppercase text-xl">There are no registered clients</p>
        </div>
      )}
    </div>
  );
};

export default Client;
