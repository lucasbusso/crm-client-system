import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import EditForm from "./EditForm";
import { useUpdateContext } from "../context";

const EditModalComponent = (): JSX.Element => {
  const { openModal, setOpenModal, setClientUpdate } = useUpdateContext();

  function closeModal() {
    setOpenModal(false);
    setClientUpdate(null);
  }

  return (
    <>
      <Modal
        show={openModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation
      >
        <Modal.Header className="justify-end border-none pb-0">
          <Button
            onClick={closeModal}
            className="text-black text-2xl hover:bg-transparent border-none"
          >
            ✕
          </Button>
        </Modal.Header>
        <EditForm />
      </Modal>
    </>
  );
};

export default EditModalComponent;
