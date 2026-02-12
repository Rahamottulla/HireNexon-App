import React from "react";

const CategorySection = () => {
  const categories = [
    { id: 1, title: "Technology", jobs: "1,234 jobs", icon: "💻" },
    { id: 2, title: "Marketing", jobs: "856 jobs", icon: "📊" },
    { id: 3, title: "Design", jobs: "645 jobs", icon: "🎨" },
    { id: 4, title: "Finance", jobs: "1,023 jobs", icon: "💰" },
    { id: 5, title: "Healthcare", jobs: "2,145 jobs", icon: "🏥" },
    { id: 6, title: "Education", jobs: "789 jobs", icon: "📚" },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-10">
          Browse by Category
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white border border-slate-200 rounded-xl p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-indigo-600"
            >
              <div className="text-4xl mb-4">{category.icon}</div>

              <h3 className="text-lg font-semibold text-slate-800 mb-1">
                {category.title}
              </h3>

              <p className="text-sm text-slate-500">
                {category.jobs}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
