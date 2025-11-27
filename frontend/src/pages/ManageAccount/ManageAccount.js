import React from "react";
import "./ManageAccount.css";

const ManageAccount = () => {
  return (
    <div className="manage-container">
      <h2>Manage Account</h2>
      <form className="manage-form">
        <label>
          Full Name:
          <input type="text" placeholder="Enter your full name" />
        </label>
        <label>
          Email:
          <input type="email" placeholder="Enter your email" />
        </label>
        <label>
          Password:
          <input type="password" placeholder="Enter new password" />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default ManageAccount;
