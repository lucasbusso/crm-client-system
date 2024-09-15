import React, { Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import EditModalComponent from "../components/EditModalComponent";
import { useGetClient } from "../hooks";
import { useClientContext, useUpdateContext } from "../context";
const LoadingSpinner = React.lazy(() => import("../components/Spinner"));

export const ClientPage = () => {
  const { handleOpenEditModal, openModal, loading } = useUpdateContext();
  const params = useParams();
  const { id } = params;
  const clientRaw = useGetClient(id);
  const { clients } = useClientContext();
  const client = clients.find((client) => client._id === clientRaw?._id);

  return (
    <div className="md:max-h-[100%] md:h-[610px] md:overflow-y-scroll rounded-md">
      {loading && (
        <div className="w-full h-full grid place-content-center">
          <Suspense fallback={<div>Loading...</div>}>
            <LoadingSpinner />
          </Suspense>
        </div>
      )}
      {client && (
        <div
          className="mr-3 mb-3 bg-white shadow-sm rounded-md opacity-95 px-5 py-10"
          key={client._id}
          data-clientid={client._id}
        >
          <table className="min-w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  First Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Last Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Phone
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Business Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Debt
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Client Since
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-t px-4 py-2 text-sm">
                  {client.firstName}
                </td>
                <td className="border-t px-4 py-2 text-sm">
                  {client.lastName}
                </td>
                <td className="border-t px-4 py-2 text-sm">{client.email}</td>
                <td className="border-t px-4 py-2 text-sm">{client.phone}</td>
                <td className="border-t px-4 py-2 text-sm">
                  {client.businessName}
                </td>
                <td className="border-t px-4 py-2 text-sm">
                  <span
                    className={`font-bold text-white px-2 py-1 rounded-md ${
                      Number(client.debt) > 0 ? "bg-red-400" : "bg-green-400"
                    }`}
                  >
                    {client.debt}
                  </span>
                </td>
                <td className="border-t px-4 py-2 text-sm">
                  {client.createdAt}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-between my-3">
            <Link
              to="/dashboard"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
            >
              Go to Dashboard
            </Link>

            <button
              onClick={() => handleOpenEditModal(client._id)}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
            >
              Update Client
            </button>
          </div>
        </div>
      )}

      {openModal && <EditModalComponent />}
    </div>
  );
};
