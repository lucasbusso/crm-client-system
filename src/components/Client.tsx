import React, { Suspense } from "react";
import { useClientContext } from "../context/client.context";
import ModalComponent from "./Modal";
const LoadingSpinner = React.lazy(() => import("../components/Spinner"));

const Client = () => {
  const { clients, loading } = useClientContext();

  // async function handleSubmitDelete(e: React.FormEvent<HTMLFormElement>) {

  // }

  return (
    <div className="md:max-h-[100%] md:h-[660px] md:overflow-y-scroll">
      {loading ? (
        <div className="w-full h-full grid place-content-center">
          <Suspense>
            <LoadingSpinner />
          </Suspense>
        </div>
      ) : clients && clients.length > 0 ? (
        clients.map((client) => (
          <div
            className="mr-3 mb-3 bg-white shadow-md rounded-md px-5 py-10 "
            key={client._id}
            data-clientid={client._id}
          >
            <p className="uppercase font-bold text-slate-600 my-3">
              First Name:{" "}
              <span className="font-normal normal-case">
                {client.firstName}
              </span>
            </p>
            <p className="uppercase font-bold text-slate-600 my-3">
              Last Name:{" "}
              <span className="font-normal normal-case">{client.lastName}</span>
            </p>
            <p className="uppercase font-bold text-slate-600 my-3">
              Client email:{" "}
              <span className="font-normal normal-case">{client.email}</span>
            </p>

            <p className="uppercase font-bold text-slate-600 my-3">
              Business name:{" "}
              <span className="font-normal normal-case">
                {client.businessName}
              </span>
            </p>

            <p className="uppercase font-bold text-slate-600 my-3">
              Client since:{" "}
              <span className="font-normal normal-case">
                {client.antiquity}
              </span>
            </p>

            <p className="uppercase font-bold text-slate-600 my-3">
              Debt:{" "}
              <span className="font-normal normal-case">{client.debt}</span>
            </p>
            <div className="flex justify-start gap-[24px]">
              <button
                type="button"
                className="py-2 px-5 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded"
              >
                Edit
              </button>
            </div>
            <ModalComponent />
            <div className="pt-4 text-sm text-slate-400 flex justify-end">
              {client.updatedAt}
            </div>
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
