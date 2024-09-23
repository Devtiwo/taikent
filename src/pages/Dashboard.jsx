import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../Redux/userSlice";
import { Outlet } from "react-router-dom";


const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { firstName, status, error } = useSelector((state) => state.user);

  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    } 
    dispatch(fetchUser());
  }, [dispatch, navigate]);

  useEffect(() => {
    if (status === "failed" || error) {
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    }
  }, [navigate, status, error]);

  return (
    <section className="flex gap-14">
      <Sidebar />
      <div className="flex-grow">
        <div className="hidden lg:block w-1/5 text-center mt-20 lg:mt-5 mr-10 p-3 float-right bg-slate-200 rounded-full">
        <h1 className="text-base font-semibold">Hi, {firstName}</h1>
        </div>
        <Outlet />
      </div>
    </section>
  );
};

export default Dashboard;
