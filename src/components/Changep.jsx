import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { baseUrl } from "../Redux/authSlice";
import { toast } from "react-toastify";
import axios from "axios";



const Changep = () => {
  const formik = useFormik({
    initialValues: {
      current: "",
      newp: "",
      confirmP: "",
    },
    validationSchema: yup.object({
      current: yup.string().required("Current password is required"),
      newp: yup.string().required("New password is required").min(8,"Password must be at least 8 characters long"),
      confirmP: yup.string().required("Confirmation of new password is required")
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${baseUrl}/user/changepassword`, values, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if(response.data.status) {
          toast.success(response.data.message);
          resetForm();
        } else {
          toast.error(response.data.message || "Error changing password");
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Server error! Please try again.");
      }
    }
  });
  return (
    <section className="mt-20">
      <div>
        <h1 className="text-4xl ml-5">Change Password</h1>
        <form
          className="p-5 w-full lg:w-2/5 mt-5 mb-10"
          method="POST"
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col w-full mb-5">
            <label htmlFor="current" className="mb-1 ml-1">
              Current password
            </label>
            <input
              type="password"
              name="current"
              id="current"
              placeholder="Enter your current password"
              className="p-3 border-2 border-fuchsia-300 outline-0 border-2 border-fuchsia-300 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.current}
            />
            <small className="text-rose-700 font-medium ml-1 mt-1">
             {formik.touched.current && formik.errors.current}
            </small>
          </div>
          <div className="flex flex-col w-full mb-5">
            <label htmlFor="newp" className="mb-1 ml-1">
              New password
            </label>
            <input
              type="password"
              name="newp"
              id="newp"
              placeholder="Enter your new password"
              className="p-3 border-2 border-fuchsia-300 outline-0 border-2 border-fuchsia-300 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newp}
            />
            <small className="text-rose-700 font-medium ml-1 mt-1">
             {formik.touched.newp && formik.errors.newp}
            </small>
          </div>
          <div className="flex flex-col w-full mb-5">
            <label htmlFor="confirmP" className="mb-1 ml-1">
              Confirm password
            </label>
            <input
              type="password"
              name="confirmP"
              id="confirmP"
              placeholder="Enter your new password again"
              className="p-3 border-2 border-fuchsia-300 outline-0 border-2 border-fuchsia-300 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmP}
            />
            <small className="text-rose-700 font-medium ml-1 mt-1">
             {formik.touched.confirmP && formik.errors.confirmP}
            </small>
          </div>
          <div className="mt-12">
            <button
              type="submit"
              className="py-3 px-5 w-auto font-medium text-lg bg-black text-white hover:bg-purple-500 transition ease-in duration-200 rounded-lg"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Changep;
