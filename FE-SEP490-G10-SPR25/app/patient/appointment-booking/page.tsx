 const AppointmentBookingPage = () => {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center justify-center z-10"
      style={{ backgroundImage: 'url("/images/background_register_treatment.jpeg")' }}
      id="Body"
    >
      <div className="absolute  inset-0 bg-black bg-opacity-50 z-20"></div>
      <form className="mt-28 mb-10  z-30">
        <div className=" bg-white rounded-3xl p-10 text-xl bg-opacity-95">
          <div className="border-b-2 border-gray-300  pb-12">
            <h2 className="text-xl font-semibold text-gray-600">
              Patient Information
            </h2>
            <p className="mt-1 text-lg text-gray-600">
              The information provided here will be visible to others. Please
              ensure that you only share appropriate and accurate details.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-x-6  gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1 ">
                <label
                  htmlFor="username"
                  className="block text-base font-medium text-gray-900"
                >
                  User Name
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <div className="shrink-0 select-none text-base text-gray-500 ">
                      workcation.com/
                    </div>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      disabled
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 "
                      placeholder="janesmith"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-1 grid grid-cols-2 gap-x-6">
                <div className="sm:col-span-1">
                  <label
                    htmlFor="age"
                    className="block text-base  font-medium text-gray-900"
                  >
                    Age
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                      <input
                        type="number"
                        name="age"
                        disabled
                        id="age"
                        className="block w-full grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 "
                        min="0"
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-1  ">
                  <fieldset>
                    <legend className="text-base col-span-1 font-semibold text-gray-900">
                      Gender
                    </legend>

                    <div className="col-span-1 mt-3 flex items-center gap-x-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          id="gender_male"
                          name="gender"
                          type="radio"
                          checked
                          className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                        />
                        <label
                          htmlFor="gender_male"
                          className="block text-base   text-gray-500"
                        >
                          Male
                        </label>
                      </div>

                      <div className="flex items-center gap-x-3">
                        <input
                          id="gender_female"
                          name="gender"
                          type="radio"
                          className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                        />
                        <label
                          htmlFor="gender_female"
                          className="block text-base   text-gray-500"
                        >
                          Female
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-x-6  gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1 ">
                <label
                  htmlFor="mail"
                  className="block text-base font-medium text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <input
                    type="text"
                    name="mail"
                    id="mail"
                    autoComplete="family-mail"
                    disabled
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 "
                  />
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Change
                  </button>
                </div>
              </div>

              <div className="sm:col-span-1">
                <label
                  htmlFor="phone"
                  className="block text-base font-medium text-gray-900"
                >
                  Phone
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    autoComplete="tel"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 "
                    disabled
                  />
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-x-6  gap-y-8 sm:grid-cols-2">
              <div className="col-span-full">
                <label
                  htmlFor="address"
                  className="block text-base font-medium text-gray-900"
                >
                  Address
                </label>
                <div className="mt-2">
                  <textarea
                    name="address"
                    id="address"
                    rows={2}
                    placeholder="Enter your full address "
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 "
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b-2 border-gray-300 py-12">
            <h2 className="text-xl font-semibold text-gray-600">
              Appoitment Information
            </h2>
            <p className="mt-1 text-lg text-gray-600">
              You can book your appointment online by choosing a suitable time
              for your consultation.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label
                  htmlFor="specialty"
                  className="block text-base font-medium text-gray-900"
                >
                  Choose specialty
                </label>
                <div className="mt-2 grid grid-cols-1 relative">
                  <select
                    id="specialty"
                    name="specialty"
                    autoComplete="specialty-name"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 "
                  >
                    <option>Cardiology</option>
                    <option>Neurology</option>
                    <option>Orthopedics</option>
                    <option>Pediatrics</option>
                    <option>Radiology</option>
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
                  className="block text-base font-medium text-gray-900"
                >
                  Choose medical service
                </label>
                <div className="mt-2 grid grid-cols-1 relative">
                  <select
                    id="medical-service"
                    name="medical-service"
                    autoComplete="medical-service-name"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 "
                  >
                    <option>Khám tim mạch (Cardiology)</option>
                    <option>Khám thần kinh (Neurology)</option>
                    <option>Khám chỉnh hình (Orthopedics)</option>
                    <option>Khám nhi khoa (Pediatrics)</option>
                    <option>Khám chẩn đoán hình ảnh (Radiology)</option>
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

            <div className="mt-10  gap-x-6 gap-y-8 ">
              <label
                htmlFor="appointment-type"
                className="block text-base font-medium text-gray-900"
              >
                Choose an appointment
              </label>
              <div className="mt-2 flex flex-row ">
                <button
                  type="button"
                  id="by-doctor"
                  className="w-full h-9   px-4  text-base font-medium text-gray-900 bg-white border rounded-l-md border-gray-300  shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                >
                  Follow the doctor
                </button>
                <button
                  type="button"
                  id="by-date"
                  className="w-full h-9 px-4  text-base font-medium text-gray-900 bg-white border rounded-r-md  border-gray-300  shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                >
                  Follow the date
                </button>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label
                  htmlFor="doctor"
                  className="block text-base font-medium text-gray-900"
                >
                  Choose Doctor
                </label>
                <div className="mt-2 grid grid-cols-1 relative">
                  <select
                    id="doctor"
                    name="doctor"
                    autoComplete="doctor-name"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 "
                  >
                    <option>Dr. John Doe (Cardiology)</option>
                    <option>Dr. Jane Smith (Neurology)</option>
                    <option>Dr. Alice Johnson (Orthopedics)</option>
                    <option>Dr. Bob Brown (Pediatrics)</option>
                    <option>Dr. Sarah White (Radiology)</option>
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
                  className="block text-base font-medium text-gray-900"
                >
                  Choose Date and Time
                </label>
                <div className="mt-2 grid grid-cols-1 relative">
                  <select
                    id="appointment-time"
                    name="appointment-time"
                    autoComplete="appointment-time"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 "
                  >
                    <option>January 20, 2025 - 10:00 AM</option>
                    <option>January 20, 2025 - 2:00 PM</option>
                    <option>January 21, 2025 - 9:00 AM</option>
                    <option>January 21, 2025 - 11:00 AM</option>
                    <option>January 22, 2025 - 1:00 PM</option>
                    <option>January 22, 2025 - 3:00 PM</option>
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
                className="block text-base font-medium text-gray-900"
              >
                Reason
              </label>
              <div className="mt-2">
                <textarea
                  name="reason"
                  id="reason"
                  rows={5}
                  placeholder="Provide a detailed description of the reason for the visit, symptoms, or concerns."
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 "
                />
              </div>
            </div>
            <div className="mt-10">
              <h3 className="text-base font-semibold text-gray-900  inline-flex">
                The before treatment plan photo
                <span className="block  font-normal text-gray-400">
                  ( if has )
                </span>
              </h3>

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
                      <span>Upload Photo</span>
                      <input
                        id="before-treatment-photo-upload"
                        name="before-treatment-photo-upload"
                        type="file"
                        accept="image/png, image/jpeg, image/gif"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-base font-semibold text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-cyan-500 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Confirm reservation
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default AppointmentBookingPage