import React, { Suspense } from "react";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import useGetClient from "../hooks/useGetClient";
const LoadingSpinner = React.lazy(() => import("../components/Spinner"));

export const ClientPage: React.FC<{}> = () => {
  const params = useParams();
  const { id } = params;
  const client = useGetClient(id);

  return (
    <div className="h-full">
      <Link to="/dashboard">Dashboard</Link>
      {!client ? (
        <div className="w-full h-full grid place-content-center">
          <Suspense>
            <LoadingSpinner />
          </Suspense>
        </div>
      ) : (
        <div>{client.firstName}</div>
      )}
    </div>
  );
};
