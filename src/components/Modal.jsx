import React, {useState} from 'react';
import { FaCopy } from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { baseUrl } from '../Redux/authSlice';

const Modal = ({isOpen, onClose, btcEquivalent, selectedPlan}) => {
  const [popUp, setPopUp] = useState(false);
  const wallet = import.meta.env.VITE_WALLET_ADDRESS;
  const userId = useSelector((state) => state.user.user?.userId);

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

  if (!isOpen || !userId) return null;

  const handlePaymentMade = async () => {
    const paymentInfo = {
      userId,
      planName: selectedPlan.name,
      amount: selectedPlan.price.replace('$', '').trim(),
      btcEquivalent: btcEquivalent
    }
    try {
      const response = await axios.post(`${baseUrl}/user/payment`, paymentInfo);
      if (response.status === 201) {
        toast.success(response.data.message);
        onClose();
      }
    } catch(err) {
      console.error("error recording payment: ", err);
      toast.error(err.response?.data?.message);
    } 
  };

  return (
    <section className="fixed inset-0 flex items-center z-50 justify-center bg-black bg-opacity-80">
      <div className="bg-white rounded-lg p-10 relative">
      <div>
       <MdClose
       onClick={onClose}
       className="text-2xl cursor-pointer float-right mb-10 absolute top-7 right-5"
       />
      </div>
        <p className="text-center mt-10">send {btcEquivalent} btc to the wallet address below</p>
        <div className="flex gap-2">
              <div className="border-2 border-slate-300 py-2 px-5 mt-3 rounded-lg">
                <p>{wallet}</p>
              </div>
              <div className="relative">
                <FaCopy
                  onClick={handleCopy}
                  className="text-4xl mt-4 cursor-pointer hover:text-fuchsia-500"
                />
                {popUp && (
                  <p className="absolute bottom-8 left-4 right-2 w-40 text-sm py-3">
                    copied!
                  </p>
                )}
              </div>
            </div>
            <p className="text-center my-5">OR</p>
            <p className="my-5 text-center">Scan the QR code below to send bitcoin</p>
            <div className="mb-7">
              <QRCodeSVG value={wallet} size={200} className="mx-auto"/>
            </div>
            <div className="text-center mb-10">
                <p>click the button below after payment is sent.</p>
            </div>
            <div className="w-52 mx-auto">
                <button type="button" 
                className="outline-0 py-3 px-10 text-white bg-black rounded-lg font-medium transition ease-in duration-200 hover:bg-fuchsia-700"
                onClick={handlePaymentMade}
                >
                Payment made
                </button>
            </div>
      </div>
    </section>
  )
}

export default Modal;