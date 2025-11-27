// src/components/Profile/Profile.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Make sure you have AuthContext
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Rahamottulla Haque Mondal",
    email: "rahamottulla@example.com",
    skills: "React, Node.js, MongoDB",
  });

  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(profile);
  const [isOpen, setIsOpen] = useState(false);

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const saveProfile = () => {
    setProfile(form);
    setEdit(false);
  };

  const handleLogout = () => {
    logout();          // clears localStorage and currentUser
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="profile-container">
      {/* Profile Dropdown Button */}
      <div className="profile-dropdown">
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="profile-btn"
  >
    {currentUser?.name || profile.name} <span className={`arrow ${isOpen ? "rotate" : ""}`}>▼</span>
  </button>

  <ul className={`dropdown-menu ${isOpen ? "show" : ""}`}>
    <li><Link to="/my-profile" onClick={() => setIsOpen(false)}>My Profile</Link></li>
    <li><Link to="/manage-account" onClick={() => setIsOpen(false)}>Manage Account</Link></li>
    <li><Link to="/settings" onClick={() => setIsOpen(false)}>Settings</Link></li>
    <li><Link to="/help" onClick={() => setIsOpen(false)}>Help</Link></li>
    <li><button onClick={() => { handleLogout(); setIsOpen(false); }}>Logout</button></li>
  </ul>
</div>

      {/* Profile Details / Edit Section */}
      <div className="page-container">
        <h1 className="page-title">Profile</h1>
        {edit ? (
          <div className="profile-form">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              value={form.skills}
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
            />
            <button onClick={saveProfile}>Save</button>
          </div>
        ) : (
          <div className="profile-details">
            <p><b>Name:</b> {profile.name}</p>
            <p><b>Email:</b> {profile.email}</p>
            <p><b>Skills:</b> {profile.skills}</p>
            <button onClick={() => setEdit(true)}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

