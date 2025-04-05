"use client";
import Image from "next/image";
import { useState } from "react";
import AddSpecialtyForm, { Specialty } from "./AddSpecialty";

const ITEMS_PER_PAGE = 3;

export default function CustomerTable() {
  const [specialties, setSpecialties] = useState<Specialty[]>([
    {
      name: "Mark Voldov",
      email: "mvoges@email.com",
      country: "https://source.unsplash.com/80x80/?doctor",
      date: "21 Sep, 2021",
    },
    {
      name: "Topias Kantola",
      email: "topiaskantola@email.com",
      country: "https://source.unsplash.com/80x80/?medicine",
      date: "21 Sep, 2021",
    },
    {
      name: "Anaiah Whitten",
      email: "anaiahwhitten@email.com",
      country: "https://source.unsplash.com/80x80/?clinic",
      date: "12 June, 2021",
    },
    {
      name: "Wyatt Morris",
      email: "wyattmorris@email.com",
      country: "https://source.unsplash.com/80x80/?hospital",
      date: "04 June, 2021",
    },
    {
      name: "Eliana Stout",
      email: "elianastout@email.com",
      country: "https://source.unsplash.com/80x80/?surgery",
      date: "01 June, 2021",
    },
  ]);

  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [showDetail, setShowDetail] = useState<Specialty | null>(null);
  const [formData, setFormData] = useState<Specialty>({
    name: "",
    email: "",
    country: "",
    date: "",
  });

  const totalPages = Math.ceil(specialties.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const visibleSpecialties = specialties.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleAddOrUpdate = () => {
    if (formMode === "add") {
      setSpecialties((prev) => [formData, ...prev]);
    } else if (formMode === "edit" && editingIndex !== null) {
      const updated = [...specialties];
      updated[editingIndex] = formData;
      setSpecialties(updated);
    }

    setFormData({ name: "", email: "", country: "", date: "" });
    setEditingIndex(null);
    setShowForm(false);
    setFormMode("add");
  };

  const handleEdit = (index: number) => {
    setFormData(specialties[index]);
    setEditingIndex(index);
    setFormMode("edit");
    setShowForm(true);
  };

  const handleDelete = (index: number) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xoá?");
    if (confirm) {
      const updated = [...specialties];
      updated.splice(index, 1);
      setSpecialties(updated);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 w-full h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-gray-800 font-semibold">
            Danh sách chuyên khoa
          </h2>
          <button
            onClick={() => {
              setShowForm(true);
              setFormMode("add");
              setFormData({ name: "", email: "", country: "", date: "" });
            }}
            className="text-sm text-blue-500 hover:underline"
          >
            Thêm mới
          </button>
        </div>

        {showForm && (
          <AddSpecialtyForm
            data={formData}
            setData={setFormData}
            onClose={() => setShowForm(false)}
            onSave={handleAddOrUpdate}
          />
        )}

        {/* Bảng danh sách */}
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-2">Tên</th>
              <th>Mô tả</th>
              <th>Ảnh</th>
              <th>Ngày tạo</th>
              <th className="text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {visibleSpecialties.map((c, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-2">{c.name}</td>
                <td>{c.email}</td>
                <td>
                  <Image
                    src={c.country}
                    alt="Specialty"
                    width={48}
                    height={48}
                    className="object-cover rounded"
                  />{" "}
                </td>
                <td>{c.date}</td>
                <td className="flex flex-wrap justify-center gap-2 py-2">
                  <button
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => setShowDetail(c)}
                  >
                    Chi tiết
                  </button>
                  <button
                    className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => handleEdit(startIndex + i)}
                  >
                    Cập nhật
                  </button>
                  <button
                    onClick={() => handleDelete(startIndex + i)}
                    className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
                    title="Xoá"
                  >
                    {/* 🗑 */}
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form Chi tiết */}
      {showDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl relative space-y-5">
            <button
              onClick={() => setShowDetail(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold text-gray-700">
              Chi tiết chuyên khoa
            </h3>
            <div className="space-y-5 text-base text-gray-800">
              <div>
                <strong>Tên:</strong> {showDetail.name}
              </div>
              <div>
                <strong>Mô tả:</strong> {showDetail.email}
              </div>
              <div>
                <strong>Ngày tạo:</strong> {showDetail.date}
              </div>
              <div>
                <strong>Ảnh:</strong>
                <Image
                  src={showDetail.country}
                  alt="Specialty"
                  width={128}
                  height={128}
                  className="mt-2 object-cover rounded"
                />
              </div>
            </div>
          </div>
        </div>
      )}

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
              page === idx + 1 ? "bg-blue-500 text-white" : ""
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
