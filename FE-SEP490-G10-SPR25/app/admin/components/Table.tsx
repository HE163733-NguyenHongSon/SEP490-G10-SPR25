'use client';

import { useState } from 'react';

type Specialties = {
  name: string;
  email: string;
  country: string;
  date: string;
};

const ITEMS_PER_PAGE = 3;

export default function CustomerTable() {
  const [specialties, setSpecialties] = useState<Specialties[]>([
    {
      name: 'Mark Voldov',
      email: 'mvoges@email.com',
      country: 'Russia',
      date: '21 Sep, 2021',
    },
    {
      name: 'Topias Kantola',
      email: 'topiaskantola@email.com',
      country: 'Brazil',
      date: '21 Sep, 2021',
    },
    {
      name: 'Anaiah Whitten',
      email: 'anaiahwhitten@email.com',
      country: 'Poland',
      date: '12 June, 2021',
    },
    {
      name: 'Wyatt Morris',
      email: 'wyattmorris@email.com',
      country: 'Kenya',
      date: '04 June, 2021',
    },
    {
      name: 'Eliana Stout',
      email: 'elianastout@email.com',
      country: 'Usa',
      date: '01 June, 2021',
    },
  ]);

  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [newSpecialty, setNewSpecialty] = useState<Specialties>({
    name: '',
    email: '',
    country: '',
    date: '',
  });

  const totalPages = Math.ceil(specialties.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const visibleSpecialties = specialties.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleAddNew = () => {
    setSpecialties((prev) => [newSpecialty, ...prev]);
    setShowForm(false);
    setNewSpecialty({ name: '', email: '', country: '', date: '' });
    setPage(1); // Quay lại trang đầu
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 w-full h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg text-gray-800 font-semibold">Danh sách chuyên khoa</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="text-sm text-blue-500 hover:underline"
          >
            {showForm ? 'Đóng' : 'Thêm mới'}
          </button>
        </div>

          {showForm && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Thêm mới chuyên khoa</h3>
        
        <button
          onClick={() => setShowForm(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Tên"
            value={newSpecialty.name}
            onChange={(e) => setNewSpecialty({ ...newSpecialty, name: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Mô tả"
            value={newSpecialty.email}
            onChange={(e) => setNewSpecialty({ ...newSpecialty, email: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Ảnh (URL hoặc mô tả)"
            value={newSpecialty.country}
            onChange={(e) => setNewSpecialty({ ...newSpecialty, country: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Ngày tạo (vd: 23 Mar, 2025)"
            value={newSpecialty.date}
            onChange={(e) => setNewSpecialty({ ...newSpecialty, date: e.target.value })}
            className="border p-2 rounded w-full"
          />
        </div>

        <button
          onClick={handleAddNew}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Lưu
        </button>
      </div>
    </div>
  )}


        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-2">Tên</th>
              <th>Mô tả</th>
              <th>Ảnh</th>
              <th>Ngày tạo</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {visibleSpecialties.map((c, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-2">{c.name}</td>
                <td>{c.email}</td>
                <td>{c.country}</td>
                <td>{c.date}</td>
                <td className="space-x-2 py-2">
                  <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                    Chi tiết
                  </button>
                  <button className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600">
                    Cập nhật
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 text-gray-800 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx + 1)}
            className={`px-3 py-1 text-gray-800 border rounded ${
              page === idx + 1 ? 'bg-blue-500 text-white' : ''
            }`}
          >
            {idx + 1}
          </button>
        ))}
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 text-gray-800 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
