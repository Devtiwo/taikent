import { useEffect, useState } from "react";
import axios from "axios";

const useBtcPrice = () => {
  const [btcPrice, setBtcPrice] = useState(0);

  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&x_cg_demo_api_key=${apiKey}`
        );

        setBtcPrice(response.data.bitcoin.usd);
      } catch (err) {
        console.error("Error fetching BTC price:", err);
      }
    };

    fetchPrice();
  }, [apiKey]);

  return btcPrice;
};

export default useBtcPrice;