import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

interface ToastProps {
  errorMessage: any;
}

const ErrorNotification: React.FC<ToastProps> = ({
  errorMessage,
}): JSX.Element => {
  const [show, setShow] = useState(true);
  return (
    <ToastContainer
      position="bottom-center"
      className="text-center text-white opacity-80 mx-auto w-[500px] mb-12"
    >
      <Toast
        delay={3000}
        autohide
        onClose={() => setShow(false)}
        show={show}
        animation
        bg="danger"
        className="w-full"
      >
        <Toast.Body>{errorMessage}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ErrorNotification;
