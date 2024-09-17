import { Button } from "react-bootstrap";
import CustomModal from "./CustomModal";
import { useUpdateContext } from "../context";
import { useNavigate } from "react-router-dom";
import React from "react";
const LoadingSpinner = React.lazy(() => import("../components/Spinner"));

const ConfirmDelete = ({ id }: { id?: string }): JSX.Element => {
  const { confirm, setConfirm, handleDelete, loading } = useUpdateContext();
  const navigate = useNavigate();

  function handleConfirmDelete() {
    setConfirm(false);
  }

  return (
    <CustomModal fn={handleConfirmDelete} state={confirm}>
      <div className="w-[100%] h-[140px] m-auto font-bold text-xl">
        <div className="text-center mb-6 ">
          ¿Estas seguro de eliminar el cliente?
        </div>
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => {
              handleDelete(id);
              navigate("/dashboard");
              setConfirm(false);
            }}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
          >
            {loading ? <LoadingSpinner /> : "Confirmar"}
          </Button>
          <Button
            onClick={() => setConfirm(false)}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};

export default ConfirmDelete;
