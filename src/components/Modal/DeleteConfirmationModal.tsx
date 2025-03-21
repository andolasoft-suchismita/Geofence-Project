import React from "react";
import { GoAlert } from 'react-icons/go';

interface DeleteConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ onConfirm, onCancel }) => {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-9999">
      <div className="rounded bg-white p-6 text-center shadow-md">
        <div className="mb-4 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FEE2E2]">
            <GoAlert className="text-4xl text-[#FF0000]" />
          </div>
        </div>

        <p className="mb-4 font-semibold text-[#333333]">
          Are you sure you want to delete this user?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="rounded bg-red px-4 py-2 text-white hover:bg-[#FF0000]"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
