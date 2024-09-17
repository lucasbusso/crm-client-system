import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ReactElement } from "react";

const CustomModal = ({
  children,
  state,
  fn,
}: {
  children: ReactElement;
  state: boolean;
  fn: () => void;
}): JSX.Element => {
  return (
    <>
      <Modal
        show={state}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation
      >
        <Modal.Header className="justify-end border-none pb-0">
          <Button
            onClick={fn}
            className="text-black text-2xl hover:bg-transparent border-none"
          >
            ✕
          </Button>
        </Modal.Header>
        {children}
      </Modal>
    </>
  );
};

export default CustomModal;
