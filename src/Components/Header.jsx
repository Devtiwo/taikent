import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const token = localStorage.getItem("token");
    if(!token) {
      navigate("/login");
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const isTokenExpired = payload.exp * 1000 < Date.now();
      if (isTokenExpired) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <header>
      <nav className="h-28 flex justify-between pe-5 lg:pe-24">
        <div>
          <img src="/images/taikent.png" alt="logo" />
        </div>
        <div className="my-auto"> 
          <button 
          type="button"
          onClick={handleClick}
          className="py-2 px-12 outline-0 transition ease-in duration-200 font-medium border-2 border-fuchsia-500 hover:text-white hover:bg-fuchsia-700 hover:border-none"
          >
            Login
            </button>
        </div>
      </nav>
      <section className="px-14 py-16 lg:p-32 bg-gradient-to-r from-fuchsia-50 to-transparent">
        <h1 className="text-4xl tracking-wider font-bold">Start investing in cryptocurrency</h1>
        <p className="lg:w-3/5 tracking-wider mt-5 mb-8 font-medium">
          Welcome to Taikent Investments, where innovation meets opportunity.
          Our cutting-edge tools and real-time insights empower you to invest in
          the world of cryptocurrency with confidence. Whether you're a seasoned
          investor or just starting out, Taikent Investments provides the
          seamless, secure, and intuitive experience you need to maximize your
          investments and stay ahead in the digital economy. Start your journey
          today and transform your financial future.
        </p>
        <Link to="/signup" className="w-32 p-3 bg-black text-white transition duration-300 ease-in font-semibold hover:bg-white hover:border-2 hover:border-black hover:text-black">Start Investing</Link>
      </section>
    </header>
  );
};

export default Header;
