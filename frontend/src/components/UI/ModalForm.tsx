import React, { ReactNode } from 'react';
import Modal from 'react-modal';

interface ModalFormProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: ReactNode;
}

const ModalForm: React.FC<ModalFormProps> = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md"
      overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75"
    >
      {children}
    </Modal>
  );
};

export default ModalForm;
