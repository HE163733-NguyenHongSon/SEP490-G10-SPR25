"use client";
import { useEffect, useRef, useState } from "react";
import { FaPaperPlane, FaPlus, FaChevronLeft } from "react-icons/fa";

interface Patient {
  name: string;
  dob: string;
  phone: string;
}

const SymptomPopup = () => {
  const [symptoms, setSymptoms] = useState("");
  const [suggestionData, setSuggestionData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: Chọn bệnh nhân, 2: Xác nhận thông tin

  const [patients, setPatients] = useState<Patient[]>([
    { name: "SON NGUYEN", dob: "27/06/2002", phone: "368965002" },
    { name: "NGUYỄN HỒNG SƠN", dob: "27/06/2002", phone: "0368965002" },
  ]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const [addingPatient, setAddingPatient] = useState(false);
  const [newPatient, setNewPatient] = useState<Patient>({
    name: "",
    dob: "",
    phone: "",
  });

  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (showBookingForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showBookingForm]);

  const handleSubmit = () => {
    if (symptoms.trim().length > 2) {
      fetchSuggestion(symptoms);
    }
  };

  const fetchSuggestion = async (query: string) => {
    setLoading(true);
    setShowBookingForm(true);
    try {
      const res = await fetch(`/api/suggestions?symptom=${query}`);
      const data = await res.json();
      setSuggestionData(data);
    } catch (error) {
      console.error("Lỗi khi lấy gợi ý:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeBookingForm = () => {
    setShowBookingForm(false);
    setSelectedPatient(null);
    setAddingPatient(false);
    setCurrentStep(1);
  };

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    setCurrentStep(2); // Chuyển sang bước tiếp theo
  };

  const handleBookAppointment = () => {
    if (selectedPatient && suggestionData) {
      console.log({
        patient: selectedPatient,
        symptoms,
        suggestion: suggestionData,
      });
      closeBookingForm();
      // Thêm logic gửi dữ liệu đặt lịch ở đây
    }
  };

  const handleAddPatient = () => {
    if (newPatient.name && newPatient.dob && newPatient.phone) {
      const updatedPatients = [...patients, newPatient];
      setPatients(updatedPatients);
      setSelectedPatient(newPatient);
      setNewPatient({ name: "", dob: "", phone: "" });
      setAddingPatient(false);
      setCurrentStep(2); // Chuyển sang bước tiếp theo
    }
  };

  const goBackToStep1 = () => {
    setCurrentStep(1);
  };

  return (
    <div className="relative w-full max-w-xl p-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Nhập triệu chứng..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="w-full px-4 py-2 text-gray-500 pr-12 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-cyan-500 rounded-full hover:bg-cyan-600 transition duration-200"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              <FaPaperPlane className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {showBookingForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay nền mờ */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={closeBookingForm}
          ></div>

          {/* Modal form */}
          <div
            ref={formRef}
            className="relative z-50 bg-white w-full max-w-lg rounded-lg shadow-xl p-6 mx-4"
          >
            {/* Thanh trạng thái */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    currentStep >= 1
                      ? "bg-cyan-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  1
                </div>
                <div className="flex-1 h-1 mx-2 bg-gray-200">
                  <div
                    className={`h-full ${
                      currentStep >= 2 ? "bg-cyan-500" : "bg-gray-200"
                    }`}
                  ></div>
                </div>
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    currentStep >= 2
                      ? "bg-cyan-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  2
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span
                  className={`${
                    currentStep >= 1 ? "text-cyan-600 font-medium" : "text-gray-500"
                  }`}
                >
                  Chọn bệnh nhân
                </span>
                <span
                  className={`${
                    currentStep >= 2 ? "text-cyan-600 font-medium" : "text-gray-500"
                  }`}
                >
                  Xác nhận thông tin
                </span>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4">Đặt lịch khám</h2>

            {currentStep === 1 ? (
              <div className="mb-4">
                <h3 className="font-medium mb-2">Triệu chứng:</h3>
                <p className="bg-gray-100 p-3 rounded">{symptoms}</p>

                <h3 className="font-medium mt-4 mb-2">Chọn bệnh nhân:</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {patients.map((patient, index) => (
                    <div
                      key={index}
                      onClick={() => handlePatientSelect(patient)}
                      className={`p-4 border rounded cursor-pointer transition-colors ${
                        selectedPatient?.name === patient.name
                          ? "border-cyan-500 bg-cyan-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <h4 className="font-medium">{patient.name}</h4>
                      <p className="text-sm text-gray-600">
                        Ngày sinh: {patient.dob}
                      </p>
                      <p className="text-sm text-gray-600">
                        SDT: {patient.phone}
                      </p>
                    </div>
                  ))}

                  {!addingPatient ? (
                    <button
                      onClick={() => setAddingPatient(true)}
                      className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded text-gray-500 hover:border-cyan-500 hover:text-cyan-600 transition-colors"
                    >
                      <FaPlus className="mr-2" />
                      Thêm thành viên mới
                    </button>
                  ) : (
                    <div className="p-4 border rounded space-y-3 bg-gray-50">
                      <input
                        type="text"
                        placeholder="Họ tên"
                        value={newPatient.name}
                        onChange={(e) =>
                          setNewPatient({ ...newPatient, name: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                      />
                      <input
                        type="text"
                        placeholder="Ngày sinh (dd/mm/yyyy)"
                        value={newPatient.dob}
                        onChange={(e) =>
                          setNewPatient({ ...newPatient, dob: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                      />
                      <input
                        type="text"
                        placeholder="SĐT"
                        value={newPatient.phone}
                        onChange={(e) =>
                          setNewPatient({ ...newPatient, phone: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setAddingPatient(false)}
                          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                        >
                          Hủy
                        </button>
                        <button
                          onClick={handleAddPatient}
                          className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
                        >
                          Thêm
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <button
                  onClick={goBackToStep1}
                  className="flex items-center text-cyan-600 mb-4"
                >
                  <FaChevronLeft className="mr-1" />
                  Quay lại
                </button>

                <h3 className="font-medium mb-2">Thông tin bệnh nhân:</h3>
                <div className="bg-gray-100 p-4 rounded mb-4">
                  <h4 className="font-medium">{selectedPatient?.name}</h4>
                  <p className="text-sm text-gray-600">
                    Ngày sinh: {selectedPatient?.dob}
                  </p>
                  <p className="text-sm text-gray-600">
                    SĐT: {selectedPatient?.phone}
                  </p>
                </div>

                <h3 className="font-medium mb-2">Triệu chứng:</h3>
                <p className="bg-gray-100 p-3 rounded mb-4">{symptoms}</p>

                {suggestionData && (
                  <>
                    <h3 className="font-medium mb-2">Gợi ý chuyên khoa:</h3>
                    <div className="bg-gray-100 p-3 rounded mb-4">
                      {suggestionData.specialty}
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="flex justify-end space-x-3 mt-4">
              {currentStep === 1 ? (
                <button
                  onClick={closeBookingForm}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
              ) : (
                <>
                  <button
                    onClick={goBackToStep1}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                  >
                    Quay lại
                  </button>
                  <button
                    onClick={handleBookAppointment}
                    className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition-colors"
                  >
                    Đặt lịch
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomPopup;