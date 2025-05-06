"use client";

import { patientService } from "@/common/services/patientService";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useUser } from "@/common/contexts/UserContext";
import AvatarUploader from "./AvatarUploader";
import SelectPatient from "./medical-report/components/SelectPatient";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ProfilePage = () => {
  const { user } = useUser();
  const [patient, setPatient] = useState<IPatient | undefined>();
  const [userName, setUserName] = useState("");
  const [dob, setDob] = useState<Date | null>(null);
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const { data: patientList, refetch } = useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      const pd = await patientService.getPatientDetailById(user?.userId);
      const dependents = pd?.dependents || [];
      pd.relationship =
        dependents.length > 0 ? "Người giám hộ" : "Bệnh nhân chính";
      return [pd as IPatient, ...dependents];
    },
    staleTime: 30000,
    enabled: !!user?.userId,
  });

  const parseDate = (dateString: string): Date | null => {
    if (!dateString) return null;
    const [day, month, year] = dateString.split("/");
    const parsed = new Date(Number(year), Number(month) - 1, Number(day));
    return isNaN(parsed.getTime()) ? null : parsed;
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // ISO format: "YYYY-MM-DD"
  };

  const updateFieldsFromPatient = (pt: IPatient) => {
    setUserName(pt.userName || "");
    setDob(parseDate(pt.dob || ""));
    setAddress(pt.address || "");
    setPhone(pt.phone || "");
    setGender(pt.gender || "");
  };

  useEffect(() => {
    if (patientList && patientList.length > 0 && !patient) {
      const firstPatient = patientList[0];
      setPatient(firstPatient);
      updateFieldsFromPatient(firstPatient);
    }
  }, [patientList, patient]);

  const handleSelectPatient = (selected: IPatient) => {
    setPatient(selected);
    updateFieldsFromPatient(selected);
  };

  const handleReset = () => {
    if (patient) updateFieldsFromPatient(patient);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient) return;
    setIsSaving(true);

    const updatedPatient = {
      userId: patient.userId,
      userName,
      dob: dob ? formatDate(dob) : "",
      gender,
      address,
      phone,
      citizenId: patient.citizenId || "",
    };

    try {
      await patientService.updatePatientContact(updatedPatient);
      alert("Cập nhật hồ sơ thành công!");
      refetch();
    } catch (error) {
      console.error("Update failed:", error);
      alert("Cập nhật hồ sơ thất bại.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-8">
      <div className="row-span-1 flex flex-col gap-6 border-b border-gray-300 pb-6">
        <div className="flex flex-row items-center justify-center gap-10 w-full border-2 border-gray-300 rounded-lg p-6">
          <AvatarUploader
            avatarUrl={patient?.avatarUrl}
            userId={patient?.userId || ""}
            onUploaded={refetch}
          />
          <div className="flex flex-col items-center text-center text-gray-700 w-1/2">
            <h3 className="font-semibold text-2xl mb-2">
              Chọn hồ sơ người bệnh{" "}
              <SelectPatient
                patients={patientList || []}
                selectedPatient={patient}
                onChange={handleSelectPatient}
              />
            </h3>
          </div>
        </div>
      </div>

      <form
        className="bg-white p-10 rounded-lg shadow-md space-y-8"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-4 gap-6">
          <div>
            <label
              htmlFor="citizen_id"
              className="block text-sm font-medium text-gray-700"
            >
              Số CMND/CCCD
            </label>
            <input
              id="citizen_id"
              type="number"
              value={patient?.citizenId || ""}
              disabled
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div>
            <label
              htmlFor="user_name"
              className="block text-sm font-medium text-gray-700"
            >
              Họ và tên
            </label>
            <input
              id="user_name"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700"
            >
              Ngày sinh
            </label>
            <DatePicker
              selected={dob}
              onChange={(date: Date | null) => setDob(date)}
              dateFormat="dd/MM/yyyy"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giới tính
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="grid grid-cols-4 items-center gap-2">
            <div className="col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={patient?.email || ""}
                disabled
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-2">
            <div className="col-span-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Số điện thoại
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Địa chỉ
          </label>
          <textarea
            id="address"
            rows={2}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Sửa lại địa chỉ của bạn..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="flex justify-end gap-4 border-t pt-5 border-gray-200">
          <button
            type="reset"
            onClick={handleReset}
            className="text-gray-600 font-medium hover:underline transition"
          >
            Đặt lại
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2 bg-cyan-600 text-white font-semibold rounded-md shadow-sm hover:bg-cyan-700 transition"
          >
            {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
