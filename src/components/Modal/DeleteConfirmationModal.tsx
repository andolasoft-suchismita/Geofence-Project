import React from "react";

interface DeleteConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ onConfirm, onCancel }) => {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <h3 className="text-lg font-semibold mb-4 ">Confirm Delete</h3>
        <p className="mb-4">Are you sure you want to delete this user?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
          >
            Yes, Delete
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
