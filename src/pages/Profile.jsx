import React from 'react'
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <section className="mt-32 lg:ml-56">
      <div className="mx-auto w-4/5">
        <div>
          <nav>
            <Link to="">Personal Information</Link>
            <Link to="">Change Password</Link>
          </nav>
          <div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile;