import React, { useState } from "react";
import Modal from "./Modal";

const RegisterModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return <Modal setIsOpen={setIsOpen} isOpen={isOpen} />;
};

export default RegisterModal;
