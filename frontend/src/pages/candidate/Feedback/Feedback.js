import React, { useState } from "react";
import "./Feedback.css";

const HireNexonFeedback = () => {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim() !== "") {
      // Backend integration can go here
      console.log("Feedback submitted:", feedback);
      setSubmitted(true);
      setFeedback("");
    }
  };

  return (
    <div className="hnc-feedback-page-container">
      <h2 className="hnc-feedback-page-title">We Value Your Feedback</h2>
      <p className="hnc-feedback-page-subtitle">
        Share your thoughts to help us improve HireNexon.
      </p>

      {submitted && <p className="hnc-feedback-success">Thank you! Your feedback has been submitted.</p>}

      <form className="hnc-feedback-form" onSubmit={handleSubmit}>
        <textarea
          className="hnc-feedback-textarea"
          placeholder="Write your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={6}
        />
        <button type="submit" className="hnc-feedback-btn">Submit Feedback</button>
      </form>
    </div>
  );
};

export default HireNexonFeedback;

