import React, {useEffect} from "react";

const Background = () => {
  const images = [
    { link: "/images/btc.png" },
    { link: "/images/eth.png" },
    { link: "/images/usdt.png" },
    { link: "/images/bnb.png" },
    { link: "/images/sol.png" },
    { link: "/images/usdc.png" },
    { link: "/images/xrp.png" },
    { link: "/images/doge.png" },
    { link: "/images/ton.png" },
    { link: "/images/car.png" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const elements = document.querySelectorAll(".moving-image");
      elements.forEach((el) => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
  <div className="absolute inset-0 z-0 h-full overflow-hidden">
     {images.map((image, index) => (
       <div
          key={index}
          className="moving-image absolute transition-transform duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${image.link})`,
            backgroundSize: 'cover',
            width: "40px",
            height: "40px"
          }}
       />
     ))}
  </div>
  )
};

export default Background;
