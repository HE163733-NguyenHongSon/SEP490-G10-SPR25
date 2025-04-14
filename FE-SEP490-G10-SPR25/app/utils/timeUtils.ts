import dayjs from "dayjs";
import moment from "moment";


 
export const getTimeAgo = (dateStr: string | undefined): string => {
  if (!dateStr) return "Không xác định";

  const date = dayjs(dateStr, "DD/MM/YYYY");
  const now = dayjs();

  const diffInDays = now.diff(date, "day");
  if (diffInDays < 30) return `${diffInDays} ngày trước`;

  const diffInMonths = now.diff(date, "month");
  if (diffInMonths < 12) return `${diffInMonths} tháng trước`;

  const diffInYears = now.diff(date, "year");
  return `${diffInYears} năm trước`;
};


export const formatTimeWithPeriod = (time: string): string => {
  const m = moment(time, "hh:mm A");

  // Nếu muốn định dạng 12h thì đổi HH -> hh
  const hour = m.format("HH:mm"); // 24h format
  const period = m.format("A") === "AM" ? "sáng" : "chiều";

  return `${hour} ${period}`;
};
