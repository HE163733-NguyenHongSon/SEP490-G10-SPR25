import { assets } from "../../../../public/images/assets";
import Image from "next/image";
const ProfilePage = () => {
  return (
    <div>
      <form>
        <div className="grid grid-rows-3 gap-6 p-5">
          <div className="row-span-1 flex flex-col items-start justify-center border-b-2 border-gray-300 h-fit p-10 pl-0 ">
            <Image
              src={assets.profile}
              alt="Profile"
              height={100}
              width={100}
              className="border border-gray-500 rounded-md shadow-md"
            />
            <button className="mx-3 mt-2 text-cyan-500">Change image</button>
          </div>

          <div className="row-span-1 flex flex-col   ">
            <div className="  grid grid-cols-4 gap-10  h-fit  mb-5   ">
              <div className="col-span-1">
                <label
                  htmlFor="citizen_id"
                  className="block text-base font-medium text-gray-600"
                >
                  Citizen ID
                </label>
                <input
                  id="citizen_id"
                  type="number"
                  value="03500200556"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="user_name"
                  className="block  text-base font-medium text-gray-600"
                >
                  User Name
                </label>
                <input
                  id="user_name"
                  type="text"
                  value="Nguyễn Hồng Sơn"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="dob"
                  className="block text-base font-medium text-gray-600"
                >
                  Date of Birth
                </label>
                <input
                  id="dob"
                  type="date"
                  value="2002-06-27"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div className="col-span-1 grid grid-cols-2 gap-2 h-fit">
                <label className="col-span-2 block text-base font-medium text-gray-600">
                  Gender
                </label>
                <div className="col-span-1 flex items-center">
                  <input id="male" type="radio" value="male" className="mr-2" />
                  <label htmlFor="male">Male</label>
                </div>
                <div className="col-span-1 flex items-center">
                  <input
                    id="female"
                    type="radio"
                    value="female"
                    className="mr-2"
                  />
                  <label htmlFor="female">Female</label>
                </div>
              </div>
            </div>

            <div className=" grid grid-cols-2 gap-10 h-fit  ">
              <div className="col-span-1 grid grid-cols-4 ">
                <div className="col-span-3">
                  <label
                    htmlFor="email"
                    className="block  text-base font-medium text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="string"
                    value="03500200556"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div className="col-span-1 flex px-5 py-7">
                  <button className="h-fit px-3 py-1  bg-cyan-500 min-w-fit rounded-full shadow-md text-white ">
                    Verified
                  </button>
                </div>
              </div>
              <div className="col-span-1 grid grid-cols-4 ">
                <div className="col-span-3">
                  <label
                    htmlFor="phone"
                    className="block  text-base font-medium text-gray-600"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="string"
                    value="03500200556"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div className="col-span-1 flex px-5 py-7">
                  <button className="h-fit px-3 py-1  bg-cyan-500 min-w-fit rounded-full shadow-md text-white ">
                    Verified
                  </button>
                </div>
              </div>
            </div>

            <div className=" gap-10 h-fit mb-5 ">
              <label
                htmlFor="address"
                className="block text-base font-medium text-gray-600"
              >
                Address
              </label>
              <textarea
                name="address"
                id="address"
                rows={2}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-600 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-xl"
              />
            </div>
          </div>
          <div className="row-span-1 gap-10 h-fit flex justify-end border-t-2 border-gray-300 my-3 py-5 pr-10">
            <button
              className="font-semibold text-gray-600 text-base"
              type="reset"
            >
              Reset
            </button>
            <button
              className="px-12 m-4 text-base text-#635F5F rounded-md bg-cyan-500 text-white flex items-center justify-start min-w-fit h-12 gap-4 border border-gray-300"
              type="submit"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
