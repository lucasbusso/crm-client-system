import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { NotificationProps } from "../interfaces/form.interface";

const Notification: React.FC<NotificationProps> = ({
  errorMessage,
  error,
}): JSX.Element => {
  const [close, setClose] = useState(error);

  return (
    <ToastContainer position="bottom-start" className="w-full">
      <Toast
        onClose={() => setClose(false)}
        show={close}
        delay={3000}
        autohide
        animation
        bg="danger"
        className="w-full"
      >
        <Toast.Header>
          <strong className="me-auto">Fix the following fields:</strong>
        </Toast.Header>
        <Toast.Body>
          {errorMessage.map((error) => (
            <li key={error} className="text-white text-lg">
              {error}
            </li>
          ))}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default Notification;
