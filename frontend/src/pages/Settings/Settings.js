import React from "react";
import "./Settings.css";

const Settings = () => {
  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <div className="settings-options">
        <label>
          <input type="checkbox" /> Enable Notifications
        </label>
        <label>
          <input type="checkbox" /> Dark Mode
        </label>
        <label>
          <input type="checkbox" /> Auto Updates
        </label>
      </div>
    </div>
  );
};

export default Settings;
