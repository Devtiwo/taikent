import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = () => {
  var settings = {
    dots: true,
    infinite: true,
    fade: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "linear",
  };

  const feedback = [
    {
      text: "Investing with Taikent has been a game-changer for me. The intuitive interface and real-time insights have made managing my Bitcoin investments so much easier. I've seen a significant improvement in my returns, and the customer support is outstanding!",
      name: "David M."
    },
    {
      text: "I was initially hesitant about Bitcoin, but Taikent made the process seamless and straightforward. The support provided helped me make informed decisions and maximize my investment potential. Highly recommended for both beginners and seasoned investors!",
      name: "Sarah L."
    },
    {
      text: "As a long-time investor, I've tried various platforms, but Taikent stands out with its innovative and excellent user experience. The platform's easy to use features are top-notch, and I appreciate the transparency and security it offers.",
      name: "Emily R."
    },
    {
      text: "What I love about Taikent Investments platform is the proactive customer support and the detailed reports they provide. The platform's features have empowered me to make smarter investment decisions and grow my portfolio significantly. It's a reliable tool for anyone serious about Bitcoin investing.",
      name: "Sugikawa I."
    },
    {
      text: "As a new comer in the world of bitcoin, It all looked skeptical at first but i gave it a second thought and i am glad i did. I just got my first withdrawal. Super fast and easy withdrawal process. It's worth it.",
      name: "Muthabo N."
    },
    {
      text: "I've been using Taikent investments for several months now, and the results speak for themselves. The platform's easy-to-navigate interface and valuable insights have made a huge difference in my investment strategy. I'm impressed with the level of professionalism and expertise provided.",
      name: "Michael T."
    },
    {
      text: "Joining Taikent investments was one of the best decisions I've made for my investment journey. The platform is user-friendly and offers great educational resources that helped me understand Bitcoin better. I've already recommended it to friends and family!",
      name: "Corey B."
    },
    {
      text: "The robust security features and user-centric design of Taikent platform have made me feel confident in managing my Bitcoin investments. The platform's reliability and the quality of customer service are second to none. It's truly a top-tier investment solution.",
      name: "Robert J."
    }
  ];
  return (
    <section>
      <h1 className="text-center my-16 mx-5 font-bold text-3xl">Listen to what our investors have to say</h1>
      <div className="w-4/5 lg:w-4/6 mx-auto mb-16 bg-gradient-to-b from-fuchsia-300 to-transparent px-10 rounded-3xl">
        <Slider {...settings}>
            {feedback.map((review, index) => (
              <div key={index} className="mx-auto overflow-hidden my-10 border-2 border-white bg-white p-10 rounded-3xl lg:h-72 text-center content-center">
                <p className="tracking-wider mb-3 font-medium">{review.text}</p>
                <span className="text-2xl font-semibold">— {review.name}</span>
              </div>               
            ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
