import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearMessage } from "../Redux/authSlice";
import Preloader from "../Components/Preloader";
import Background from "../components/Background";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, status, isLoggedIn } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    return () => {
      dispatch(clearMessage());
    }
  }, [dispatch]);
  
  useEffect(() => {
    if(isLoggedIn) {
      navigate("/dashboard", {replace: true});
    }
  }, [isLoggedIn, navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required("Email is required")
        .email("Enter a valid email"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setStatus }) => {
      setLoading(true);
      try {
        const result = await dispatch(login(values));
        if (login.fulfilled.match(result)) {
        } else {
          setLoading(false);
          setStatus(result.payload);
        }
      } catch (error) {
        console.error("Login error:", error);
        setStatus("An uexpected error occured!");
        setLoading(false);
      }
    },
  });
  return (
    <section className="h-screen relative">
      <Background />
      {loading && <Preloader />}
      <div className="h-28 relative z-20 bg-white">
        <img src="/images/taikent.png" alt="logo" className="ml-5" />
      </div>
      <div className="relative z-30 h-full">
        <div>
          {message && (
            <p
              className="text-center text-sm mt-5"
              style={{ color: status === "failed" ? "red" : "green" }}
            >
              {message}
            </p>
          )}
          <h1 className="font-medium text-2xl text-center mt-16 lg:mt-20">
            Welcome Back. Please log in 
          </h1>
          <form
            className="w-4/5 lg:w-2/6 mx-auto py-16 px-7 mt-5 bg-slate-50 shadow-2xl shadow-fuchsia-300"
            autoComplete="off"
            method="POST"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col w-full mb-5">
                <label htmlFor="email" className="mb-1 ml-1 text-sm">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  className="p-3 outline-0 border-2 border-fuchsia-300 rounded-lg"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                <small className="text-rose-700 font-medium ml-1 mt-1">
                  {formik.touched.email && formik.errors.email}
                </small>
            </div>
            <div className="flex flex-col w-full mb-5">
                <label htmlFor="password" className="mb-1 ml-1 text-sm">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="p-3 outline-0 border-2 border-fuchsia-300 rounded-lg"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <small className="text-rose-700 font-medium ml-1 mt-1">
                  {formik.touched.password && formik.errors.password}
                </small>
            </div>
            <div className="mt-2 mb-3">
                <Link to="#" className="text-sm hover:text-fuchsia-700 float-right">Forgot password?</Link>
             </div>
            <div className="mt-20 flex lg:justify-center">
              <button
                type="submit"
                className="p-3 w-full lg:w-2/5 font-medium text-2xl bg-black text-white hover:bg-fuchsia-700 transition ease-in duration-200 rounded-lg"
              >
                Login
              </button>
            </div>
            <div className="text-center font-medium mt-8">
              <small>
                New User?
                <Link
                  to="/signup"
                  className="text-sm text-fuchsia-500 hover:text-purple-500"
                >
                  Sign Up
                </Link>
              </small>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
