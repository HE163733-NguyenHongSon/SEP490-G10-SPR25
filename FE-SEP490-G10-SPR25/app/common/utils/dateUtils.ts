// utils/dateUtils.ts
export const formatAppointmentDate = (date: string): string => {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};
export const parseDate = (dateStr: string): Date | null => {
  const [year, month, day] = dateStr.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day); // Lưu ý: tháng bắt đầu từ 0
};
