import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import EditModalComponent from "../components/EditModalComponent";
import { useGetClient } from "../hooks";
import { useClientContext, useUpdateContext } from "../context";
import { ClientDetail } from "../components";
const LoadingSpinner = React.lazy(() => import("../components/Spinner"));

export const ClientPage = () => {
  const params = useParams();
  const { id } = params;
  const clientRaw = useGetClient(id);
  const { clients } = useClientContext();
  const client = clients.find((client) => client._id === clientRaw?._id);
  const { openModal, loading } = useUpdateContext();

  return (
    <div className="md:max-h-[100%] md:h-[610px] md:overflow-y-scroll rounded-md">
      {loading && (
        <div className="w-full h-full grid place-content-center">
          <Suspense fallback={<div>Loading...</div>}>
            <LoadingSpinner />
          </Suspense>
        </div>
      )}
      {client && <ClientDetail client={client} />}

      {openModal && <EditModalComponent />}
    </div>
  );
};
