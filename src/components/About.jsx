import React from "react";

const About = () => {
  return (
    <section>
      <div className="h-auto flex flex-col lg:flex-row justify-evenly content-center px-3 text-white bg-violet-500 mb-5">
        <div className="text-center p-5">
          <small>Active users</small>
          <span className="font-bold text-2xl">1M+</span>
        </div>
        <div className="text-center p-5">
          <small>Transactions</small>
          <span className="font-bold text-2xl">$750M+</span>
        </div>
        <div className="text-center p-5">
          <small>Transactions per second</small>
          <span className="font-bold text-2xl">$1.2M+</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-32 pb-12 bg-gradient-to-r from-transparent to-fuchsia-100">
        <div className="p-2 mt-10">
          <h1 className="mx-auto w-4/5 tracking-wider font-bold text-5xl text-violet-500">
            What is Taikent?
          </h1>
          <p className="w-4/5 mx-auto tracking-wider my-4 font-medium">
            At Taikent Investments, we are dedicated to empowering individuals
            and institutions to navigate the exciting world of Bitcoin
            investment with confidence and clarity. Founded on the principles of
            innovation and transparency, our mission is to provide a secure,
            user-friendly platform that simplifies the complexities of
            cryptocurrency investment. Leveraging cutting-edge technology and
            expert insights, we offer tools and resources designed to optimize
            your investment strategy and maximize your potential returns.
            Whether you're a seasoned investor or new to Bitcoin, our team of
            industry professionals is here to guide you every step of the way.
            Join us at Taikent and be a part of the future of finance.
          </p>
        </div>
        <div className="hidden lg:block mt-10">
          <img src="/images/signup.png" alt="bitcoin logo" className="w-4/5 mx-auto"/>
        </div>
      </div>
    </section>
  );
};

export default About;
