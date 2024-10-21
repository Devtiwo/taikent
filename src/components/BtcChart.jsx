import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Line } from "react-chartjs-2";
import { toast } from 'react-toastify';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const BtcChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = import.meta.env.VITE_API_KEY

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=365&x_cg_demo_api_key=${apiKey}`);
        
        const formattedData = response.data.prices.map(price => ({
          date: new Date(price[0]).toLocaleDateString(),
          price: price[1],
        }));
        setData(formattedData);
      } catch (err) {
        toast.error("Error loading bitcoin chart");
      } finally {
        setLoading(false)
      }
    };
    fetchData();
  }, []);
  
  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: "Bitcoin Price chart",
        data: data.map(item => item.price),
        fill: false,
        borderColor: 'black',
        borderWidth: 2,
        pointRadius: 0
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false
      }
    }
  }
  return (
    <div>
      {loading ? <p className="mx-auto content-center">Loading...</p> : <Line data={chartData} options={options} /> }
    </div>
  )
}

export default BtcChart