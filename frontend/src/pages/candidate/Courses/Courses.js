import React from "react";
import "./Courses.css";

const hireNexonCoursesData = [
  {
    title: "Full Stack Web Development",
    provider: "Coursera",
    duration: "12 weeks",
    description: "Learn HTML, CSS, JavaScript, React, Node.js, and database management.",
  },
  {
    title: "Data Science with Python",
    provider: "Udemy",
    duration: "10 weeks",
    description: "Master Python, Pandas, NumPy, Matplotlib, and machine learning fundamentals.",
  },
  {
    title: "Cloud Computing Essentials",
    provider: "edX",
    duration: "8 weeks",
    description: "Understand cloud concepts, deployment models, and cloud services architecture.",
  },
];

const HireNexonCourses = () => {
  return (
    <div className="hnc-page-container">
      <h2 className="hnc-page-title">Courses & Certifications</h2>
      <p className="hnc-page-subtitle">Upgrade your skills with our curated courses from top platforms.</p>
      
      <div className="hnc-courses-grid">
        {hireNexonCoursesData.map((course, index) => (
          <div key={index} className="hnc-course-card">
            <h3 className="hnc-course-title">{course.title}</h3>
            <p className="hnc-course-provider">{course.provider} | {course.duration}</p>
            <p className="hnc-course-description">{course.description}</p>
            <button className="hnc-enroll-btn">Enroll Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HireNexonCourses;


