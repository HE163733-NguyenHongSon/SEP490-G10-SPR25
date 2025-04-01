'use client';


export type Specialty = {
  name: string;
  email: string;
  country: string;
  date: string;
};

type Props = {
  data: Specialty;
  setData: (data: Specialty) => void;
  onClose: () => void;
  onSave: () => void;
};

export default function AddSpecialtyForm({ data, setData, onClose, onSave }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl relative space-y-5">
        <h3 className="text-xl font-semibold text-gray-700">Thêm mới chuyên khoa</h3>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 gap-5">
          <input
            type="text"
            placeholder="Tên"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="border p-3 rounded w-full"
          />
          <input
            type="text"
            placeholder="Mô tả"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="border p-3 rounded w-full"
          />
          <input
            type="text"
            placeholder="Link ảnh (URL)"
            value={data.country}
            onChange={(e) => setData({ ...data, country: e.target.value })}
            className="border p-3 rounded w-full"
          />
          <input
            type="text"
            placeholder="Ngày tạo"
            value={data.date}
            onChange={(e) => setData({ ...data, date: e.target.value })}
            className="border p-3 rounded w-full"
          />
        </div>

        <button
          onClick={onSave}
          className="mt-4 w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 text-base font-medium"
        >
          Lưu
        </button>
      </div>
    </div>
  );
}
