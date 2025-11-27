import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Make sure AuthContext exists
import "./MyProfile.css";

const MyProfile = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  // Profile state
  const [profile, setProfile] = useState({
    name: currentUser?.name || "Rahamottulla Haque Mondal",
    email: currentUser?.email || "rahamottulla@example.com",
    skills: "React, Node.js, MongoDB",
  });

  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(profile);

  // Save edited profile
  const saveProfile = () => {
    setProfile(form);
    setEdit(false);
  };

  // Logout function
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="myprofile-container">
      <h1>My Profile</h1>

      {/* Profile Details / Edit */}
      {edit ? (
        <div className="profile-form">
          <label>
            Name:
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
          <label>
            Skills:
            <input
              type="text"
              value={form.skills}
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
            />
          </label>
          <div className="buttons">
            <button onClick={saveProfile}>Save</button>
            <button onClick={() => setEdit(false)} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="profile-details">
          <p>
            <b>Name:</b> {profile.name}
          </p>
          <p>
            <b>Email:</b> {profile.email}
          </p>
          <p>
            <b>Skills:</b> {profile.skills}
          </p>
          <div className="buttons">
            <button onClick={() => setEdit(true)}>Edit Profile</button>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
