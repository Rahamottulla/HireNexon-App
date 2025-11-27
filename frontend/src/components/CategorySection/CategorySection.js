import React from 'react';
import './CategorySection.css';

const CategorySection = () => {
  const categories = [
    {
      id: 1,
      title: 'Technology',
      jobs: '1,234 jobs',
      icon: '💻'
    },
    {
      id: 2,
      title: 'Marketing',
      jobs: '856 jobs',
      icon: '📊'
    },
    {
      id: 3,
      title: 'Design',
      jobs: '645 jobs',
      icon: '🎨'
    },
    {
      id: 4,
      title: 'Finance',
      jobs: '1,023 jobs',
      icon: '💰'
    },
    {
      id: 5,
      title: 'Healthcare',
      jobs: '2,145 jobs',
      icon: '🏥'
    },
    {
      id: 6,
      title: 'Education',
      jobs: '789 jobs',
      icon: '📚'
    }
  ];

  return (
    <section className="category-section">
      <div className="container">
        <h2 className="section-title">Browse by Category</h2>
        <div className="categories-grid">
          {categories.map(category => (
            <div key={category.id} className="category-card">
              <div className="category-icon">{category.icon}</div>
              <h3>{category.title}</h3>
              <p>{category.jobs}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
