import React from 'react';
import { IoIosCheckmarkCircle } from "react-icons/io";

const pricing = () => {
    const price = [
        {
          head: "Starter",
          cost: "$500",
          packageInfo: ["monthly withdrawals", "15% profit per week", "Email $ live chat Support"]
        },
        {
          head: "Basic",
          cost: "$1000",
          packageInfo: ["monthly withdrawals", "25% profit per week", "Email & live chat support", "Real-time market price"]
        },
        {
          head: "Premium",
          cost: "$2500",
          packageInfo: ["Weekly & monthly withdrawals", "40% profit per week", "Email & live chat support", "Weekly market insights", "Real-time market price"]
        },
        {
          head: "Platinum",
          cost: "$5000",
          packageInfo: ["Weekly & monthly withdrawals", "60% profit per week", "Email & live chat support", "Weekly market insighs", "Real-time market price", "Direct access to experts", "Detailed performance reporting", "Enhanced security & compliance"]
        }
      ];
  return (
    <section className="bg-gradient-to-t from-fuchsia-100 to-transparent">
        <h1 className="text-center text-4xl font-bold my-12">view our investment plans</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 justify-evenly w-4/5 mx-auto h-auto py-12 lg:py-20">
          {price.map((info, index) => (
            <div key={index} className="border-2 rounded-2xl border-fuchsia-300 w-64 mx-auto p-5">
                <p className="text-2xl font-medium mt-8 mb-5 text-center">{info.head}</p>
                <h1 className="mb-5 text-5xl font-bold text-center">{info.cost}</h1>
                <hr />
                <ul className="mt-16">
                    {info.packageInfo.map((pkg, index) => (
                        <li key={index} className="flex gap-2 mt-5 text-sm font-medium"><IoIosCheckmarkCircle className="text-green-500 mt-1" />{pkg}</li>
                    ))}
                </ul>
            </div>
          ))}
        </div>
    </section>
  )
}

export default pricing