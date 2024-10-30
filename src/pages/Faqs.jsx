import React, { useState} from "react";
import { faqData } from "./faqData";

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  }
  return (
    <section>
      <div>
        <div className="h-32">
          <img src="/images/taikent.png" alt="logo" />
        </div>
        <div className="text-center h-72 my-auto pt-20 bg-gradient-to-r from-fuchsia-200 to-transparent">
          <h1 className="text-5xl font-medium mb-3 tracking-wide">
            Frequently Asked Questions
          </h1>
          <p className="font-medium">Having Problems? Feel free to email us </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:block">
            <img src="/images/faqimg.png" alt="faq image" className="w-2/3 mx-auto mt-40" />
          </div>
          <div className="p-10">
            <div className="w-11/12 mx-auto">
              {faqData.map((faq, index) => (
                <div key={index} className="border-b border-fuchsia-500">
                  <div className="p-3 flex justify-between font-semibold text-lg cursor-pointer" onClick={() => toggleFaq(index)}>
                     <h3>{faq.question}</h3>
                     <span className={`transform transition-transform duration-600 ease-in-out ${activeIndex === index ? "rotate-180" : ""}`}>&#9660;</span>
                  </div>
                  {activeIndex === index && (
                    <div className="px-3 py-2">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faqs;
