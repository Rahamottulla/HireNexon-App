import React from "react";

const offerData = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    date: "2025-09-25",
    file: "/offers/frontend_offer.pdf",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "InnovateX",
    date: "2025-09-28",
    file: "/offers/backend_offer.pdf",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "DesignHub",
    date: "2025-09-30",
    file: "/offers/uiux_offer.pdf",
  },
];

const Offers = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      {/* Page Title */}
      <h1 className="mb-6 text-2xl md:text-3xl font-bold text-slate-800">
        Offer Letters
      </h1>

      {/* Offers Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {offerData.map((offer) => (
          <div
            key={offer.id}
            className="rounded-xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="mb-2 text-lg font-semibold text-sky-600">
              {offer.title}
            </h2>

            <p className="text-slate-700">{offer.company}</p>

            <p className="mt-1 text-sm text-slate-500">
              Date: {offer.date}
            </p>

            <a
              href={offer.file}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
            >
              View Offer
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
