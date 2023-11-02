import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

interface ToastProps {
  message: any;
  statusColor?: "danger" | "success";
}

const Notification: React.FC<ToastProps> = ({
  message,
  statusColor = "danger",
}): JSX.Element => {
  const [show, setShow] = useState(true);
  return (
    <ToastContainer
      position="bottom-center"
      className="text-center text-white opacity-80 mx-auto w-[500px] mb-4"
    >
      <Toast
        delay={3000}
        autohide
        onClose={() => setShow(false)}
        show={show}
        animation
        bg={statusColor}
        className="w-full"
      >
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default Notification;
