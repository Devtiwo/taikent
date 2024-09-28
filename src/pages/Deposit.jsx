import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";


const Deposit = () => {
  const [popUp, setPopUp] = useState(false);
  const wallet = import.meta.env.VITE_WALLET_ADDRESS;

  const handleCopy = () => {
    navigator.clipboard
      .writeText(wallet)
      .then(() => {
        setPopUp(true);
        setTimeout(() => {
          setPopUp(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      amount: ""
    },
    validationSchema: yup.object({
      fname: yup.string().required("First name is required"),
      lname: yup.string().required("Last name is required"),
      amount: yup.number().required("Amount deposited is required").positive("Amount must be more than 0").test('valid-btc-amount', 'Must be a valid Bitcoin amount (up to 8 decimal places)', value => 
        value !== undefined && /^\d+(\.\d{1,8})?$/.test(value.toString())
      )
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post("https://formspree.io/f/xyzgqdpe", values);
        if (response.status === 200) {
          toast.success("Deposit confirmed.", {
            theme: "colored",
            position: "top-center"
          });
          resetForm();
        } else {
          toast.error("Error confirming your deposit!", {
            theme: "colored",
            position: "top-center"
          });
        } 
      } catch(err) {
        toast.error("Error! pls try again", {
          theme: "colored",
          position: "top-center"
        });
      }
    }
  });

  return (
    <section className="mt-32 lg:ml-56">
      <div className="w-4/5 mx-auto py-5">
        <div className="mb-10">
          <h1 className="text-3xl mb-2">Desposit Funds</h1>
          <p className="text-xl">
            you can deposit or top up your investment portfolio for more
            returns.
          </p>
        </div>
        <div className="w-4/5 mx-auto">
          <div>
            <h2 className="font-semibold mb-2 text-xl">Step 1.</h2>
            <p className="mb-3">
              Send bitcoin to the bticoin wallet address below
            </p>
            <div className="flex gap-2 w-2/5 rounded-lg">
              <div className="border-2 border-slate-300 py-2 px-5 mt-3 rounded-lg">
                <p>{wallet}</p>
              </div>
              <div className="relative">
                <FaCopy
                  onClick={handleCopy}
                  className="text-2xl mt-5 cursor-pointer hover:text-fuchsia-500"
                />
                {popUp && (
                  <p className="absolute bottom-5 left-7 right-0 w-40 text-sm py-2">
                    copied!
                  </p>
                )}
              </div>
            </div>
            <p className="ml-32 my-5">OR</p>
            <p className="my-5">Scan the QR code below to send bitcoin</p>
            <div className="mb-10">
              <QRCodeSVG value={wallet} size={200} />
            </div>
          </div>
          <div>
            <div>
              <h2 className="font-semibold mb-2 text-xl">Step 2.</h2>
              <p className="mt-5">Confirm your deposit</p>
              <form
                method="POST"
                autoComplete="off"
                className="bg-slate-50 rounded-lg px-7 mb-20 py-10 w-4/5 lg:w-3/5"
                onSubmit={formik.handleSubmit}
              >
                <div className="mb-7">
                  <input
                    type="text"
                    name="fname"
                    placeholder="First Name"
                    className="w-full p-2 border-2 border-fuchsia-300 outline-0 border-2 border-fuchsia-300 rounded-lg"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fname}
                  />
                  <div>
                    <small className="text-rose-700 font-medium">
                     {formik.touched.fname && formik.errors.fname}
                    </small>
                  </div>
                </div>
                <div className="mb-7">
                  <input
                    type="text"
                    name="lname"
                    placeholder="Last Name"
                    className="w-full p-2 border-2 border-fuchsia-300 outline-0 border-2 border-fuchsia-300 rounded-lg"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lname}
                  />
                  <div>
                    <small className="text-rose-700 font-medium">
                     {formik.touched.lname && formik.errors.lname}
                    </small>
                  </div>
                </div>
                <div>
                  <input
                    type="number"
                    name="amount"
                    placeholder="Amount Deposited (in bitcoin)"
                    className="w-full p-2 border-2 border-fuchsia-300 outline-0 border-2 border-fuchsia-300 rounded-lg"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.amount}
                  />
                  <div>
                    <small className="text-rose-700 font-medium">
                     {formik.touched.amount && formik.errors.amount}
                    </small>
                  </div>
                </div>
                <div className="mt-14">
                  <button
                    type="submit"
                    className="p-3 w-full font-medium text-xl bg-black text-white hover:bg-fuchsia-700 transition ease-in duration-200 rounded-lg"
                  >
                    Confirm Deposit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Deposit;
