import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import { useGetClient } from "../hooks";
import { useClientContext, useUpdateContext } from "../context";
import { ClientDetail, ConfirmDelete, EditForm } from "../components";
import { normalizeId } from "../utils/normalizeId";
const LoadingSpinner = React.lazy(() => import("../components/Spinner"));

export const ClientPage = () => {
  const params = useParams();
  const { id } = params;
  const clientRaw = useGetClient(id);
  const { clients } = useClientContext();
  const client = clients.find(
    (client) => normalizeId(client) === normalizeId(clientRaw)
  );
  const { openModal, loading, confirm } = useUpdateContext();

  return (
    <div className="md:max-h-[100%] md:h-[610px]  rounded-md">
      {loading && (
        <div className="w-full h-full grid place-content-center">
          <Suspense fallback={<div>Loading...</div>}>
            <LoadingSpinner />
          </Suspense>
        </div>
      )}
      {client && <ClientDetail client={client} />}

      {openModal && <EditForm />}
      {confirm && <ConfirmDelete id={normalizeId(client)} />}
    </div>
  );
};
