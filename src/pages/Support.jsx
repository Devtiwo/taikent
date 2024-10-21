import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Support = () => {
  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      message: "",
    },
    validationSchema: yup.object({
      fname: yup.string().required("Enter your first name"),
      lname: yup.string().required("Enter your last name"),
      email: yup
        .string()
        .required("Enter your email")
        .email("Enter a valid email"),
      message: yup.string().required("Enter your message"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
      const response = await axios.post("https://formspree.io/f/mkgwalbw", values)
      if (response.status === 200) {
        toast.success("Message sent.", {
        className: "p-2",
        theme: "colored",
        position: "top-center"
        });
        resetForm();
      } else {
        toast.error("Error! Please try again!", {
        className: "p-2",
        theme: "colored",
        position: "top-center"
        });
      }
      } catch (err) {
        toast.error("Error! Please try again", {
        className: "p-2",
        theme: "colored",
        position: "top-center"
        });
      }
    }
  });
  return (
    <section className="h-screen">
      <div className="mt-40 lg:mt-32 lg:ml-56 h-full">
        <h1 className="text-center mt-10 text-2xl font-semibold my-5">
          Let us hear from you
        </h1>
        <p className="text-center font-medium">
          we always want to hear from you! Let us know how we can help you and
          we'll do our very best.
        </p>
        <form
          className="bg-slate-50 w-4/5 lg:w-3/5 mx-auto mt-10 p-10 rounded-lg"
          autoComplete="off"
          method="POST"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col lg:flex-row lg:mb-9 lg:gap-3">
            <div className="lg:flex-1 mb-9 lg:mb-0">
              <input
                type="text"
                name="fname"
                placeholder="First Name"
                className="w-full py-2 px-4 outline-0 border-2 border-fuchsia-300 rounded-lg"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fname}
              />
              <small className="text-rose-700 font-medium">
               {formik.touched.fname && formik.errors.fname}
              </small>
            </div>
            <div className="lg:flex-1 mb-9 lg:mb-0">
              <input
                type="text"
                name="lname"
                placeholder="Last Name"
                className="w-full py-2 px-4 outline-0 border-2 border-fuchsia-300 rounded-lg"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lname}
              />
              <small className="text-rose-700 font-medium">
               {formik.touched.lname && formik.errors.lname}
              </small>
            </div>
          </div>
          <div className="mb-9">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full py-2 px-4 outline-0 border-2 border-fuchsia-300 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <small className="text-rose-700 font-medium">
             {formik.touched.email && formik.errors.email}
            </small>
          </div>
          <div className="mb-9">
            <textarea
              placeholder="Tell us what we can help you with"
              className="w-full h-52 py-2 px-4 outline-0 border-2 border-fuchsia-300 rounded-lg"
              name="message"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
            ></textarea>
            <small className="text-rose-700 font-medium">
             {formik.touched.message && formik.errors.message}
            </small>
          </div>
          <div className="mt-20 w-full">
            <button
              type="submit"
              className="p-3 w-full font-medium text-2xl bg-black text-white hover:bg-fuchsia-700 transition ease-in duration-200 rounded-lg"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Support;
