import React from "react";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <section className="h-screen text-center">
      <div className="h-full p-3">
        <div>
          <img
            src="/images/error.png"
            alt="error image"
            className="mx-auto my-20 w-96 lg:w-auto"
          />
        </div>
        <h1 className="text-xl w-4/5 lg:w-3/5 mx-auto">
          OOPS!The Page you are looking for might have been removed, had it's
          name changed or is temporarily Unavailable
        </h1>
        <div className="mt-10">
          <Link
            to="/"
            className="border-2 border-purple-300 rounded-lg py-3 px-12 transition ease-in duration-200 font-semibold text-2xl hover:bg-purple-500 hover:border-none hover:text-white"
          >
            Go back
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Notfound;
