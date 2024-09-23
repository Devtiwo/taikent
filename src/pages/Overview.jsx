import React, { useEffect } from "react";
import { FaWallet } from "react-icons/fa6";
import { GiCash } from "react-icons/gi";
import { BiMoneyWithdraw } from "react-icons/bi";

const Overview = () => {
  return (
    <div className="py-5 px-5 mt-10">
      <div className="flex flex-col lg:flex-row flex-wrap justify-between">
        <div className="px-4 py-5 bg-gradient-to-r from-fuchsia-100 to-purple-100 rounded-xl w-4/5 lg:w-2/5">
          <div className="flex mb-5 gap-5">
            <div className="rounded-full p-2 bg-white w-14">
            <FaWallet className="text-4xl mx-auto text-fuchsia-700"/>
            </div>
            <p className="text-base font-medium lg:mt-3">Wallet Address: 3AxZveoyW4MuR8NvjsH61Tfx2XSHZrTefp</p>
          </div>
          <div className="flex gap-5">
            <p className="text-xl font-medium mt-1"> Balance:</p>
            <p className="text-3xl font-semibold">$25000</p>
          </div>
        </div>
        <div className="px-4 py-5 bg-gradient-to-r from-fuchsia-200 to-purple-200 rounded-xl w-4/5 lg:w-2/5">
          <div className="flex mb-5 justify-between">
            <div className="rounded-full p-2 bg-white w-14">
            <GiCash className="text-4xl mx-auto text-fuchsia-700"/>
            </div>
            <p className="text-xl mt-2 font-medium">Investment Plan: platinum</p>
          </div>
          <div className="flex gap-5">
             <p className="text-xl font-medium mt-1">Profit:</p>
             <p className="text-3xl font-semibold">$7000 </p>
          </div>
        </div>
        <div className="px-4 py-5 bg-gradient-to-r from-fuchsia-200 to-purple-200 rounded-xl w-4/5 lg:w-2/5">
          <div className="flex mb-5 justify-between">
            <div className="rounded-full p-2 bg-white w-14">
            <BiMoneyWithdraw className="text-4xl mx-auto text-fuchsia-700"/>
            </div>
            <p className="text-xl mt-2 font-medium">Withdrawable at due date</p>
          </div>
          <div className="flex gap-5">
             <p className="text-xl font-medium mt-1">Balance:</p>
             <p className="text-3xl font-semibold">$7000900 </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
