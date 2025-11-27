
import React from "react";
import "./Tests.css";

const testData = [
  { title: "Frontend Skills Test", description: "Assess your HTML, CSS, and JavaScript skills." },
  { title: "Backend Skills Test", description: "Evaluate your Node.js, Express, and Database knowledge." },
  { title: "Data Structures & Algorithms", description: "Test your problem-solving and coding skills." },
  { title: "UI/UX Design Test", description: "Check your design thinking and creative skills." },
];

const Tests = () => {
  return (
    <div className="tst-container">
      <h2 className="tst-title">HireNexon Skills Assessment Tests</h2>
      <p className="tst-subtitle">Choose a test to evaluate your skills and improve your career prospects.</p>

      <div className="tst-grid">
        {testData.length > 0 ? (
          testData.map((test, index) => (
            <div className="tst-card" key={index}>
              <h3 className="tst-card-title">{test.title}</h3>
              <p className="tst-card-description">{test.description}</p>
              <button className="tst-card-btn">Start Test</button>
            </div>
          ))
        ) : (
          <p className="tst-empty">No tests available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Tests;

