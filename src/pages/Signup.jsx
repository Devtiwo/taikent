import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import  {signup} from "../Redux/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, status} = useSelector((state) => state.auth);
  const [countdown, setCountdown] = useState(7);

  useEffect(() => {
    if(status === "succeeded") {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown -1);
      }, 1000);
      const redirectTimeout = setTimeout(() => {
        navigate("/login");
      }, countdown * 1000);
      return () => {
        clearInterval(timer);
        clearTimeout(redirectTimeout);
      };
    }
  }, [status, navigate, countdown]);
  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      fname: yup.string().required("Enter your first name"),
      lname: yup.string().required("Enter your last name"),
      email: yup
        .string()
        .required("Enter your email")
        .email("Enter a valid email"),
      password: yup.string().required("Enter your password").min(8,"Password must be at least 8 characters long")
    }),
    onSubmit: async (values, { resetForm, setStatus }) => {
      try {
        const result = await dispatch(signup(values));
        if (signup.fulfilled.match(result)) {
          resetForm();
        } else {
          setStatus(result.payload);
        }
      } catch (error) {
        console.error("Signup error:", error);
        setStatus("An uexpected error occured!");
      }
    },
  });
  return (
    <section className="h-screen">
      <div className="h-28">
        <img src="/images/taikent.png" alt="logo" className="h-28 ml-5" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full bg-gradient-to-l from-fuchsia-200 via-purple-200 to-transparent">
        <div>
        {message && (<div className="text-center text-sm font-bold mt-5" style={{color: status === "failed" ? "red" : "green"}}>
            {message}{status === "succeeded" && (<small>redirecting to login page in {countdown} seconds...</small>)}</div>)}
          <h1 className="font-medium text-2xl text-center mt-5">
            Let's get you started.
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
                  type="text"
                  name="fname"
                  placeholder="First Name"
                  className="w-full lg:w-4/5 py-2 px-4 outline-0 border-2 border-fuchsia-300 rounded-lg"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fname}
                />
              </div>
              <div>
                <small className="text-rose-700 font-medium ml-2 lg:ml-16">
                  {formik.touched.fname && formik.errors.fname}
                </small>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex lg:justify-center">
                <input
                  type="text"
                  name="lname"
                  placeholder="Last Name"
                  className="w-full lg:w-4/5 py-2 px-4 outline-0 border-2 border-fuchsia-300 rounded-lg"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lname}
                />
              </div>
              <div>
                <small className="text-rose-700 font-medium ml-2 lg:ml-16">
                  {formik.touched.lname && formik.errors.lname}
                </small>
              </div>
            </div>
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
                <small className="text-rose-700 font-medium ml-2 lg:ml-16">
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
                <small className="text-rose-700 font-medium ml-2 lg:ml-16">
                  {formik.touched.password && formik.errors.password}
                </small>
              </div>
            </div>
            <div className="mt-14 flex lg:justify-center">
              <button
                type="submit"
                className="p-3 w-full lg:w-4/5 font-medium text-2xl bg-black text-white hover:bg-violet-500 transition ease-in duration-200 rounded-lg"
              >
                Register
              </button>
            </div>
            <div className="text-center font-medium mt-8">
              <small>
                Already have an account?
                <Link
                  to="/login"
                  className="text-sm text-fuchsia-500 hover:text-violet-500"
                >
                     Login
                </Link>
              </small>
            </div>
          </form>
        </div>
        <div className="hidden lg:block">
          <img
            src="/images/signup.png"
            alt="signup illustration"
            className="w-4/5 mx-auto mt-32"
          />
        </div>
      </div>
    </section>
  );
};

export default Signup;
