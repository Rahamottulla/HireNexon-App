import React, { useState, useEffect } from "react";

const interviewData = [
  {
    candidate: "Meeting with HireNexon",
    company: "HireNexon",
    date: "2026-01-16",
    time: "10:00 AM",
    mode: "Zoom",
  },
  {
    candidate: "Meeting with InnovateX",
    company: "InnovateX",
    date: "2026-01-25",
    time: "02:00 PM",
    mode: "In-person",
  },
  {
    candidate: "Meeting with DataX",
    company: "DataX",
    date: "2026-01-30",
    time: "11:30 AM",
    mode: "Google Meet",
  },
];

const Interviews = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCurrentTime = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours24 = date.getHours();
    const hours = hours24 % 12 || 12;
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
    <div className="bg-gray-50 p-6">
      <h2 className="mb-2 text-2xl font-bold text-slate-800">
        Interview Calendar
      </h2>

      <p className="mb-6 text-lg font-semibold text-slate-600">
        Current Date & Time: {formatCurrentTime(currentTime)}
      </p>

      {/* Scrolling Welcome */}
      <div className="mb-6 overflow-hidden rounded-xl bg-black/5 py-3">
        <div className="animate-[scroll_40s_linear_infinite] whitespace-nowrap px-4 text-lg font-semibold text-slate-800 hover:[animation-play-state:paused]">
          Welcome to HireNexon! 🎉 Check your upcoming interviews, track countdowns
          and stay prepared for success!
        </div>
      </div>

      {/* Month */}
      <div className="mb-4 text-center text-xl font-bold tracking-wide text-slate-800">
        {monthNames[month]} {year}
      </div>

      {/* Calendar */}
      <div className="mb-8 grid grid-cols-7 gap-2">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((day) => (
          <div
            key={day}
            className="rounded-md bg-slate-200 py-2 text-center font-semibold"
          >
            {day}
          </div>
        ))}

        {calendarDays.map((day, index) => {
          const isToday = day === today.getDate();
          const hasInterview = interviewData.some(
            (iv) =>
              new Date(iv.date).getDate() === day &&
              new Date(iv.date).getMonth() === month &&
              day !== null
          );

          return (
            <div
              key={index}
              className={`relative min-h-[42px] rounded-md border bg-slate-100 py-2 text-center transition hover:bg-sky-100 ${
                isToday ? "border-sky-400 font-semibold" : "border-slate-200"
              }`}
            >
              {day && hasInterview && (
                <span className="absolute left-1 top-1 h-3 w-3 rounded-full bg-sky-400"></span>
              )}
              {day}
            </div>
          );
        })}
      </div>

      {/* Interview Cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {interviewData.map((interview, index) => (
          <div
            key={index}
            className="rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h3 className="mb-1 text-lg font-semibold text-sky-500">
              {interview.candidate}
            </h3>
            <p className="mb-2 font-medium text-slate-500">
              {interview.company}
            </p>
            <p className="mb-3 text-sm text-slate-700">
              {interview.date} | {interview.time} | {interview.mode}
            </p>
            <p className="mb-3 font-semibold text-red-500">
              {getTimeLeft(interview.date, interview.time)}
            </p>
            <button className="rounded-md bg-sky-500 px-4 py-2 font-medium text-white transition hover:bg-sky-600">
              {interview.mode === "In-person"
                ? "View Details"
                : "Join Interview"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Interviews;
