import React, { useState, useEffect } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import axios from "axios";
import Modal from "../Components/Modal";

const Plans = () => {
  const [activeLink, setActiveLink] = useState("Starter");
  const [btcPrice, setBtcPrice] = useState("0");

  const apiKey = import.meta.env.VITE_API_KEY;
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&x_cg_demo_api_key=${apiKey}`
        );
        setBtcPrice(response.data.bitcoin.usd);
      } catch (err) {
        console.error("Error fetching btc price:", err);
      }
    };
    fetchPrice();
  }, [apiKey]);

  const plans = [
    {
      name: "Starter",
      price: "$500",
      benefit: [
        "Monthly withdrawals",
        "15% profit per week",
        "Email $ live chat Support",
      ],
    },
    {
      name: "Basic",
      price: "$1000",
      benefit: [
        "Monthly withdrawals",
        "25% profit per week",
        "Email & live chat support",
        "Real-time market price",
      ],
    },
    {
      name: "Premium",
      price: "$2500",
      benefit: [
        "Weekly & monthly withdrawals",
        "40% profit per week",
        "Email & live chat support",
        "Weekly market insights",
        "Real-time market price",
      ],
    },
    {
      name: "Platinum",
      price: "$5000",
      benefit: [
        "Weekly & monthly withdrawals",
        "60% profit per week",
        "Email & live chat support",
        "Weekly market insights",
        "Real-time market price",
        "Direct access to experts",
        "Detailed performance reporting",
        "Enhanced security & compliance",
      ],
    },
  ];
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const priceInUSD = selectedPlan
    ? parseFloat(selectedPlan.price.replace("$", "").replace(",", ""))
    : 0;
  const btcEquivalent = priceInUSD / btcPrice;

  const handleClick = (button) => {
    const selectedPlan = plans.find((plan) => plan.name === button);
    setActiveLink(button);
    setSelectedPlan(selectedPlan);
  };

  return (
    <section className="mt-32 pe-5 lg:ms-64 h-screen">
      <div className="ms-5 lg:ms-14">
        <div>
          {/* Plan buttons */}
          <div className="flex justify-between w-full lg:w-3/5 bg-slate-200 p-2 text-slate-500 rounded-full">
            {plans.map((plan) => (
              <button
                key={plan.name}
                type="button"
                className={`transition duration-300 px-6 py-3 rounded-full ${
                  activeLink === plan.name
                    ? "bg-fuchsia-700 text-white font-medium"
                    : ""
                }`}
                onClick={() => handleClick(plan.name)}
              >
                {plan.name}
              </button>
            ))}
          </div>
          <div className="flex flex-col lg:flex-row gap-20 mt-20">
            {/* Plan Price and package info */}
            <div className=" flex gap-20 border border-slate-300 rounded-lg p-10">
              <div>
                <p className="text-2xl font-medium">Price</p>
                {selectedPlan && (
                  <h1 className="mt-3 text-3xl font-semibold text-fuchsia-600">
                    {selectedPlan.price}
                  </h1>
                )}
              </div>
              <div>
                {selectedPlan && (
                  <>
                    <h2 className="text-2xl mb-3 font-medium">
                      Package Information
                    </h2>
                    <ul>
                      {selectedPlan.benefit.map((info, index) => (
                        <li className="flex gap-2 mb-3" key={index}>
                          <IoIosCheckmarkCircle className="text-green-500 mt-1" />
                          {info}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
            {/* Total Amount box */}
            <div className="bg-slate-100 px-10 py-12 rounded-lg w-full lg:w-2/5">
              <h2 className="text-2xl font-medium">
                Total Amount(USD):{" "}
                <span className="text-5xl ms-5 font-semibold text-fuchsia-600">
                  {selectedPlan.price}
                </span>
              </h2>
              <p className="font-medium text-sm mt-3">
                Equivalent in btc:{" "}
                <span className="text-2xl mt-2">
                  {btcEquivalent.toFixed(8)} btc
                </span>
              </p>
              <div className="mt-20 w-52 mx-auto">
                <button
                  type="button"
                  className="py-3 px-10 text-white bg-black rounded-lg font-medium transition ease-in duration-200 hover:bg-fuchsia-700"
                  onClick={() => setIsModalOpen(true)}
                >
                  Make Payment
                </button>
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          btcEquivalent={btcEquivalent.toFixed(8)}
          selectedPlan={selectedPlan}
        />
      </div>
    </section>
  );
};

export default Plans;
