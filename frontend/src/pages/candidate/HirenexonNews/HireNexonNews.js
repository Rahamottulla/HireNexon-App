import React, { useState } from "react";
import { Search, Briefcase, Globe2 } from "lucide-react";
import "./HireNexonNews.css";

const newsData = [
  {
    title: "HireNexon Launches New Dashboard",
    category: "Platform Update",
    img: "https://via.placeholder.com/400x200?text=Dashboard+Launch",
    description:
      "Our new dashboard is live, offering smoother navigation, faster job search, and improved analytics for users.",
  },
  {
    title: "Partnered with Top Companies",
    category: "Partnership",
    img: "https://via.placeholder.com/400x200?text=Partnerships",
    description:
      "HireNexon has partnered with 100+ top global companies, expanding job opportunities across diverse sectors.",
  },
  {
    title: "New Features Released",
    category: "Features",
    img: "https://via.placeholder.com/400x200?text=New+Features",
    description:
      "Explore new features like freelance projects, remote jobs, and personalized job recommendations.",
  },
  {
    title: "Global Expansion Announced",
    category: "Business",
    img: "https://via.placeholder.com/400x200?text=Global+Expansion",
    description:
      "HireNexon is expanding globally to connect employers and job seekers from different countries seamlessly.",
  },
];

const HireNexonNews = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const filteredNews = newsData.filter(
    (item) =>
      (category === "All" || item.category === category) &&
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="hnx-news-page-container">
      <div className="hnx-news-header">
        <h2 className="hnx-news-title">HireNexon News</h2>

        <div className="hnx-news-controls">
          <div className="hnx-news-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="hnx-news-filter"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Platform Update">Platform Update</option>
            <option value="Partnership">Partnership</option>
            <option value="Features">Features</option>
            <option value="Business">Business</option>
          </select>
        </div>
      </div>

      <div className="hnx-news-grid">
        {filteredNews.length > 0 ? (
          filteredNews.map((news, index) => (
            <div key={index} className="hnx-news-card">
              <img src={news.img} alt={news.title} className="hnx-news-img" />
              <div className="hnx-news-card-content">
                <h3 className="hnx-news-card-title">{news.title}</h3>
                <p className="hnx-news-card-category">{news.category}</p>
                <p className="hnx-news-card-desc">{news.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="hnx-news-empty">No news found.</p>
        )}
      </div>

      <footer className="hnx-news-footer">
        <Globe2 size={18} />
        <p>Stay updated with the latest HireNexon developments and partnerships.</p>
        <Briefcase size={18} />
      </footer>
    </div>
  );
};

export default HireNexonNews;
