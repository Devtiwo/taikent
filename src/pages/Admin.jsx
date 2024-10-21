import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../Redux/authSlice";
import { useDispatch } from "react-redux";
import { updateBalance } from "../Redux/balanceSlice";
import { toast } from "react-toastify";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [planName, setPlanName] = useState("");
  const [balance, setBalance] = useState(0);
  const [profit, setProfit] = useState(0);
  const [withdrawable, setWithdrawable] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(`${baseUrl}/user/allusers`);
        setUsers(response.data.users);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchAllUsers();
  }, []);

  const handleUpdatePlan = () => {
    if (selectedUser && planName) {
      dispatch(updateBalance({ userId: selectedUser, updates: { plan: planName } }));
      toast.success("Plan updated successfully")
    } else {
      console.error("Selected user or plan name is missing")
      toast.error("Error updating plan");
    }
  };

  const handleUpdateBalance = () => {
    if (selectedUser && balance) {
      dispatch(updateBalance({ userId: selectedUser, updates: { balance } }));
      toast.success("Balance updated succesfully");
    } else {
      console.error("Selected user or balance is missing");
      toast.error("Error updating balance!");
    }
  };

  const handleUpdateProfit = () => {
    if (selectedUser && profit) {
      dispatch(updateBalance({ userId: selectedUser, updates: { profit } }));
      toast.success("Profit updated succesfully");
    } else {
      console.error("Selected user or profit is missing");
      toast.error("Error updating profit")
    }
  };

  const handleUpdateWithdrawable = () => {
    if (selectedUser && withdrawable) {
      dispatch(updateBalance({ userId: selectedUser, updates: { withdrawBal: withdrawable } }));
      toast.success("withdrawable updated successfully");
    } else {
      console.error("Selected user or withdrawable amount is missing");
      toast.error("Error updating withdrawbale");
    }
  };
  return (
    <section>
      <div>
        <div>
          <img src="./images/taikent.png" alt="logo" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-center">Admin Panel</h1>
        </div>
        <div className="w-2/5 mx-auto mt-5">
          <div className="flex flex-col my-5">
            <label htmlFor="users" className="mt-2">
              select user to update
            </label>
            <select
              id="users"
              className="p-2 outline-0 border-2 border-fuchsia-300 rounded-lg"
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">--select a user--</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>{user.email}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col my-5">
            <label htmlFor="planName">Update Plan Name</label>
            <select
              id="planName"
              className="p-2 outline-0 border-2 border-fuchsia-300 rounded-lg"
              onChange={(e) => setPlanName(e.target.value)}
            >
              <option value="">--Select plan name --</option>
              <option value="Starter">Starter</option>
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
              <option value="Platinum">Platinum</option>
            </select>
            <button 
            className="text-white bg-black outline-0 w-48 mt-3 rounded-lg py-3 hover:bg-fuchsia-700 duration-200"
            onClick={handleUpdatePlan}
            >
              update plan Name
            </button>
          </div>
          <div className="flex flex-col my-5">
            <label htmlFor="balance">Update Total balance</label>
            <input
              type="number"
              id="balance"
              value={balance || ""}
              className="p-2 outline-0 border-2 border-fuchsia-300 rounded-lg"
              onChange={(e) => setBalance(Number(e.target.value))}
            />
            <button 
            className="text-white bg-black outline-0 w-48 mt-3 rounded-lg py-3 hover:bg-fuchsia-700 duration-200"
            onClick={handleUpdateBalance}
            >
              update total balance
            </button>
          </div>
          <div className="flex flex-col my-5">
            <label htmlFor="profit">Update profit</label>
            <input
              type="number"
              id="profit"
              value={profit || ""}
              className="p-2 outline-0 border-2 border-fuchsia-300 rounded-lg"
              onChange={(e) => setProfit(Number(e.target.value))}
            />
            <button 
            className="text-white bg-black outline-0 w-48 mt-3 rounded-lg py-3 hover:bg-fuchsia-700 duration-200"
            onClick={handleUpdateProfit}
            >
              update profit
            </button>
          </div>
          <div className="flex flex-col my-5">
            <label htmlFor="withdrawable">Update withdraw balance</label>
            <input
              type="number"
              id="withdrawable"
              value={withdrawable || ""}
              className="p-2 outline-0 border-2 border-fuchsia-300 rounded-lg"
              onChange={(e) => setWithdrawable(Number(e.target.value))}
            />
            <button 
            className="text-white bg-black outline-0 w-56 mt-3 rounded-lg py-3 hover:bg-fuchsia-700 duration-200"
            onClick={handleUpdateWithdrawable}
            >
              update withdraw balance
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;
