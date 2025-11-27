import React, { useState, useEffect } from "react";
import "./LiveContests.css";

const ContestBannerCarousel = () => {
  const banners = [
    { id: 1, img: "/images/hirehack.jpg", alt: "Google Hackathon" },
    { id: 2, img: "/images/amazon.png", alt: "Amazon Code Challenge" },
    { id: 3, img: "/images/microsoft.png", alt: "Microsoft AI Contest" },
    { id: 4, img: "/images/google.png", alt: "Hackathon 4" },
  ];

  const [current, setCurrent] = useState(0);

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000); // Auto change every 4 seconds

    return () => clearInterval(interval);
  }, [banners.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="carousel-container single-banner">
      <button className="scroll-btn left" onClick={prevSlide}>
        &#10094;
      </button>

      <div className="banner-wrapper">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`banner-slide ${index === current ? "active" : ""}`}
          >
            <img src={banner.img} alt={banner.alt} className="banner-image" />
          </div>
        ))}
      </div>

      <button className="scroll-btn right" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default ContestBannerCarousel;

