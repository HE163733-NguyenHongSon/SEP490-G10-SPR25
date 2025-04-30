import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUser } from "@/common/contexts/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { addPatientAsync } from "../redux/bookingThunks";
import type { AppDispatch, RootState } from "../../store";

import { setIsAddingPatient, setPatients } from "../redux/bookingSlice";
import { format } from "date-fns";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddPatientForm = ({ onClose }: { onClose: () => void }) => {
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState<Date | null>(null);
  const [gender, setGender] = useState("Nam");
  const [citizenId, setCitizenId] = useState("");
  const [relationship, setRelationship] = useState("");
  const [address, setAddress] = useState("");
  const { user } = useUser();
  const dispatch = useDispatch<AppDispatch>();
  const patients = useSelector((state: RootState) => state.booking.patients);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const addedPatient = {
      userName,
      phone,
      dob: dob ? format(dob, "yyyy-MM-dd") : "",
      gender,
      citizenId,
      relationship,
      address,
      guardianId: user?.userId,
    };
    console.log("dsdsd", addedPatient);
    try {
      await dispatch(addPatientAsync(addedPatient)).unwrap();
      dispatch(setIsAddingPatient(true));
      dispatch(setPatients([...patients, addedPatient as IPatient]));
      toast.success("Thêm bệnh nhân thành công!");
      onClose();
    } catch {
      dispatch(setIsAddingPatient(false));
      toast.error("Thêm thất bại hoặc bệnh nhân đã tồn tại!");
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-2xl text-gray-800 w-full max-w-3xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-600 text-center">
        Thêm bệnh nhân mới
      </h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Họ tên & SĐT */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-start pl-2">
              Họ và tên
            </label>
            <input
              type="text"
              placeholder="Nguyễn Văn A"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-start pl-2">
              Số điện thoại
            </label>
            <input
              type="tel"
              placeholder="0123456789"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Ngày sinh & Giới tính */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-start pl-2">
              Ngày sinh
            </label>
            <DatePicker
              selected={dob}
              onChange={(date: Date | null) => setDob(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mt-1 text-start pl-2">
              Giới tính
            </label>
            <div className="flex gap-4">
              {["Nam", "Nữ"].map((g) => (
                <label
                  key={g}
                  className={`flex items-center gap-2 px-14 py-3 rounded-lg cursor-pointer border ${
                    gender === g
                      ? "border-cyan-500 font-semibold"
                      : "border-gray-300 text-gray-700"
                  } hover:border-cyan-400 transition-all`}
                >
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={gender === g}
                    onChange={() => setGender(g)}
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* CCCD & Mối quan hệ */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-start pl-2">
              Số CCCD
            </label>
            <input
              type="text"
              placeholder="123456789012"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
              value={citizenId}
              onChange={(e) => setCitizenId(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-start pl-2">
              Mối quan hệ
            </label>
            <input
              type="text"
              placeholder="Con, Cha, Mẹ, Vợ/Chồng..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mt-2">
          <label className="block text-sm font-medium mb-1 text-start pl-2">
            Địa chỉ
          </label>
          <textarea
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            id="address"
            rows={2}
            placeholder="Nhập đầy đủ địa chỉ của bạn"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all"
          >
            Hoàn thành
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPatientForm;
