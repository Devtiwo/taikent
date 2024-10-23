import React from 'react';
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="p-5 bg-slate-700 text-white">
        <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-5">
                <img src="/images/taikent.png" alt="logo" className="w-48"/>
                <p className="lg:w-3/4 ml-6">At Taikent investments, we are dedicated to providing you with cutting-edge Bitcoin investment solutions and unparalleled support. Our mission is to empower investors with innovative tools, expert insights, and a secure platform to help you navigate the dynamic world of cryptocurrency. Trust us to be your partner in achieving financial growth and success.</p>
            </div>
            <div className="p-5 flex flex-col lg:flex-row gap-10 mt-5 ml-5">
            <div>
              <h3 className="text-xl font-semibold mb-3">Contact</h3>
              <ul>
                <li className="flex gap-3 font-medium mb-3">
                  <FaLocationDot className="mt-0.5 text-fuchsia-500" />
                  P.O Box 56784, Los Angeles, California
                </li>
                <li className="flex gap-3 font-medium mb-3">
                  <MdEmail className="mt-0.5 text-fuchsia-500"/> support@taikentinvestments.com
                </li>
                {/* <li className="flex gap-3 font-medium mb-3">
                  <FaPhone className="mt-0.5 text-fuchsia-500"/> 305-465-7089
                </li> */}
              </ul>
            </div>
            <div> 
              <h3 className="text-xl font-semibold mb-3">Useful links</h3>
              <ul>
                <li className="font-medium mb-3 hover:text-fuchsia-500">
                  <Link to="/home">Home</Link>
                </li>
                <li className="font-medium mb-3 hover:text-fuchsia-500">
                  <Link to="/login">Login</Link>
                </li>
                <li className="font-medium mb-3 hover:text-fuchsia-500">
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li className="font-medium mb-3 hover:text-fuchsia-500">
                  <Link to="/faqs">FAQs</Link>
                </li>
              </ul>
            </div>
          </div>
      </div>
      <hr />
      <div className="text-center font-semibold py-1">
      <small>Taikent Investments &copy; 2024 - Transforming Bitcoin into Prosperity!</small>
     </div>
     </div>
    </footer>
  )
}

export default Footer