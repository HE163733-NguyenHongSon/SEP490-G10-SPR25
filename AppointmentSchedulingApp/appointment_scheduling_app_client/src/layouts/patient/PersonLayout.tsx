import React from "react";
import { Link, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useLocation } from "react-router-dom";
import { imgs } from "react-toastify";

const PersonLayout = () => {
  const location = useLocation();
  console.log(location.pathname)
  const routes = [
    { path: "profile", name: "Profile", img: assets.profile },
    { path: "reservations", name: "Reservations ", img: assets.reservation },
    { path: "medical-report",  name: "Medical Report", img: assets.medical_report}
  ];
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center justify-center z-10"
      style={{ backgroundImage: 'url("/background_register_treatment.jpeg")' }}
      id="Body"
    >
      <div className=" absolute  inset-0 bg-black bg-opacity-50 z-20"></div>
      <div className=" container mt-28 mb-10   z-30 grid grid-cols-5 gap-4 text-gray-700 bg-white  rounded-xl shadow-2xl drop-shadow-2xl ">
        <div className="col-span-1 border-r border-gray-300 ">
          <div className="flex flex-row items-center justify-center gap-2 p-4  ">
            <h2 className="text-xl">Nguyen Hong Son</h2>
            <div className="bg-cyan-500 min-w-fit rounded-full shadow-md px-2">
              <p className="text-white">Verified</p>
            </div>
          </div>
          <div className=" flex flex-row items-center justify-start gap-2 mx-7  border-b border-gray-300  pb-5  ">
            <img className="w-7 h-7" src={assets.ranking} alt="" />
            Ranking:
            <span className="text-cyan-500  text-">Gold</span>
          </div>
          <nav>
            <ul className="space-y-2">
              {routes.map((route) => (
                <li>
                  <Link
                    key={route.name}
                    to={route.path}
                    className={`px-12 m-4 text-#635F5F rounded-full hover:bg-cyan-500 hover:text-white 
                    flex items-center justify-start min-w-fit h-12 gap-4 border border-gray-300 
                     ${
                       location.pathname.includes(route.path)
                         ? "bg-cyan-500 text-white"
                         : " bg-white"
                     } shadow-md`}
                  >
                    <img className="w-7 h-7" src={route.img} alt="" />
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="col-span-4 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PersonLayout;
