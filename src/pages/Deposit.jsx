import { useState } from "react";
import { FaCopy, FaGift } from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import { CiBank } from "react-icons/ci";
import { SiWesternunion, SiMoneygram } from "react-icons/si";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../Redux/authSlice";
import useBtcPrice from "../hooks/useBtcPrice";

const Deposit = () => {
  const [popUp, setPopUp] = useState(false);
  const [activeCrypto, setActiveCrypto] = useState("");
  const [activeOthers, setActiveOthers] = useState("");
  const userId = useSelector((state) => state.user.user?.userId);

  const btcWallet = import.meta.env.VITE_WALLET_ADDRESS;
  const usdtWallet = import.meta.env.VITE_USDT_WALLET_ADDRESS;
 
  const btcPrice = useBtcPrice();

  const cryptoData = {
    BTC: {
      address: btcWallet,
      warning: "Send only Bitcoin (BTC) to this address via the Bitcoin network. Sending any other asset or using a different network will result in permanent loss of funds."
    },
    USDT: {
      address: usdtWallet,
      warning: "Send only USDT (TRC20) to this address via the TRON network. Sending any other asset or using a different network will result in permanent loss of funds."
    }
  }
  
  const plans = [
   {
     id: "Starter",
     amount: 500
   },
   {
     id: "Basic",
     amount: 1000
   },
   {
     id: "Premium",
     amount: 2500
   },
   {
     id: "Platinum",
     amount: 5000
   }
  ];

  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const priceInUSD = selectedPlan.amount;
  const btcEquivalent = priceInUSD / btcPrice;

  const otherData = [
    { id: "Bank Transfer",
      title: "Bank Wire",
      icon: <CiBank className="text-5xl text-blue-500" />,
      desc: "1-3 Business days",
      submenu: {
        note: (
         <p>Kindly send us an email at <span className="font-semibold">taikentinvestment@financier.com</span> to request for account information for deposits. Also note that this mode of payment is for transfers above $2500</p>
       )
      }
    },
    {
      id: "Global Transfers",
      title: "Global Transfers",
      children: [
        { 
          id: "Western union",
          title: "Western Union",
          icon: <SiWesternunion className="text-5xl text-yellow-400"/>
        },
        {
          id: "Moneygram",
          title: "MoneyGram",
          icon: <SiMoneygram className="text-5xl text-red-500"/>
        }
      ],
      submenu: {
        note: (
          <p>Kindly send us an email at <span className="font-semibold">taikentinvestment@financier.com</span> to request for information for international transfers.</p>
        )
      }
    },
    {
      id: "Gift Cards",
      title: "Gift Cards",
      icon: <FaGift className="text-4xl text-green-500" />,
      desc: "Apple gift cards only",
      submenu: {
        note:( 
          <ol className="list-decimal list-inside space-y-2">
           <li>Purchase gift cards in $50 or $100 denominations to make a total of your preferred plan type.</li>
           <li>Peel off the shiny silver cover to reveal the gift card code.</li>
           <li>Take a clear image of the card revealing the code and email it to <span className="font-semibold">taikentinvestment@financier.com</span></li>
          </ol>
        ) 
      }
    }
  ];

  const handleCopy = () => {
    navigator.clipboard
      .writeText(cryptoData[activeCrypto].address)
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
  
  const handlePaymentMade = async () => {
    const paymentInfo = {
      userId,
      planName: selectedPlan.id,
      amount: priceInUSD,
      cryptoAmount: activeCrypto === "BTC" ? btcEquivalent.toFixed(8) : priceInUSD,
      paymentMethod: activeCrypto
    }
    try {
      const response = await axios.post(`${baseUrl}/user/payment`, paymentInfo);
      if (response.data.status === true) {
        toast.success(response.data.message);
      }
    } catch(err) {
      console.error("error recording payment: ", err);
      toast.error(err.response?.data?.message || "Error submitting payment");
    } 
  };

  return (
    <section className="mt-32 lg:ms-64 pb-10">
      <div className="lg:ms-10 py-5">
        <div className="mb-10 px-3">
          <h1 className="text-3xl text-center mb-10">Deposit Funds</h1>
        </div>
        <div className="w-full lg:w-3/4 mx-auto">
            <strong className="font-semibold text-lg mx-5 lg:mx-0">Cryptocurrency</strong>

            {/* Cryptocurrency deposit section */}
            <div className="p-5 mx-auto flex flex-row gap-5 lg:gap-10">

              {/* Bitcoin Card */}
              <div className="bg-slate-100 p-3 rounded-lg flex-1 cursor-pointer hover:bg-slate-200" 
                onClick={() => setActiveCrypto((prev) => prev === "BTC" ? "" : "BTC") }>
                <img src="/images/btc.png" alt="Bitcoin logo" className="mb-2"/>
                <p className="font-semibold text-lg leading-none">Bitcoin </p>
              </div>
              {/* USDT Card */}
              <div className="bg-slate-100 p-3 rounded-lg flex-1 cursor-pointer hover:bg-slate-200" 
                onClick={() => setActiveCrypto((prev) => prev === "USDT" ? "" : "USDT")}>
                <img src="/images/usdt.png" alt="USDT logo" className="mb-2" />
                <p className="font-semibold text-lg leading-none">USDT (TRC20)</p>
              </div>
            </div>

            {/* SubMenu for crypto card */}
            {activeCrypto && (
              <div className="mx-auto p-5 bg-slate-50">
                {/* plans selection to determine amount to be deposied */}
                <div className="flex flex-nowrap justify-center gap-2 w-full md:w-4/5 mx-auto bg-slate-200 p-2 my-5 font-semibold rounded-full">
                  {plans.map((plan) => (
                  <button key={plan.id}  type="button" onClick={() => setSelectedPlan(plan)} className={`transition w-full duration-300 px-4 py-2 text-sm md:text-base rounded-full whitespace-nowrap ${
                  selectedPlan?.id === plan.id ? "bg-gray-900 text-white font-medium" : "hover:bg-slate-300"}`}>
                    {plan.id}
                  </button>
                ))}
                </div>

                {/* selected plan and amount to be deposited */}
                <div className="mx-auto w-full lg:w-4/5 my-10 leading-10">
                 <p>Selected Plan:  <span className="text-2xl font-semibold">{selectedPlan.id}</span></p>
                 <p>Amount in USD: <span className="text-2xl font-semibold">${priceInUSD}</span></p>
                 <p>Amount to deposit({activeCrypto === "BTC" ? "btc" : "usdt"}): <span className="text-2xl font-semibold">
                    {activeCrypto === "BTC" ? `${btcEquivalent.toFixed(8)} BTC` : `${priceInUSD.toLocaleString()} USDT`}</span>
                  </p>
                </div>
                
                {/* Wallet address and QR code for payment */}
                <div className="text-center mb-5">
                  <h2 className="font-semibold text-xl">Your Wallet Address</h2>
                  <p>Scan the QR code to deposit funds</p>
                </div>
                <div>
                  <QRCodeSVG value={cryptoData[activeCrypto].address} size={150} className="mx-auto"/>
                </div>
                <p className="text-center my-5 text-2xl">OR</p>
                <div className="p-5 flex gap-2 lg:gap-5 my-5 mx-auto lg:w-auto border-2 rounded-lg">
                  <p className="flex-1 text-center text-sm break-all">{cryptoData[activeCrypto].address}</p>
                  <div className="relative shrink-0">
                   <FaCopy onClick={handleCopy} className="text-xl cursor-pointer hover:text-fuchsia-500"/>
                   {popUp && ( <p className="absolute bottom-8 left-1 right-2 w-40 text-sm py-3">copied!</p>)}
                  </div>
                </div>
                <div className="bg-slate-50 p-3 text-amber-400 rounded-lg mt-5">
                  <p className="font-bold mb-3">⚠️ Important Warning</p>
                  <p className="text-sm font-semibold">{cryptoData[activeCrypto].warning}</p>
                </div>
                <p className="text-center my-5 font-medium">Only click on the button below after sending your payment.</p>
                <div className="text-center my-5">
                  <button
                  onClick={handlePaymentMade}
                  className="px-5 py-3 outline-none bg-green-500 text-white rounded-full font-semibold hover:bg-green-700 transition ease-in duration-200">
                    I've made payment
                  </button>
                </div>
              </div>
            )}

            {/* Other Menus */}
            {otherData.map((item) => (
              <div key={item.id} className="my-5">
                <strong className="font-semibold text-lg mx-5 lg:mx-0">{item.id}</strong>

                {/* if menu has children */}
                {item.children ? (
                  <div className="p-5 flex gap-5 lg:gap-10 mx-auto">
                    {item.children.map((child) => (
                      <div key={child.id}
                      onClick={() => setActiveOthers((prev) => prev === item.id ? "" : item.id)}
                      className="flex items-center gap-3 px-3 py-7 flex-1 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer">
                        <div>{child.icon}</div>
                        <p className="font-semibold text-lg leading-none">{child.title}</p>
                      </div>
                    ))}
                  </div>
                ): (
                  /* Menu for single card categories */
                  <div className="flex items-center gap-10 px-3 py-7 mx-5 my-3 lg:mx-0 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
                    onClick={() => setActiveOthers((prev) => prev === item.id ? "" : item.id)}
                  >
                    <div>{item.icon}</div>
                    <div>
                      <p className="font-semibold text-lg leading-none">{item.title}</p>
                      <small>{item.desc}</small>
                    </div>
                  </div>
                )}
                 {/* SubMenu for other payment methods */}
                 {activeOthers === item.id && (
                 <div className="mx-auto px-10 py-2 bg-slate-50 text-sm">{item.submenu.note}</div>
              )}
              </div>
            ))}
         </div> 
      </div>
    </section>
  );
};

export default Deposit;
