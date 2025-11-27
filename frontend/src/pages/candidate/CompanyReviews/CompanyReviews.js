import React from "react";
import "./CompanyReviews.css";

const companyReviewsData = [
  {
    company: "TechCorp",
    rating: 4.5,
    review: "Great work culture and career growth opportunities.",
    reviewer: "Rohit Sharma",
  },
  {
    company: "InnovateX",
    rating: 4.2,
    review: "Supportive management and excellent team collaboration.",
    reviewer: "Sanya Singh",
  },
  {
    company: "DataX",
    rating: 4.8,
    review: "Challenging projects and skill development is top-notch.",
    reviewer: "Anil Kumar",
  },
];

const HireNexonCompanyReviews = () => {
  return (
    <div className="hnc-company-page-container">
      <h2 className="hnc-company-page-title">Company Reviews</h2>
      <p className="hnc-company-page-subtitle">
        Check what employees are saying about top companies.
      </p>

      <div className="hnc-reviews-grid">
        {companyReviewsData.map((review, index) => (
          <div key={index} className="hnc-review-card">
            <h3 className="hnc-review-company">{review.company}</h3>
            <p className="hnc-review-rating">⭐ {review.rating}</p>
            <p className="hnc-review-text">"{review.review}"</p>
            <p className="hnc-review-user">- {review.reviewer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HireNexonCompanyReviews;

