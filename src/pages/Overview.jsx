import React, { useState, useEffect } from "react";
import { FaWallet } from "react-icons/fa6";
import { GiCash } from "react-icons/gi";
import { BiMoneyWithdraw } from "react-icons/bi";
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

const Overview = () => {
  const [btcToUsdRate, setBtcToUsdRate] = useState(null);
  const userId = useSelector((state) => state.user.user?.userId);
  const balances = useSelector((state) => state.balance.balances) || {};
  const dispatch = useDispatch();

  const userBalance = balances[userId] || {
    balance: 0,
    plan: "None",
    profit: 0,
    withdrawBal: 0,
  };
  const { balance, plan, profit, withdrawBal } = userBalance;

  useEffect(() => {
    const fetchBtcRate = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
        );
        setBtcToUsdRate(response.data.bitcoin.usd);
      } catch (error) {
        console.error("Error fetching BTC to USD rate:", error);
      }
    };
    fetchBtcRate();
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId));
      dispatch(updateBalance({ userId }));
    }
  }, [dispatch, userId]);

  const formatUsd = (btcValue) => {
    if (btcToUsdRate === null) return "Loading...";
    const usdValue = btcValue * btcToUsdRate;
    return `$${usdValue.toFixed(2)}`;
  };

  const cards = [
    {
      wrapper: "p-3 bg-lime-100 w-full rounded-lg",
      icon: <FaWallet className="text-3xl mx-auto text-lime-700" />,
      text: "Balance",
      balDesc: "Btc",
      balance: balance.toFixed(8),
      usdEquivalent: formatUsd(balance),
    },
    {
      wrapper: "p-3 bg-sky-100 w-full rounded-lg",
      icon: <GiCash className="text-3xl mx-auto text-sky-700" />,
      text: `Plan: ${plan}`,
      balDesc: "Profit",
      balance: profit.toFixed(8),
      usdEquivalent: formatUsd(profit),
    },
    {
      wrapper: "p-3 bg-orange-100 w-full rounded-lg",
      icon: <BiMoneyWithdraw className="text-3xl mx-auto text-orange-700" />,
      text: "Withdrawable",
      balDesc: "Balance",
      balance: withdrawBal.toFixed(8),
      usdEquivalent: formatUsd(withdrawBal),
    },
  ];

  const formik = useFormik({
    initialValues: {
      accName: "",
      amount: "",
    },
    validationSchema: yup.object({
      accName: yup.string().required("select the account to withdraw from"),
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
          (value) => value <= withdrawBal
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
        <div className="ms-5 lg:ms-10">
          {/* Balance Cards section */}
          <div className="flex flex-col lg:flex-row gap-5 w-full lg:w-11/12">
            {cards.map((card, index) => (
              <div key={index} className={card.wrapper}>
                <div className="flex mb-5 gap-4">
                  <div className="rounded-full bg-white w-12 h-12 content-center">
                    {card.icon}
                  </div>
                  <p className="text-base font-medium text-slate-500 mt-2">
                    {card.text}
                  </p>
                </div>
                <div className="bg-white px-3 rounded-full py-1">
                  <p className="font-medium mx-auto content-center text-xs">
                    {card.balDesc}:
                    <span className="ms-3 font-semibold text-sm content-center">
                      {card.balance} ⇔ {card.usdEquivalent}
                    </span>
                  </p>
                </div>
              </div>
            ))}
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
                  <div className="bg-fuchsia-300 py-5 px-5 rounded-lg">
                    <h2 className="text-2xl font-semibold">Select Account</h2>
                    <p className="font-medium text-sm mb-5">
                      Select the account you will like to withdraw from
                    </p>
                    <div>
                      <select
                        className="outline-0 w-full p-2 font-medium rounded-md text-sm text-gray-700 placeholder-text-sm"
                        name="accName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.accName}
                      >
                        <option value="">Select Account for Withdrawal</option>
                        <option value={plan}>{plan}</option>
                      </select>
                      <small className="text-rose-700 font-medium ml-1">
                        {formik.touched.accName && formik.errors.accName}
                      </small>
                    </div>
                  </div>
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
              to="/dashboard/plans"
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
