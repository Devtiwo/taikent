import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearMessage } from "../Redux/authSlice";
import Preloader from "../Components/Preloader";

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
    if (status === "succeeded" && isLoggedIn) {
      const timer = setTimeout(() => {
        navigate("/dashboard");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [status, navigate, isLoggedIn]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required("Enter your email")
        .email("Enter a valid email"),
      password: yup.string().required("Enter your password"),
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
    <section className="h-screen">
      {loading && <Preloader />}
      <div className="h-28">
        <img src="/images/taikent.png" alt="logo" className="h-28 ml-5" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full bg-gradient-to-l from-fuchsia-200 via-purple-200 to-transparent">
        <div>
          {message && (
            <p
              className="text-center text-sm mt-5"
              style={{ color: status === "failed" ? "red" : "green" }}
            >
              {message}
            </p>
          )}
          <h1 className="font-medium text-2xl text-center mt-16 lg:mt-40">
            Welcome Back. Please log in 
          </h1>
          <form
            className="w-4/5 mx-auto py-16 px-7 mt-5"
            autoComplete="off"
            method="POST"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <div className="flex lg:justify-center">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full lg:w-4/5 py-2 px-4 outline-0 border-2 border-fuchsia-300 rounded-lg"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </div>
              <div>
                <small className="text-rose-700 font-medium ml-2 lg:pl-2 lg:ml-16">
                  {formik.touched.email && formik.errors.email}
                </small>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex lg:justify-center">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full lg:w-4/5 py-2 px-4 outline-0 border-2 border-fuchsia-300 rounded-lg"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </div>
              <div>
                <small className="text-rose-700 font-medium ml-2 pl-2 lg:ml-16">
                  {formik.touched.password && formik.errors.password}
                </small>
              </div>
            </div>
            <div className="mt-5 flex lg:justify-center">
              <button
                type="submit"
                className="p-3 w-full lg:w-4/5 font-medium text-2xl bg-black text-white hover:bg-violet-500 transition ease-in duration-200 rounded-lg"
              >
                Login
              </button>
            </div>
            <div className="text-center font-medium mt-8">
              <small>
                New User?
                <Link
                  to="/signup"
                  className="text-sm text-fuchsia-500 hover:text-violet-500"
                >
                  Sign Up
                </Link>
              </small>
            </div>
          </form>
        </div>
        <div className="hidden lg:block">
          <img
            src="/images/login.png"
            alt="Login illustration"
            className="w-4/5 mx-auto mt-10"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
