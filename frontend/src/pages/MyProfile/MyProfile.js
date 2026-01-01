import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./MyProfile.css";

const MyProfile = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    skills: "",
  });

  // ✅ SYNC when currentUser loads
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
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>

          <label>
            Skills:
            <input
              value={form.skills}
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
            />
          </label>

          <button onClick={() => setEdit(false)}>Save</button>
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
