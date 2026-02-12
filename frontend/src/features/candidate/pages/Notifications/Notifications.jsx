import React, { useState } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Your application for Google was viewed." },
    { id: 2, text: "Amazon invited you for interview." },
  ]);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold mb-4">Notifications</h1>

      {notifications.length === 0 ? (
        <p className="text-gray-500">No new notifications</p>
      ) : (
        notifications.map((n) => (
          <div
            key={n.id}
            className="bg-gray-50 border border-gray-300 p-3 mb-2 rounded-md text-gray-800"
          >
            {n.text}
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications;
