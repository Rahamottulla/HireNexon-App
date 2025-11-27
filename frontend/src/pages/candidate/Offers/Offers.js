import React from "react";
import "./Offers.css";

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
    <div className="candidate-offers-page">
      <h1 className="candidate-page-title">Offer Letters</h1>
      <div className="candidate-offers-grid">
        {offerData.map((offer) => (
          <div className="candidate-offers-card" key={offer.id}>
            <div className="candidate-offers-content">
              <h2>{offer.title}</h2>
              <p>{offer.company}</p>
              <p className="offer-date">Date: {offer.date}</p>
              <a
                href={offer.file}
                target="_blank"
                rel="noopener noreferrer"
                className="candidate-view-btn"
              >
                View Offer
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;



