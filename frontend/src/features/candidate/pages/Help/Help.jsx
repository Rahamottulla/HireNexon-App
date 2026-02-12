import React, { useState } from "react";
import useTitle from "@/shared/hooks/useTitle";

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

const Help = () => {
  useTitle("Help");
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Page Title */}
          <h2 className="text-3xl font-bold text-slate-800 mb-6">
            Help & FAQ
          </h2>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqData.map((faq, index) => {
              const isActive = activeIndex === index;

              return (
                <div
                  key={index}
                  onClick={() => toggleFAQ(index)}
                  className={`cursor-pointer rounded-xl border p-5 transition-all duration-300
                    ${
                      isActive
                        ? "border-sky-500 bg-sky-50"
                        : "border-slate-200 bg-white hover:-translate-y-0.5 hover:shadow-lg"
                    }
                  `}
                >
                  <h4 className="text-lg font-semibold text-sky-600 mb-2">
                    {faq.question}
                  </h4>

                  {isActive && (
                    <p className="text-slate-700 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
  );
};

export default Help;
