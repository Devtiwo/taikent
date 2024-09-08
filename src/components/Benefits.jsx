import React from 'react';
import { FaFolder } from "react-icons/fa";
import { BsTransparency } from "react-icons/bs";
import { BiMoneyWithdraw } from "react-icons/bi";
import { GiWorld } from "react-icons/gi";
import { RiCustomerService2Line } from "react-icons/ri";
import { MdOutlineSecurity } from "react-icons/md";

const Benefits = () => {
  const benefit = [
    {
        icon: <FaFolder className="text-5xl mx-auto my-5 text-fuchsia-300"/>,
        head: "Grow your portfolio",
        desc: "With advanced market data, news and professional research,rapid growth of your portfolio is assured."
    },
    {
        icon: <BsTransparency className="text-5xl mx-auto my-5 text-fuchsia-300"/>,
        head: "Transparency",
        desc: "The use of blockchain technology guarantees maximum transparency of the fund's activities."
    },
    {
        icon: <BiMoneyWithdraw className="text-5xl mx-auto my-5 text-fuchsia-300"/>,
        head: "Fast Withdrawals",
        desc: "You can withdraw your assests at any point in time and withdrawals are super fast and easy."
    },
    {
        icon: <GiWorld className="text-5xl mx-auto my-5 text-fuchsia-300"/>,
        head: "We are borderless",
        desc: "No matter the part of the world you live, we have you covered."
    },
    {
        icon: <RiCustomerService2Line className="text-5xl mx-auto my-5 text-fuchsia-300"/>,
        head: "Good Customer Support",
        desc: "Our customer support are available 24/7 to cater to your needs and questions."
    },
    {
        icon: <MdOutlineSecurity className="text-5xl mx-auto my-5 text-fuchsia-300"/>,
        head: "Data Security",
        desc: "All data provided on our platform are all encrypted before stored."
    }
  ];
  return (
    <section>
        <div className="py-12 lg:py-20">
            <h1 className="text-center text-4xl font-bold my-16">Benefits you'll enjoy</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 justify-evenly w-4/5 mx-auto my-14 gap-10">
                {benefit.map((info, index) => (
                  <div key={index} className="h-auto p-3 border-2 rounded-3xl border-slate-200 text-center w-58">
                    {info.icon}
                    <h2 className="text-2xl font-semibold my-3">{info.head}</h2>
                    <p className="tracking-wider font-medium">{info.desc}</p>
                  </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default Benefits