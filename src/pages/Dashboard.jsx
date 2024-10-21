import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../Redux/userSlice";
import { Outlet } from "react-router-dom";
import Preloader from "../Components/Preloader";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.user);

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
        <div className="flex flex-row gap-4 text-center mt-10 lg:mt-5 mr-10 py-3 px-4 float-right bg-slate-200 rounded-full">
          {user ? (
            <>
              <div className="bg-fuchsia-600 text-white w-7 h-7 text-sm text-center content-center font-semibold rounded-full">
                {user.firstName.charAt(0).toUpperCase()}
                {user.lastName.charAt(0).toUpperCase()}
              </div>
              <div className="content-center">
                <h1 className="text-base font-semibold">{user?.firstName}</h1>
              </div>
            </>
          ) : (
            <Preloader />
          )}
        </div>
        <Outlet />
      </div>
    </section>
  );
};

export default Dashboard;
