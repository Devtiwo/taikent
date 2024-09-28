import './App.css';
import { useState, useEffect } from "react";
import Home from './pages/Home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from "../src/pages/Signup";
import Login from "../src/pages/Login";
import Dashboard from "../src/pages/Dashboard";
import Preloader from './Components/Preloader';
import { useSelector } from 'react-redux';
import Overview from './pages/Overview';
import Plans from "./pages/Plans";
import Deposit from "./pages/Deposit";
import Profile from "./pages/Profile";
import Support from "./pages/Support";
import Notfound from "./pages/Notfound";
import { ToastContainer } from 'react-toastify';

function App() {
  const [loading, setLoading] = useState(true);
  const isLoggedIn  = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
    {loading ? (<Preloader />) : (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Navigate to="/" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login"/>} >
        <Route path="overview" element={<Overview />} />
        <Route index element={<Overview />} />
        <Route path="plans" element={<Plans />} />
        <Route path="deposit" element={<Deposit />} />
        <Route path="profile" element={<Profile />} />
        <Route path="support" element={<Support />} />
      </Route>
      <Route path="*" element={<Notfound />} />
    </Routes>
    )}
    <ToastContainer position="top-center" theme="colored" hideProgressBar="true" />
    </BrowserRouter>
  )
}

export default App
