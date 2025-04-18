import React from "react";

const BookingInfor: React.FC = () => {
  return (
    <div className="border-b-2 border-gray-300 py-12">
      <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label
            htmlFor="specialty"
            className="block text-base font-medium text-gray-900 text-start pl-2"
          >
            Chọn chuyên khoa
          </label>
          <div className="mt-2 grid grid-cols-1 relative">
            <select
              id="specialty"
              name="specialty"
              autoComplete="specialty-name"
              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
            >
              <option>Tim mạch</option>
              <option>Thần kinh</option>
              <option>Chỉnh hình</option>
              <option>Nhi khoa</option>
              <option>Chẩn đoán hình ảnh</option>
            </select>

            <svg
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div className="sm:col-span-1">
          <label
            htmlFor="medical-service"
            className="block text-base font-medium text-gray-900 text-start pl-2"
          >
            Chọn dịch vụ y tế
          </label>
          <div className="mt-2 grid grid-cols-1 relative">
            <select
              id="medical-service"
              name="medical-service"
              autoComplete="medical-service-name"
              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
            >
              <option>Khám tim mạch</option>
              <option>Khám thần kinh</option>
              <option>Khám chỉnh hình</option>
              <option>Khám nhi khoa</option>
              <option>Khám chẩn đoán hình ảnh</option>
            </select>

            <svg
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <label
          htmlFor="appointment-type"
          className="block text-base font-medium text-gray-900 text-start pl-2"
        >
          Đặt lịch theo
        </label>

        {/* <div className="mt-2 flex gap-x-2">
          <button
            type="button"
            id="by-doctor"
            onClick={() => setSelected("doctor")}
            className={`w-full h-9 px-4 text-base font-medium border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 rounded-md ${
              selected === "doctor"
                ? "bg-cyan-500 text-white"
                : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Theo bác sĩ
          </button>

          <button
            type="button"
            id="by-date"
            onClick={() => setSelected("date")}
            className={`w-full h-9 px-4 text-base font-medium border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 rounded-md ${
              selected === "date"
                ? "bg-cyan-500 text-white"
                : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Theo ngày
          </button>
        </div> */}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label
            htmlFor="doctor"
            className="block text-base font-medium text-gray-900 text-start pl-2"
          >
            Chọn bác sĩ
          </label>
          <div className="mt-2 grid grid-cols-1 relative">
            <select
              id="doctor"
              name="doctor"
              autoComplete="doctor-name"
              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
            >
              <option>BS. John Doe (Tim mạch)</option>
              <option>BS. Jane Smith (Thần kinh)</option>
              <option>BS. Alice Johnson (Chỉnh hình)</option>
              <option>BS. Bob Brown (Nhi khoa)</option>
              <option>BS. Sarah White (Chẩn đoán hình ảnh)</option>
            </select>

            <svg
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div className="sm:col-span-1">
          <label
            htmlFor="appointment-time"
            className="block text-base font-medium text-gray-900 text-start pl-2"
          >
            Chọn Ngày và Giờ
          </label>
          <div className="mt-2 grid grid-cols-1 relative">
            <select
              id="appointment-time"
              name="appointment-time"
              autoComplete="appointment-time"
              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
            >
              <option>20 tháng 1, 2025 - 10:00 sáng</option>
              <option>20 tháng 1, 2025 - 2:00 chiều</option>
              <option>21 tháng 1, 2025 - 9:00 sáng</option>
              <option>21 tháng 1, 2025 - 11:00 sáng</option>
              <option>22 tháng 1, 2025 - 1:00 chiều</option>
              <option>22 tháng 1, 2025 - 3:00 chiều</option>
            </select>

            <svg
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <label
          htmlFor="reason"
          className="block text-base font-medium text-gray-900 text-start pl-2"
        >
          Lý do khám
        </label>
        <div className="mt-2">
          <textarea
            name="reason"
            id="reason"
            //   value={symptoms || ""}
            rows={5}
            placeholder="Mô tả chi tiết lý do khám, triệu chứng hoặc mối quan tâm của bạn."
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          />
        </div>
      </div>
      <div className="mt-10">
        <label
          htmlFor="reason"
          className="block text-base font-medium text-gray-900 text-start pl-2"
        >
          Phác đồ điều trị trước <b>(nếu có)</b>
        </label>

        <div className="mt-4 flex justify-center rounded-lg border border-dashed border-gray-900/25 p-6">
          <div className="text-center">
            <svg
              className="mx-auto size-12 text-gray-300"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                fillRule="evenodd"
                d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                clipRule="evenodd"
              />
            </svg>
            <div className="mt-4 flex text-base text-gray-600">
              <label
                htmlFor="before-treatment-photo-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-cyan-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Tải ảnh lên</span>
                <input
                  id="before-treatment-photo-upload"
                  name="before-treatment-photo-upload"
                  type="file"
                  accept="image/png, image/jpeg, image/gif"
                  className="sr-only"
                />
              </label>
              <p className="pl-1">hoặc kéo thả</p>
            </div>
            <p className="text-xs/5 text-gray-600">PNG, JPG, GIF tối đa 10MB</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingInfor;
