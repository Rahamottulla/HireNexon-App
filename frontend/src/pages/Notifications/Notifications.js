import React, { useState } from "react";
import "./Notifications.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Your application for Google was viewed." },
    { id: 2, text: "Amazon invited you for interview." },
  ]);

  return (
    <div className="page-container">
      <h1 className="page-title">Notifications</h1>
      {notifications.length === 0 ? <p>No new notifications</p> : 
        notifications.map(n => (
          <div key={n.id} className="notification-card">{n.text}</div>
        ))}
    </div>
  );
};

export default Notifications;
