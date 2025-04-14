interface ModalProps {
    message: string;
    onConfirm: (reason: string) => void;
    onCancel: () => void;
    onChangeReason: (reason: string) => void; // Added onChangeReason
    cancellationReason: string; // Added cancellationReason
  }
  
export const Modal = ({
    message,
    onConfirm,
    onCancel,
    onChangeReason,
    cancellationReason,
  }: ModalProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangeReason(event.target.value); // Use the passed down onChangeReason
    };
  
    const handleConfirm = () => {
      onConfirm(cancellationReason); // Use the passed down cancellationReason
    };
  
    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded-md shadow-lg">
          <p className="text-lg">{message}</p>
          <div className="mt-4">
            <input
              type="text"
              value={cancellationReason}
              onChange={handleChange}
              placeholder="Nhập lý do hủy"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 mr-2 bg-gray-200 rounded-md"
            >
              Hủy
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-cyan-600 text-white rounded-md"
              disabled={!cancellationReason.trim()}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    );
  };
  