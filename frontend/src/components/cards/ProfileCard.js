import React from "react";
import "./cards.css";

const ProfileCard = () => {
  return (
    <div className="card">
      <div className="flex">
        <img
          src="https://via.placeholder.com/48"
          alt="Profile"
          className="avatar"
        />
        <div>
          <h4 className="card-header">Rahamottulla Haque Mondal</h4>
          <p className="card-content">Computer Science Student</p>
        </div>
      </div>
      <hr style={{ margin: "12px 0" }} />
      <p className="card-content">Connections: <strong>150+</strong></p>
      <p className="card-content">Profile Views: <strong>89</strong></p>
    </div>
  );
};

export default ProfileCard;
