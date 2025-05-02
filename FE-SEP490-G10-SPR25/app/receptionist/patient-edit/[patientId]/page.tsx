"use client";
import React, { useEffect, useState } from "react";
import { patientService } from "@/common/services/patientService";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default function EditPatientPage({
  params,
}: {
  params: { patientId: string };
}) {
  const imgUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<IUser>>({
    avatarUrl: "",
    userId: String(parseInt(params.patientId, 10)),
    userName: "",
    phone: "",
    gender: "Nam",
    dob: format(new Date(), "yyyy-MM-dd"),
    address: "",
    isVerify: true,
    isActive: true,
  });
  const [loading, setLoading] = useState({ get: true, submit: false });
  const [error, setError] = useState<string | null>(null);
  const [searchId, setSearchId] = useState("");
  const [patient, setPatient] = useState<IPatientDetail | null>(null);
  const [guardianOld, setGuardianOld] = useState<IPatientDetail | null>(null);

  // Hàm chuyển đổi từ chuỗi dd/MM/yyyy sang Date object
  const parseDobString = (dobString: string): Date | null => {
    try {
      return parse(dobString, "dd/MM/yyyy", new Date());
    } catch {
      return null;
    }
  };

  // Hàm format ngày thành chuỗi yyyy-MM-dd để lưu vào state
  const formatDobForState = (date: Date): string => {
    return format(date, "yyyy-MM-dd");
  };

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const patientData = await patientService.getPatientDetailById(
          params.patientId
        );

        setGuardianOld(patientData);
        if (patientData?.guardian?.userId) {
          setSearchId(String(patientData.guardian.userId));
        }
        // Xử lý ngày sinh từ API (định dạng dd/MM/yyyy)
        let dobDate = new Date();
        if (patientData.dob) {
          const parsedDate = parseDobString(patientData.dob);
          if (parsedDate) {
            dobDate = parsedDate;
          }
        }

        setFormData({
          avatarUrl: patientData.avatarUrl || "",
          userId: String(parseInt(params.patientId, 10)),
          userName: patientData.userName || patientData.userName || "", // Xử lý cả username và userName
          phone: patientData.phone || patientData.phone || "", // Xử lý cả phone và phoneNumber
          gender: patientData.gender || "Nam",
          dob: formatDobForState(dobDate),
          address: patientData.address || "",
          isVerify: patientData.isVerify || false,
          isActive: patientData.isActive ?? true,
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch patient data"
        );
      } finally {
        setLoading((prev) => ({ ...prev, get: false }));
      }
    };

    fetchPatientData();
  }, [params.patientId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Hiển thị cửa sổ xác nhận
    const isConfirmed = window.confirm(
      "Bạn có chắc chắn muốn lưu thay đổi thông tin bệnh nhân?"
    );
    if (!isConfirmed) return;

    setLoading((prev) => ({ ...prev, submit: true }));
    setError(null);

    try {
      // Gọi API cập nhật thông tin cá nhân
      await patientService.updatePatientContact({
        ...formData,
        userId: String(parseInt(params.patientId, 10)),
      } as IUser);
      console.log("Cập nhật thông tin thành công");

      // Gọi API cập nhật giám hộ
      if (searchId) {
        const guardianId = parseInt(searchId, 10);
        await patientService.updateGuardianOfPatient({
          patientId: parseInt(params.patientId, 10),
          guardianId: guardianId,
        });
        console.log(
          "Cập nhật giám hộ thành công",
          guardianId,
          params.patientId
        );
      } else {
        console.log("Không có giám hộ để cập nhật");
      }

      router.push(`/receptionist/patient-detail/${params.patientId}`);
    } catch (err) {
      console.error("Lỗi khi cập nhật:", err);
      setError(err instanceof Error ? err.message : "Lỗi không xác định");
    } finally {
      setLoading((prev) => ({ ...prev, submit: false }));
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setFormData((prev) => ({ ...prev, dob: format(date, "yyyy-MM-dd") }));
    }
  };
  const handleSearchById = async () => {
    try {
      const result = await patientService.getPatientDetailById(searchId);
      setPatient(result);
      setError(null);
    } catch (err) {
      setPatient(null);
    }
  };
  if (loading.get) return <div className="p-8">Loading patient data...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <>
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Chỉnh sửa hồ sơ bệnh nhân</h1>
        <Link
          href={`/receptionist/patient-detail/${formData.userId}`}
          className="inline-flex items-center text-blue-600 hover:underline"
        >
          ← Quay lại chi tiết bệnh nhân
        </Link>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative mb-6">
              <div className="absolute inset-0 rounded-2xl shadow-lg" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white">
                {formData.avatarUrl ? (
                  <Image
                    src={`${imgUrl}/${formData.avatarUrl}`}
                    width={1920}
                    height={1080}
                    alt={`Avatar of ${formData.userName}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-lg">Chưa có ảnh</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="form-group mb-4">
                <label className="block text-sm font-medium mb-2">Họ tên</label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="form-group mb-4">
                <label className="block text-sm font-medium mb-2">
                  Điện thoại
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                  pattern="[0-9]{10,15}"
                  title="Số điện thoại phải có 10-15 chữ số"
                />
              </div>

              <div className="form-group mb-4">
                <label className="block text-sm font-medium mb-2">
                  Giới tính
                </label>
                <select
                  name="gender"
                  value={formData.gender || "Nam"}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  {/* <option value="Khác">Khác</option> */}
                </select>
              </div>

              <div className="form-group mb-4">
                <label className="block text-sm font-medium mb-2">
                  Ngày sinh
                </label>
                <DatePicker
                  selected={
                    formData.dob
                      ? parse(formData.dob, "yyyy-MM-dd", new Date())
                      : null
                  }
                  onChange={handleDateChange}
                  className="w-full p-2 border rounded"
                  dateFormat="dd/MM/yyyy"
                  showYearDropdown
                  dropdownMode="select"
                  placeholderText="Chọn ngày sinh"
                />
              </div>
            </div>

            <div className="form-group md:col-span-2">
              <label className="block text-sm font-medium mb-2">Địa chỉ</label>
              <input
                type="text"
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          {guardianOld ? (
            <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Họ tên</th>
                  <th className="p-2 border">Điện thoại</th>
                  <th className="p-2 border">Giới tính</th>
                  <th className="p-2 border">Ngày sinh</th>
                  <th className="p-2 border">Địa chỉ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border">{guardianOld.guardian?.userId}</td>
                  <td className="p-2 border">
                    {guardianOld.guardian?.userName}
                  </td>
                  <td className="p-2 border">{guardianOld.guardian?.phone}</td>
                  <td className="p-2 border">{guardianOld.guardian?.gender}</td>
                  <td className="p-2 border">{guardianOld.guardian?.dob}</td>
                  <td className="p-2 border">
                    {guardianOld.guardian?.address}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <h3>Không có người giám hộ!.</h3>
          )}

          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border rounded hover:bg-gray-50"
              disabled={loading.submit}
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 disabled:opacity-50"
              disabled={loading.submit}
            >
              {loading.submit ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        </form>
        {/* Bảng tra cứu*/}
        <div className="mt-12 border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">
            Xác nhận giám hộ mới theo ID
          </h2>

          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Nhập ID giám hộ"
              className="p-2 border rounded w-full max-w-xs"
            />
            <button
              onClick={handleSearchById}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Tra cứu
            </button>
          </div>

          {patient && (
            <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Họ tên</th>
                  <th className="p-2 border">Điện thoại</th>
                  <th className="p-2 border">Giới tính</th>
                  <th className="p-2 border">Ngày sinh</th>
                  <th className="p-2 border">Địa chỉ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border">{patient.userId}</td>
                  <td className="p-2 border">{patient.userName}</td>
                  <td className="p-2 border">{patient.phone}</td>
                  <td className="p-2 border">{patient.gender}</td>
                  <td className="p-2 border">{patient.dob}</td>
                  <td className="p-2 border">{patient.address}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
