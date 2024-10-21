import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { baseUrl } from "../Redux/authSlice";
import { toast } from "react-toastify";

const Forgotpassword = () => {
  const formik = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema: yup.object({
      email: yup.string().required("Email is required").email("Enter a valid email")
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(`${baseUrl}/auth/forgot-password`, values);
        if (response.data.status) {
          toast.success(response.data.message);
          resetForm();
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Server error! Please try again.");
      }
    }
  });
  return (
    <section className="h-screen px-5 bg-slate-100">
      <div className="h-full">
        <div>
          <img src="/images/taikent.png" alt="logo" className="lg:ml-5" />
        </div>
        <div>
            <h1 className="text-center text-5xl font-semibold mb-5">Reset Password</h1>
            <p className="font-medium text-center">Enter your registered email to receive password reset link</p>
            <form 
            className="mx-auto w-full lg:w-2/6 px-7 py-10 mt-5"
            autoComplete="off"
            method="POST"
            onSubmit={formik.handleSubmit}
            >
                <div className="flex flex-col mb-5 w-full">
                    <label htmlFor="email" className="mb-1 ml-1 text-sm">Email</label>
                    <input 
                    type="email" 
                    id="email" 
                    name="email"
                    placeholder="Email address"
                    className="p-3 outline-0 border-2 border-fuchsia-300 rounded-lg"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    />
                    <small className="text-rose-700 font-medium ml-1 mt-1">
                    {formik.touched.email && formik.errors.email}
                    </small>
                </div>
                <div className="flex justify-center mt-10">
                    <button type="submit"
                    className="p-3 font-medium text-base bg-black text-white hover:bg-fuchsia-700 transition ease-in duration-200 rounded-lg"
                    >Reset Password</button>
                </div>
            </form>
        </div>
      </div>
    </section>
  );
};

export default Forgotpassword;
