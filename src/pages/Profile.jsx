import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Personalinfo from "../components/Personalinfo";
import Changep from '../components/Changep';

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("personalInfo");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className="mt-32 lg:ml-56">
      <div className="mx-auto w-4/5">
        <div>
          <nav className="relative">
            <div className="flex items-center gap-10">
            <Link to="#" className={`hover:text-fuchsia-700 ${activeTab === "personalInfo" ? `text-fuchsia-700` : ``}`} onClick={() => handleTabClick("personalInfo")}>Personal Information</Link>
            <Link to="#" className={`hover:text-fuchsia-700 ${activeTab === "changePassword" ? `text-fuchsia-700` : ``}`} onClick={() => handleTabClick("changePassword")}>Change Password</Link>
            </div>
            <div className={`absolute mt-2 h-1 bg-fuchsia-600 transition-all duration-300 ${
            activeTab === 'personalInfo' ? 'w-28 left-0' : 'w-28 left-52'}`}/>
          </nav>
          <div className="flex flex-col mx-auto lg:flex-row mt-14 gap-5">
            <div className="mx-auto lg:mx-0 border-2 border-purple-700 bg-fuchsia-600 w-24 h-24 text-center content-center text-white rounded-full text-5xl">
              {user.firstName.charAt(0).toUpperCase()}{user.lastName.charAt(0).toUpperCase()}
            </div>
            <div className="mt-3 mx-auto lg:mx-0">
              <h1 className="text-3xl mb-2 text-center lg:text-start font-medium">{user.firstName} {user.lastName}</h1>
              <p className="text-fuchsia-700">{user.email}</p>
            </div>
          </div>
          <div>
            {activeTab === "personalInfo" && <Personalinfo user={user} />}
            {activeTab === "changePassword" && <Changep />}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile;