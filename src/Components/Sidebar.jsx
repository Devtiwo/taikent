import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { HiOutlineChartSquareBar } from "react-icons/hi";
import { BiSupport } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { HiMenu } from "react-icons/hi";
import { PiHandDepositFill } from "react-icons/pi";
import { IoIosPeople } from "react-icons/io";
import { logoutSuccess } from "../Redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsSidebarOpen(false);
  };
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logoutSuccess());
    navigate("/login");
  };

  const dashLinks = [
    {
      to: "/dashboard/overview",
      icon: <IoMdHome className="text-lg mt-1" />,
      label: "Overview",
    },
    {
      to: "/dashboard/plans",
      icon: <HiOutlineChartSquareBar className="text-lg mt-1" />,
      label: "Investment Plans",
    },
    {
      to: "/dashboard/deposit",
      icon: <PiHandDepositFill className="text-lg mt-1" />,
      label: "Deposit",
    },
    {
      to: "/dashboard/support",
      icon: <BiSupport className="text-lg mt-1" />,
      label: "Support",
    },
    {
      to: "/dashboard/profile",
      icon: <IoIosPeople className="text-lg mt-1" />,
      label: "Profile",
    },
  ];
  return (
    <div className="h-screen fixed z-50">
      {!isSidebarOpen && (
        <div className="w-full lg:hidden fixed top-0 left-0 p-4 fixed">
          <button onClick={() => setIsSidebarOpen(true)}>
            <HiMenu className="text-4xl text-black" />
          </button>
        </div>
      )}
      <div
        className={`fixed top-0 left-0 bottom-0 bg-slate-100 z-30 lg:w-72 lg:flex lg:flex-col h-full transition-transform transform ${
          isSidebarOpen ? "block" : "hidden"
        }`}
       >
        <div className="flex lg:hidden p-4 justify-end">
          <button onClick={() => setIsSidebarOpen(false)}>
            <IoClose className="text-4xl" />
          </button>
        </div>
        <div className="flex flex-col mt-10 h-full lg:justify-between items-center">
          <div>
            <img src="/images/taikent.png" alt="Logo" className="mx-auto" />
          </div>
          <div className="p-5 pb-32">
            <ul>
              {dashLinks.map((dashLink, index) => (
                <li key={index} className="pb-7">
                  <Link
                    to={dashLink.to}
                    className={`flex gap-1 text-lg font-medium transition duration-300 ${
                      activeLink === dashLink.to
                        ? "bg-fuchsia-700 text-white"
                        : "hover:text-fuchsia-700"
                    } px-4 py-2 rounded-full`}
                    onClick={() => handleLinkClick(dashLink.to)}
                  >
                    {dashLink.icon}
                    {dashLink.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-4/5 text-center pb-20 lg:pb-16">
            <button
              type="button"
              className="w-32 p-2 bg-black hover:bg-fuchsia-700 text-white rounded-full transition ease-in duration-200 font-medium"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
