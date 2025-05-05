"use client";
import React from "react";
import { Dialog } from "@headlessui/react";

export default function PatientDetailModal({
  isOpen,
  onClose,
  patient,
}: {
  isOpen: boolean;
  onClose: () => void;
  patient: IPatientDetail | null;
}) {
  if (!patient) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-xl p-6 max-w-lg w-full shadow-lg">
          <Dialog.Title className="text-lg font-bold mb-4">
            Chi tiết bệnh nhân
          </Dialog.Title>
          <div className="space-y-2">
            <p><strong>Họ tên:</strong> {patient.userName}</p>
            <p><strong>Email:</strong> {patient.email}</p>
            <p><strong>Điện thoại:</strong> {patient.phone}</p>
            <p><strong>Địa chỉ:</strong> {patient.address}</p>
            <p><strong>Tình trạng:</strong> {patient.mainCondition}</p>
          </div>
          <div className="mt-6 text-right">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
            >
              Đóng
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
