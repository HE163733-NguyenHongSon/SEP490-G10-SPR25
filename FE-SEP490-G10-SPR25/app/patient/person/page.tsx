"use client";

import * as Tabs from "@radix-ui/react-tabs";
import Image from "next/image";
import { assets } from "@/public/images/assets";
import { useState, useEffect } from "react";
import { patientService } from "@/services/patientService";
import { useQuery } from "@tanstack/react-query";

const ProfilePage = () => {
  const [patientId, setPatientId] = useState<number>(1);
  const imgUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const user = JSON.parse(storedUser) as IUser;
      setPatientId(user?.userId);
    }
  }, []);
  const {
    data: patientDetail,
    // isLoading: isLoadingPatientDetail,
    // error: patientDetailError,
  } = useQuery({
    queryKey: ["patientDetail", patientId],
    queryFn: () => patientService.getPatientDetailById(patientId),
    staleTime: 30000,
  });

  return (
    <div className="p-8">
      <Tabs.Root defaultValue="account" className="w-full">
        <div className="row-span-1 flex flex-col items-start border-b-2 border-gray-300 gap-5">
          <div className="flex flex-row items-center gap-3 px-5">
            <div className="flex flex-col items-center gap-3 border-r-2 border-gray-300 pr-12">
              <div className="w-[100px] h-[100px] overflow-hidden rounded-lg">
                <Image
                  className="object-cover w-full h-full"
                  src={`${imgUrl}/${patientDetail?.avatarUrl}`}
                  alt="avatar patient"
                  width={100}
                  height={100}
                />
              </div>
              <button className="text-cyan-500 hover:underline">
                Thay đổi ảnh
              </button>
            </div>
            <div className="text-gray-600">
              <h3 className="font-semibold text-xl">
                Hồ sơ cá nhân: {patientDetail?.userName}
              </h3>
              <p className="text-lg">
                <span className="font-semibold">Vai trò: </span>
                {patientDetail?.roleNames}
              </p>
            </div>
          </div>
          <Tabs.List className="flex  ">
            <Tabs.Trigger
              value="account"
              className="px-6 py-2 text-lg font-semibold text-gray-600 data-[state=active]:text-cyan-600 data-[state=active]:border-b-2 data-[state=active]:border-cyan-600 focus:outline-none"
            >
              Thông tin cá nhân
            </Tabs.Trigger>
            <Tabs.Trigger
              value="dependents"
              className="px-6 py-2 text-lg font-semibold text-gray-600 data-[state=active]:text-cyan-600 data-[state=active]:border-b-2 data-[state=active]:border-cyan-600 focus:outline-none"
            >
              Người thân được giám hộ
            </Tabs.Trigger>
          </Tabs.List>
        </div>

        <Tabs.Content value="account">
          <form>
            <div className="row-span-1 flex flex-col py-10">
              <div className="grid grid-cols-4 gap-10 mb-5">
                <div>
                  <label
                    htmlFor="citizen_id"
                    className="block font-medium text-gray-600"
                  >
                    Số CMND/CCCD
                  </label>
                  <input
                    id="citizen_id"
                    type="number"
                    value={patientDetail?.citizenId}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="user_name"
                    className="block font-medium text-gray-600"
                  >
                    Họ và tên
                  </label>
                  <input
                    id="user_name"
                    type="text"
                    value={patientDetail?.userName}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="dob"
                    className="block font-medium text-gray-600"
                  >
                    Ngày sinh
                  </label>
                  <input
                    id="dob"
                    type="date"
                    value={patientDetail?.dob}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <label className="col-span-2 block font-medium text-gray-600">
                    Giới tính
                  </label>
                  <div className="flex items-center">
                    <input
                      id="male"
                      type="radio"
                      name="gender"
                      value="male"
                      checked={patientDetail?.gender === "male"}
                      className="mr-2"
                    />
                    <label htmlFor="male">Nam</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="female"
                      type="radio"
                      name="gender"
                      value="female"
                      checked={patientDetail?.gender === "female"}
                      className="mr-2"
                    />
                    <label htmlFor="female">Nữ</label>
                  </div>
                </div>
              </div>

              {/* Email và số điện thoại */}
              <div className="grid grid-cols-2 gap-10">
                <div className="grid grid-cols-4 items-center">
                  <div className="col-span-3">
                    <label
                      htmlFor="email"
                      className="block font-medium text-gray-600"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={patientDetail?.email}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <button className="h-fit px-4 py-2 bg-cyan-500 text-white rounded-full shadow-md">
                      Đã xác minh
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center">
                  <div className="col-span-3">
                    <label
                      htmlFor="phone"
                      className="block font-medium text-gray-600"
                    >
                      Số điện thoại
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={patientDetail?.phoneNumber}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <button className="h-fit px-4 py-2 bg-cyan-500 text-white rounded-full shadow-md">
                      Đã xác minh
                    </button>
                  </div>
                </div>
              </div>

              {/* Địa chỉ */}
              <div className="mt-5">
                <label
                  htmlFor="address"
                  className="block font-medium text-gray-600 mb-1"
                >
                  Địa chỉ
                </label>
                <textarea
                  id="address"
                  rows={2}
                  value={patientDetail?.address}
                  placeholder="Sửa lại địa chỉ của bạn..."
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            {/* Hành động */}
            <div className="flex justify-end border-t-2 border-gray-300 pt-5 gap-5">
              <button
                type="reset"
                className="text-base text-gray-600 font-semibold hover:underline"
              >
                Đặt lại
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-cyan-500 text-white font-semibold rounded-md shadow-md hover:bg-cyan-600 transition"
              >
                Cập nhật
              </button>
            </div>
          </form>
        </Tabs.Content>

        <Tabs.Content value="dependents">
          {patientDetail?.dependents?.length !== 0 ? (
            patientDetail?.dependents?.map(
              (dependent: IPatient, index: number) => (
                <form key={dependent.userId}>
                  <div className="row-span-1 flex flex-col py-10">
                    <div className="flex flex-row items-center gap-3 py-5 mb-5">
                      <div className="flex flex-col items-center gap-3  pr-12">
                        <div className="w-[100px] h-[100px] overflow-hidden rounded-lg">
                          <Image
                            className="object-cover w-full h-full"
                            src={`${imgUrl}/${dependent?.avatarUrl}`}
                            alt="avatar patient"
                            width={100}
                            height={100}
                          />
                        </div>

                        <button className="text-cyan-500 hover:underline">
                          Thay đổi ảnh
                        </button>
                      </div>
                      <div className="text-gray-600">
                        <h3 className="font-semibold text-xl">
                          Người thân: {dependent.userName}
                        </h3>
                        <p className="text-lg">
                          <span className="font-semibold">Mối quan hệ: </span>
                          {dependent.relationship}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-10 mb-5">
                      <div>
                        <label
                          htmlFor={`citizen_id_${index}`}
                          className="block font-medium text-gray-600"
                        >
                          Số CMND/CCCD
                        </label>
                        <input
                          id={`citizen_id_${index}`}
                          type="number"
                          value={dependent.citizenId || ""}
                          className="w-full border border-gray-300 px-3 py-2 rounded-md"
                          readOnly
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="user_name"
                          className="block font-medium text-gray-600"
                        >
                          Họ và tên
                        </label>
                        <input
                          id="user_name"
                          type="text"
                          value={dependent.userName}
                          className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="dob"
                          className="block font-medium text-gray-600"
                        >
                          Ngày sinh
                        </label>
                        <input
                          id="dob"
                          type="date"
                          value={dependent.dob}
                          className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <label className="col-span-2 block font-medium text-gray-600">
                          Giới tính
                        </label>
                        <div className="flex items-center">
                          <input
                            id="male"
                            type="radio"
                            name="gender"
                            value="male"
                            checked={dependent.gender === "male"}
                            className="mr-2"
                          />
                          <label htmlFor="male">Nam</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="female"
                            type="radio"
                            name="gender"
                            value="female"
                            checked={dependent.gender === "female"}
                            className="mr-2"
                          />
                          <label htmlFor="female">Nữ</label>
                        </div>
                      </div>
                    </div>

                    {/* Email và số điện thoại */}
                    <div className="grid grid-cols-2 gap-10">
                      <div className="grid grid-cols-4 items-center">
                        <div className="col-span-3">
                          <label
                            htmlFor="email"
                            className="block font-medium text-gray-600"
                          >
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            value={dependent.email}
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-cyan-500"
                          />
                        </div>
                        <div className="col-span-1 flex justify-center">
                          <button className="h-fit px-4 py-2 bg-cyan-500 text-white rounded-full shadow-md">
                            Đã xác minh
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 items-center">
                        <div className="col-span-3">
                          <label
                            htmlFor="phone"
                            className="block font-medium text-gray-600"
                          >
                            Số điện thoại
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            value={dependent.phoneNumber}
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-cyan-500"
                          />
                        </div>
                        <div className="col-span-1 flex justify-center">
                          <button className="h-fit px-4 py-2 bg-cyan-500 text-white rounded-full shadow-md">
                            Đã xác minh
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Địa chỉ */}
                    <div className="mt-5">
                      <label
                        htmlFor="address"
                        className="block font-medium text-gray-600 mb-1"
                      >
                        Địa chỉ
                      </label>
                      <textarea
                        id="address"
                        rows={2}
                        value={dependent.address}
                        placeholder="Sửa lại địa chỉ của bạn..."
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                  </div>

                  {/* Hành động */}
                  <div className="flex justify-end border-t-2 border-gray-300 py-2 gap-5 bg-cyan-500 px-5">
                    <button
                      type="reset"
                      className="text-base text-white font-semibold hover:underline border-2 border-white rounded-3xl px-4 py-2"
                    >
                      Đặt lại
                    </button>
                    <button
                      type="submit"
                      className="text-base text-white font-semibold hover:underline border-2 border-white rounded-3xl px-4 py-2"
                    >
                      Cập nhật
                    </button>
                  </div>
                </form>
              )
            )
          ) : (
            <p>Không có người phụ thuộc</p>
          )}
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default ProfilePage;
