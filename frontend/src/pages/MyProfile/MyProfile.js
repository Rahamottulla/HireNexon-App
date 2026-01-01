import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/api";
import "./MyProfile.css";

const MyProfile = () => {
  const navigate = useNavigate();
  const { currentUser, logout, updateCurrentUser } = useAuth();

  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    skills: "",
  });

  // SYNC when currentUser loads
  useEffect(() => {
    if (currentUser) {
      setForm({
        name: currentUser.name || "",
        email: currentUser.email || "",
        skills: currentUser.skills?.join(", ") || "",
      });
    }
  }, [currentUser]);

  if (!currentUser) return <p>Loading profile...</p>;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  //Handle save
  const handleSave = async () => {
    try {
      const res = await api.put("/users/profile", {
        name: form.name,
        skills: form.skills,
      });

      updateCurrentUser(res.data.user); 
      setEdit(false);
    } catch (error) {
      console.error("Profile update failed:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="myprofile-container">
      <h1>My Profile</h1>

      {edit ? (
        <div className="profile-form">
          <label>
            Name:
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>

          <label>
            Email:
            <input value={form.email} disabled />
          </label>

          <label>
            Skills:
            <input
              value={form.skills}
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
            />
          </label>

          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div className="profile-details">
          <p><b>Name:</b> {form.name}</p>
          <p><b>Email:</b> {form.email}</p>
          <p><b>Skills:</b> {form.skills}</p>

          <button onClick={() => setEdit(true)}>Edit</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
