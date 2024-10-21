import React from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from "yup";
import { baseUrl } from '../Redux/authSlice';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';


const Resetpassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPass: ""
    },
    validationSchema: yup.object({
      password: yup.string().required("password is required").min(8, "Password must be at least 8 characters long"),
      confirmPass: yup.string().required("Confirmation of new password is required").oneOf([yup.ref('password'), null], "Passwords do not match")
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(`${baseUrl}/auth/reset-password/${token}`, values);
        console.log(response.status === 200);
        if(response.data) {
          toast.success(response.data.message);
          resetForm();
          navigate("/login");
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
            <h1 className="text-center text-5xl font-semibold mb-5">Change Password</h1>
            <p className="font-medium text-center">provide a new password for your account</p>
            <form 
            className="mx-auto w-full lg:w-2/6 px-7 py-10 mt-5"
            autoComplete="off"
            method="POST"
            onSubmit={formik.handleSubmit}
            >
                <div className="flex flex-col mb-5 w-full">
                    <label htmlFor="password" className="mb-1 ml-1 text-sm">Create a new password</label>
                    <input
                    type="password" 
                    id="password" 
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
                <div className="flex flex-col mb-5 w-full">
                    <label htmlFor="confirmPass" className="mb-1 ml-1 text-sm">Confirm Password</label>
                    <input
                    type="password"
                    id="confirmPass" 
                    name="confirmPass"
                    placeholder="Confirm Password"
                    className="p-3 outline-0 border-2 border-fuchsia-300 rounded-lg"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPass}
                    />
                    <small className="text-rose-700 font-medium ml-1 mt-1">
                    {formik.touched.confirmPass && formik.errors.confirmPass}
                    </small>
                </div>
                <div className="flex justify-center mt-10">
                    <button type="submit"
                    className="py-3 px-5 font-medium text-base bg-black text-white hover:bg-fuchsia-700 transition ease-in duration-200 rounded-lg"
                    >Change Password</button>
                </div>
            </form>
        </div>
      </div>
    </section>
  )
}

export default Resetpassword