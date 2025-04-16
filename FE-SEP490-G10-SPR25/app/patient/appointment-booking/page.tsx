const AppointmentBookingPage = () => {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center justify-center z-10"
      style={{ backgroundImage: 'url("/images/background_register_treatment.jpeg")' }}
      id="Body"
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-20"></div>
      <form className="mt-28 mb-10 z-30">
        <div className="bg-white rounded-3xl p-10 text-xl bg-opacity-95">
          {/* THÔNG TIN BỆNH NHÂN */}
          <div className="border-b-2 border-gray-300 pb-12">
            <h2 className="text-xl font-semibold text-gray-600">
              Thông Tin Bệnh Nhân
            </h2>
            <p className="mt-1 text-lg text-gray-600">
              Thông tin được cung cấp sẽ hiển thị công khai. Vui lòng đảm bảo chỉ chia sẻ thông tin chính xác và phù hợp.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2">
              {/* Tên người dùng */}
              <div className="sm:col-span-1">
                <label htmlFor="username" className="block text-base font-medium text-gray-900">
                  Tên Người Dùng
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <div className="shrink-0 select-none text-base text-gray-500">
                      workcation.com/
                    </div>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      disabled
                      placeholder="janesmith"
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0"
                    />
                  </div>
                </div>
              </div>

              {/* Tuổi và Giới tính */}
              <div className="sm:col-span-1 grid grid-cols-2 gap-x-6">
                {/* Tuổi */}
                <div className="sm:col-span-1">
                  <label htmlFor="age" className="block text-base font-medium text-gray-900">
                    Tuổi
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                      <input
                        type="number"
                        name="age"
                        id="age"
                        min="0"
                        disabled
                        className="block w-full grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0"
                      />
                    </div>
                  </div>
                </div>

                {/* Giới tính */}
                <div className="sm:col-span-1">
                  <fieldset>
                    <legend className="text-base font-semibold text-gray-900">
                      Giới Tính
                    </legend>
                    <div className="mt-3 flex items-center gap-x-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          id="gender_male"
                          name="gender"
                          type="radio"
                          checked
                          className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        />
                        <label htmlFor="gender_male" className="block text-base text-gray-500">
                          Nam
                        </label>
                      </div>

                      <div className="flex items-center gap-x-3">
                        <input
                          id="gender_female"
                          name="gender"
                          type="radio"
                          className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        />
                        <label htmlFor="gender_female" className="block text-base text-gray-500">
                          Nữ
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>

            {/* Email và Số điện thoại */}
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="mail" className="block text-base font-medium text-gray-900">
                  Email
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <input
                    type="text"
                    name="mail"
                    id="mail"
                    autoComplete="family-mail"
                    disabled
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300"
                  />
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Thay đổi
                  </button>
                </div>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="phone" className="block text-base font-medium text-gray-900">
                  Số Điện Thoại
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    autoComplete="tel"
                    disabled
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300"
                  />
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Thay đổi
                  </button>
                </div>
              </div>
            </div>

            {/* Địa chỉ */}
            <div className="mt-10">
              <label htmlFor="address" className="block text-base font-medium text-gray-900">
                Địa Chỉ
              </label>
              <div className="mt-2">
                <textarea
                  name="address"
                  id="address"
                  rows={2}
                  placeholder="Nhập địa chỉ đầy đủ của bạn"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300"
                />
              </div>
            </div>
          </div>

          {/* THÔNG TIN LỊCH HẸN */}
          <div className="border-b-2 border-gray-300 py-12">
            <h2 className="text-xl font-semibold text-gray-600">
              Thông Tin Lịch Hẹn
            </h2>
            <p className="mt-1 text-lg text-gray-600">
              Bạn có thể đặt lịch hẹn trực tuyến bằng cách chọn thời gian phù hợp cho buổi tư vấn.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2">
              {/* Chuyên khoa */}
              <div className="sm:col-span-1">
                <label htmlFor="specialty" className="block text-base font-medium text-gray-900">
                  Chọn Chuyên Khoa
                </label>
                <div className="mt-2 grid grid-cols-1 relative">
                  <select
                    id="specialty"
                    name="specialty"
                    autoComplete="specialty-name"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300"
                  >
                    <option>Tim mạch</option>
                    <option>Thần kinh</option>
                    <option>Cơ xương khớp</option>
                    <option>Nhi khoa</option>
                    <option>Chẩn đoán hình ảnh</option>
                  </select>
                  <svg
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M4.22 6.22a.75.75..." />
                  </svg>
                </div>
              </div>
              {/* Bạn có thể bổ sung thêm các trường khác nếu có */}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AppointmentBookingPage;
