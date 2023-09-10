import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useClientContext } from "../context/client.context";
import EditForm from "./EditForm";

const ModalComponent = (): JSX.Element => {
  const { isEditing, setIsEditing, clients } = useClientContext();
  const client = clients.find((client) => client.id === isEditing);
  let showModal = isEditing ? true : false;

  function handleModal() {
    setIsEditing("");
    showModal = false;
  }

  return (
    <>
      {client && (
        <Modal
          show={showModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          animation
        >
          <Modal.Header className="justify-end border-none pb-0">
            <Button
              onClick={handleModal}
              className="text-black text-2xl hover:bg-transparent border-none"
            >
              X
            </Button>
          </Modal.Header>
          <EditForm client={client} />
        </Modal>
      )}
    </>
  );
};

export default ModalComponent;
