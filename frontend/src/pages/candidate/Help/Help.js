import React, { useState } from "react";
import "./Help.css";

const faqData = [
  {
    question: "How do I reset my password?",
    answer: "Go to Manage Account → Update your password and save changes.",
  },
  {
    question: "How can I contact support?",
    answer: "Send us an email at support@hirenexon.com",
  },
  {
    question: "How do I update my profile?",
    answer: "Click on your profile dropdown and select Manage Account.",
  },
];

const HireNexonHelp = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="hnc-help-page-container">
      <h2 className="hnc-help-page-title">Help & FAQ</h2>

      <div className="hnc-faq-list">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`hnc-faq-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <h4 className="hnc-faq-question">{faq.question}</h4>
            {activeIndex === index && <p className="hnc-faq-answer">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HireNexonHelp;

