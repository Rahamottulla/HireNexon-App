import React from "react";

const testData = [
  {
    title: "Frontend Skills Test",
    description: "Assess your HTML, CSS, and JavaScript skills.",
  },
  {
    title: "Backend Skills Test",
    description: "Evaluate your Node.js, Express, and Database knowledge.",
  },
  {
    title: "Data Structures & Algorithms",
    description: "Test your problem-solving and coding skills.",
  },
  {
    title: "UI/UX Design Test",
    description: "Check your design thinking and creative skills.",
  },
];

const Tests = () => {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
          HireNexon Skills Assessment Tests
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Choose a test to evaluate your skills and strengthen your career
          profile.
        </p>
      </div>

      {/* Tests Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testData.length > 0 ? (
          testData.map((test, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-xl bg-white p-6 shadow-sm border-l-4 border-indigo-600 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                <h3 className="text-lg font-semibold text-sky-600">
                  {test.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {test.description}
                </p>
              </div>

              <button className="mt-5 w-fit rounded-md bg-sky-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-sky-600 hover:scale-105">
                Start Test
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-slate-500">
            No tests available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default Tests;
