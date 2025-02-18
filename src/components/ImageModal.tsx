interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  return (
    <>
      <div className="fixed inset-0 bg-black opacity-90 z-40 rounded-3xl"></div>

      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-black p-6 rounded-3xl shadow-lg relative border-4 border-yellow-400">
          <button
            className="absolute top-2 right-1 text-3xl text-yellow-400 hover:text-white transition"
            onClick={onClose}
          >
            &times;
          </button>
          <img
            src={imageUrl}
            alt="Question Image"
            className="max-w-full max-h-[50vh] rounded-2xl"
          />
        </div>
      </div>
    </>
  );
};

export default ImageModal;
