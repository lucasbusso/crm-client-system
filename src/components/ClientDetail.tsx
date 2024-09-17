import { normalizeId } from "../utils/normalizeId";
import { useUpdateContext } from "../context";
import { Client } from "../interfaces";
import { Link } from "react-router-dom";

const ClientDetail = ({ client }: { client: Client }) => {
  const { handleOpenEditModal, setConfirm } = useUpdateContext();

  return (
    <div
      className=" mb-3 bg-white shadow-sm rounded-md opacity-95 px-5 py-10"
      key={normalizeId(client)}
      data-clientid={normalizeId(client)}
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
            <td className="border-t px-4 py-2 text-sm">{client.firstName}</td>
            <td className="border-t px-4 py-2 text-sm">{client.lastName}</td>
            <td className="border-t px-4 py-2 text-sm">{client.email}</td>
            <td className="border-t px-4 py-2 text-sm">{client.phone}</td>
            <td className="border-t px-4 py-2 text-sm">
              {client.businessName}
            </td>
            <td className="border-t px-4 py-2 text-sm">
              <span
                className={`font-bold text-white px-2 py-1 rounded-md d ${
                  client.role == "cliente" ? "bg-green-400" : "bg-red-400"
                }`}
              >
                {client.debt}
              </span>
            </td>
            <td className="border-t px-4 py-2 text-sm">{client.createdAt}</td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-between my-3">
        <Link
          to="/dashboard"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        >
          Back to Dashboard
        </Link>

        <div className="flex gap-4">
          <button
            onClick={() => handleOpenEditModal(normalizeId(client))}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
          >
            Update Client
          </button>
          <button
            onClick={() => setConfirm(true)}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
          >
            Delete Client
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientDetail;
