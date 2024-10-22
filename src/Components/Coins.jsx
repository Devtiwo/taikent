import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { toast } from 'react-toastify';

const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&x_cg_demo_api_key=${apiKey}`);
        setCoins(response.data);
      } catch (err) {
        toast.error("Error fetching market data");
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  return (
    <section className="h-screen overflow-y-auto">
      <table className="border">
        <thead>
          <tr>
            <th className="py-3">Coin</th>
            <th className="py-2">Current Price</th>
            <th className="px-4 py-2">Market Cap</th>
            <th className="px-4 py-2">24hr Change</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (<tr><td colSpan="4" className="text-center py-4">Loading...</td></tr>) : coins.map(coin => (
            <tr key={coin.id} className="border">
              <td className="flex gap-3 px-4 py-2">
                <img className="w-10" src={coin.image}/>
                <span className="mt-2 font-bold">{coin.symbol}</span>
              </td>
              <td className="px-4 py-2">{coin.current_price.toLocaleString()}</td>
              <td className="px-4 py-2">{coin.market_cap.toLocaleString()}</td>
              <td className={`ps-5 py-2 ${coin.price_change_percentage_24h < 0 ? 'text-red-500' : 'text-green-500'}`}>{coin.price_change_percentage_24h.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default Coins