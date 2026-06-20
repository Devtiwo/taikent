import React, { useEffect } from "react";
import { FaWallet } from "react-icons/fa6";
import { GiCash } from "react-icons/gi";
import BtcChart from "../Components/BtcChart";
import { Link } from "react-router-dom";
import Coins from "../Components/Coins";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../Redux/userSlice";
import { updateBalance } from "../Redux/balanceSlice";
import useBtcPrice from "../hooks/useBtcPrice";

const Overview = () => {
  const userId = useSelector((state) => state.user.user?.userId);
  const balances = useSelector((state) => state.balance.balances) || {};
  const dispatch = useDispatch();
  const btcPrice = useBtcPrice();

  const userBalance = balances[userId] || {
    balance: 0,
    plan: "None",
    profit: 0
  };
  const { balance, plan, profit } = userBalance;

  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId));
      dispatch(updateBalance({ userId }));
    }
  }, [dispatch, userId]);

  const cards = [
    {
      wrapper: "bg-gradient-to-br from-cyan-400 to-green-400",
      icon: <FaWallet className="text-3xl mx-auto text-white" />,
      text: "Balance",
      title: "Total Balance",
      amount: `${balance}`,
    },
    {
      wrapper: "bg-gradient-to-br from-blue-400 to-purple-500",
      icon: <GiCash className="text-3xl mx-auto text-white" />,
      text: "Plan:",
      plan: `${plan}`,
      title: "Total Profit",
      amount: `${profit}`,
    },
  ];

  const formik = useFormik({
    initialValues: {
      amount: ""
    },
    validationSchema: yup.object({
      amount: yup
        .number()
        .required("Amount to withdraw is required")
        .positive("Amount must be more that 0")
        .test(
          "valid-btc-amount",
          "Must be a valid Bitcoin amount (up to 8 decimal places)",
          (value) =>
            value !== undefined && /^\d+(\.\d{1,8})?$/.test(value.toString())
        )
        .test(
          "sufficient-funds",
          "Insufficient funds",
          (value) => value <= balance
        ),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          "https://formspree.io/f/xnnqaqlo",
          values
        );
        if (response.status === 200) {
          toast.success("Withdrawal request sent");
          resetForm();
        } else {
          toast.error("Error sending withdrawal request!");
        }
      } catch (err) {
        toast.error("Error! pls try again");
      }
    },
  });
  return (
    <section className="px-5 mt-32 h-screen lg:ms-64">
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="lg:ms-10">

          {/* Balance Cards section */}
          <div className="flex flex-col lg:flex-row gap-5 w-full lg:w-11/12 font-montserrat">
            {cards.map((card, index) => {
              const btcAmount = btcPrice ? (card.amount / btcPrice).toFixed(8) : "Loading...";

              return (
              <div key={index} className={`${card.wrapper} p-8 flex flex-col w-full rounded-3xl`}>
                {/* Top */}
                <div className="flex mb-5 gap-4 items-center">
                  <div className="rounded-full bg-black/40 w-14 h-14 content-center">
                    {card.icon}
                  </div>

                  <p className="text-xl font-medium">
                    {card.text}
                  </p>

                  {card.plan && (
                    <p className="text-2xl font-medium">{card.plan}</p>
                  )}
                </div>
                {/* Bottom */}
                <div className="mt-8">
                  <p className="text-xl">
                    {card.title}
                  </p>
                  <h2 className="font-semibold text-3xl my-3">
                    ${card.amount.toLocaleString()} USD
                  </h2>
                  <p className="text-lg font-medium">{btcAmount} BTC</p>
                </div>
              </div>
            )})}
          </div>
          {/* Request Withdrawal section*/}
          <div className="mt-10 w-full lg:w-11/12 bg-slate-100 p-3 rounded-lg">
            <div className="rounded-lg p-3">
              <h1 className="text-3xl font-medium mb-1">Request Withdrawal</h1>
              <p className="mb-7 text-sm font-medium">
                Note: Your withdrawal request will be processed by the firm's
                finance team. Processing times may vary due to network
                congestion!
              </p>
              <div>
                <form
                  className="w-full"
                  method="POST"
                  autoComplete="off"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="mt-4 mb-7 ">
                    <label
                      htmlFor="amount"
                      className="ml-1 text-sm font-medium"
                    >
                      Amount to withdraw
                    </label>
                    <input
                      type="number"
                      id="amount"
                      className="outline-0 w-full py-2 px-4 text-sm placeholder-text-sm rounded-lg border-2 border-fuchsia-300"
                      name="amount"
                      placeholder="Amount to withdraw"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.amount}
                    />
                    <small className="text-rose-700 font-medium ml-1">
                      {formik.touched.amount && formik.errors.amount}
                    </small>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="bg-black font-medium text-white px-5 py-3 rounded-lg transition ease-in duration-200 hover:bg-fuchsia-700"
                    >
                      Submit request
                    </button>
                  </div>
                </form>
                <div></div>
              </div>
            </div>
          </div>
          {/* btc chart section*/}
          <div className="mt-14 w-full lg:w-11/12">
            <BtcChart />
          </div>
          {/* Enroll section*/}
          <div className="w-full lg:w-11/12 mt-10 mb-5 text-center bg-fuchsia-100 p-10 rounded-lg">
            <h2 className="text-2xl font-semibold mb-10">
              Have you enrolled in one of our investment plans? What are you
              waiting for, secure your financial freedom with us today
            </h2>
            <Link
              to="/dashboard/deposit"
              className="py-3 px-10 text-white bg-black rounded-lg font-medium transition ease-in duration-200 hover:bg-fuchsia-700"
            >
              Enroll Now
            </Link>
          </div>
        </div>
        <div className="ms-10 pe-5">
          <Coins />
        </div>
      </div>
    </section>
  );
};

export default Overview;
