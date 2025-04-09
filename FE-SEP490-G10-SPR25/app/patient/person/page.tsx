"use client";

import * as Tabs from "@radix-ui/react-tabs";
import Image from "next/image";
import { assets } from "@/public/images/assets";

const ProfilePage = () => {
  return (
    <div className="p-8">
      <Tabs.Root defaultValue="account" className="w-full">
        <div className="row-span-1 flex flex-col items-start border-b-2 border-gray-300 gap-5">
          <div className="flex flex-row items-center gap-3 px-5">
            <div className="flex flex-col items-center gap-3 border-r-2 border-gray-300 pr-12">
              <Image
                src={assets.profile}
                alt="Ảnh đại diện"
                height={100}
                width={100}
                className="border border-gray-500 rounded-md shadow-md"
              />
              <button className="text-cyan-500 hover:underline">
                Thay đổi ảnh
              </button>
            </div>
            <div className="text-gray-600">
              <h3 className="font-semibold text-xl">
                Hồ sơ cá nhân: Nguyễn Văn A
              </h3>
              <p className="text-lg"><span className="font-semibold">Vai trò: </span>bệnh nhân</p>
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
              value="security"
              className="px-6 py-2 text-lg font-semibold text-gray-600 data-[state=active]:text-cyan-600 data-[state=active]:border-b-2 data-[state=active]:border-cyan-600 focus:outline-none"
            >
              Bảo mật
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
                    value="03500200556"
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
                    value="Nguyễn Hồng Sơn"
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
                    value="2002-06-27"
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
                      value="example@gmail.com"
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
                      value="03500200556"
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
                  placeholder="123 Nguyễn Văn Cừ, Quận 5, TP.HCM"
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

        <Tabs.Content value="security">
          <div className="p-4 text-gray-600">
            <p>Chức năng bảo mật sẽ được cập nhật sau...</p>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default ProfilePage;
