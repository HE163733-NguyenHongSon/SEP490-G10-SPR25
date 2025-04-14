import dayjs from "dayjs";

/**
 * Hàm định dạng khoảng thời gian đã trôi qua từ ngày được truyền vào.
 * @param dateStr Chuỗi ngày có định dạng "DD/MM/YYYY"
 * @returns Ví dụ: "12 ngày trước", "3 tháng trước", "2 năm trước"
 */
export const getTimeAgo = (dateStr: string | undefined): string => {
  if (!dateStr) return "Không xác định";

  const date = dayjs(dateStr, "DD/MM/YYYY");
  const now = dayjs();

  const diffInDays = now.diff(date, "day");

  if (diffInDays < 30) {
    return `${diffInDays} ngày trước`;
  }

  const diffInMonths = now.diff(date, "month");
  if (diffInMonths < 12) {
    return `${diffInMonths} tháng trước`;
  }

  const diffInYears = now.diff(date, "year");
  return `${diffInYears} năm trước`;
};
