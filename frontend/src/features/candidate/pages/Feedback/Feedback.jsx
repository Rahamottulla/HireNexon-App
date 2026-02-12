import React, { useState } from "react";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    // 🔗 Backend integration here
    console.log("Feedback submitted:", feedback);

    setSubmitted(true);
    setFeedback("");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
          We Value Your Feedback
        </h2>

        <p className="text-slate-600 mb-6">
          Share your thoughts to help us improve HireNexon.
        </p>

        {/* Success Message */}
        {submitted && (
          <div className="mb-4 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-green-700 font-medium">
            ✅ Thank you! Your feedback has been submitted.
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            rows={6}
            placeholder="Write your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition"
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-sky-500 py-3 text-white font-semibold hover:bg-sky-600 transition active:scale-[0.98]"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
