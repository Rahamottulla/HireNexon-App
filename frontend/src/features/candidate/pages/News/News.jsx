import React, { useState } from "react";
import { Search, Briefcase, Globe2 } from "lucide-react";
import { NewsData } from "./NewsData";

const News = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Platform Update",
    "Partnership",
    "Features",
    "Business",
  ];

  const filteredNews = NewsData.filter(
    (item) =>
      (category === "All" || item.category === category) &&
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <h2 className="text-2xl font-semibold text-slate-800">
          HireNexon News
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border">
            <Search size={18} className="text-slate-500" />
            <input
              type="text"
              placeholder="Search news..."
              className="outline-none text-sm w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-white border rounded-lg px-3 py-2 text-sm text-slate-600 shadow-sm"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredNews.length > 0 ? (
          filteredNews.map((news) => (
            <div
              key={news.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <img
                src={news.img}
                alt={news.title}
                className="h-44 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-lg font-semibold text-slate-800 mb-1">
                  {news.title}
                </h3>

                <p className="text-xs font-medium text-indigo-600 mb-2">
                  {news.category}
                </p>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {news.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-slate-500">
            No news found.
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-2 mt-12 text-sm text-slate-500">
        <Globe2 size={16} />
        <span>Stay updated with HireNexon developments</span>
        <Briefcase size={16} />
      </div>
    </div>
  );
};

export default News;
