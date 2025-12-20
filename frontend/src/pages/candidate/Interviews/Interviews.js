import React, { useState, useEffect } from "react";
import "./Interviews.css";

const interviewData = [
  { candidate: "Meeting with HireNexon", company: "HireNexon", date: "2025-12-26", time: "10:00 AM", mode: "Zoom" },
  { candidate: "Meeting with InnovateX", company: "InnovateX", date: "2025-12-28", time: "02:00 PM", mode: "In-person" },
  { candidate: "Meeting with DataX", company: "DataX", date: "2025-12-30", time: "11:30 AM", mode: "Google Meet" },
];

const HireNexonInterviews = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format current time as dd/mm/yyyy, hh:mm:ss AM/PM
  const formatCurrentTime = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
    const year = date.getFullYear();

    const hours24 = date.getHours();
    const hours = hours24 % 12 || 12; // convert to 12-hour format
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const ampm = hours24 >= 12 ? "PM" : "AM";

    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds} ${ampm}`;
  };

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  const getTimeLeft = (interviewDate, interviewTime) => {
    const interviewDateTime = new Date(`${interviewDate} ${interviewTime}`);
    const diff = interviewDateTime - currentTime;
    if (diff <= 0) return "Started/Finished";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s left`;
  };

  return (
    <div className="hnc-interviews-page-container">
  <h2 className="hnc-interviews-page-title">Interview Calendar</h2>

<p className="hnc-interviews-page-subtitle">
        Current Date & Time: {formatCurrentTime(currentTime)}
      </p>

<div className="hnc-welcome-scroll">
  <span className="hnc-scroll-text">
    <span className="hnc-blink-text">
      Welcome to HireNexon! 🎉 Check your upcoming interviews, track countdowns and stay prepared for success!
    </span>
  </span>
</div>

      {/* Month Name */}
      <div className="hnc-calendar-month">
        {monthNames[month]} {year}
      </div>

      {/* Calendar */}
      <div className="hnc-calendar">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="hnc-calendar-header">{day}</div>
        ))}
        {calendarDays.map((day, index) => {
          const isToday = day === today.getDate();
          const hasInterview = interviewData.some(
            (iv) => new Date(iv.date).getDate() === day &&
                    new Date(iv.date).getMonth() === month &&
                    day !== null
          );
          return (
            <div key={index} className={`hnc-calendar-day ${isToday ? "hnc-today" : ""}`}>
              {day && hasInterview && <span className="hnc-interview-marker"></span>}
              {day}
            </div>
          );
        })}
      </div>

      <div className="hnc-interviews-grid">
        {interviewData.map((interview, index) => (
          <div key={index} className="hnc-interview-card">
            <h3 className="hnc-interview-candidate">{interview.candidate}</h3>
            <p className="hnc-interview-company">{interview.company}</p>
            <p className="hnc-interview-details">{interview.date} | {interview.time} | {interview.mode}</p>
            <p className="hnc-interview-timeleft">{getTimeLeft(interview.date, interview.time)}</p>
            <button className="hnc-interview-join-btn">
              {interview.mode === "In-person" ? "View Details" : "Join Interview"}
              
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HireNexonInterviews;




