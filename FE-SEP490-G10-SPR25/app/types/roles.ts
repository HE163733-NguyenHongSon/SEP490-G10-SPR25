export enum AppRole {
  Admin = "Quản trị viên",
  Doctor = "Bác sĩ",
  Patient = "Bệnh nhân",
  Receptionist = "Lễ tân",
  Guardian = "Người giám hộ"
}

// Hàm giúp chuyển đổi từ giá trị role từ API sang AppRole
export function normalizeRole(apiRole: string): AppRole | null {
  // Kiểm tra trực tiếp từ enum
  if (Object.values(AppRole).includes(apiRole as AppRole)) {
    return apiRole as AppRole;
  }
  
  // Nếu không khớp trực tiếp, thử chuẩn hóa
  const normalizedRole = apiRole.toLowerCase();
  
  if (normalizedRole.includes('admin') || normalizedRole.includes('quản trị viên')) {
    return AppRole.Admin;
  } else if (normalizedRole.includes('doctor') || normalizedRole.includes('bác sĩ')) {
    return AppRole.Doctor;
  } else if (normalizedRole.includes('patient') || normalizedRole.includes('bệnh nhân')) {
    return AppRole.Patient;
  } else if (normalizedRole.includes('recept') || normalizedRole.includes('lễ tân')) {
    return AppRole.Receptionist;
  } else if (normalizedRole.includes('guardian') || normalizedRole.includes('giám hộ')) {
    return AppRole.Guardian;
  }
  
  return null;
} 