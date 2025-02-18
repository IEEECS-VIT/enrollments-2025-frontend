interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  message,
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "Cancel",
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center font-retro-gaming">
      <div className="bg-black p-6 rounded-xl shadow-lg text-center border-2 border-white ">
        <p
          className="text-lg font-semibold leading-10"
          style={{ whiteSpace: "pre-line" }}
        >
          {message}
        </p>
        <div className="flex justify-center mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg mx-2"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg mx-2"
            onClick={onCancel}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
