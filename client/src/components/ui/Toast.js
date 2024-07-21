import React from "react";
import { Toast as BootstrapToast, ToastContainer } from "react-bootstrap";

const Toast = ({ show, onClose, message, color }) => {
  return (
    <ToastContainer position="top-end" className="p-2">
      <BootstrapToast
        show={show}
        onClose={onClose}
        delay={5000}
        bg={color?.toLowerCase()}
        autohide
      >
        <BootstrapToast.Body className="text-white">
          {message}
        </BootstrapToast.Body>
      </BootstrapToast>
    </ToastContainer>
  );
};

export default Toast;
