import React from "react";
import "./cards.css";

const Suggestions = () => {
  const users = [
    { name: "Reshmi", title: "BCA Student" },
    { name: "Vernika", title: "UI/UX Designer" },
    { name: "Suraj", title: "Backend Developer" },
  ];

  return (
    <div className="card">
      <h4 className="card-header">People You May Know</h4>
      {users.map((u, i) => (
        <div key={i} className="flex" style={{ marginBottom: "10px" }}>
          <img
            src="https://via.placeholder.com/40"
            alt={u.name}
            className="avatar"
            style={{ width: "40px", height: "40px" }}
          />
          <div>
            <p style={{ fontWeight: "500" }}>{u.name}</p>
            <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>{u.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
