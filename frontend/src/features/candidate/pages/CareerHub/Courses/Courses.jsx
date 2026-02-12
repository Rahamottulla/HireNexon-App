import React from "react";

const CoursesData = [
  {
    title: "Full Stack Web Development",
    provider: "Coursera",
    duration: "12 weeks",
    description:
      "Learn HTML, CSS, JavaScript, React, Node.js, and database management.",
  },
  {
    title: "Data Science with Python",
    provider: "Udemy",
    duration: "10 weeks",
    description:
      "Master Python, Pandas, NumPy, Matplotlib, and machine learning fundamentals.",
  },
  {
    title: "Cloud Computing Essentials",
    provider: "edX",
    duration: "8 weeks",
    description:
      "Understand cloud concepts, deployment models, and cloud services architecture.",
  },
];

const Courses = () => {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
          Courses & Certifications
        </h2>
        <p className="mt-2 text-slate-600 max-w-2xl">
          Upgrade your skills with curated courses from trusted learning
          platforms.
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CoursesData.map((course, index) => (
          <div
            key={index}
            className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div>
              <h3 className="text-lg font-semibold text-sky-600">
                {course.title}
              </h3>

              <p className="mt-1 text-sm font-medium text-slate-500">
                {course.provider} · {course.duration}
              </p>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {course.description}
              </p>
            </div>

            <button className="mt-5 w-fit rounded-md bg-sky-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-sky-600">
              Enroll Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
