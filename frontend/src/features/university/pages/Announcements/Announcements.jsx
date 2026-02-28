import React, { useState } from "react";
import { Plus, Trash2, Search } from "lucide-react";

const UniversityAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "General",
  });

  const categories = ["General", "Placement", "Exam", "Event"];

  const handleCreate = () => {
    if (!formData.title || !formData.description) return;

    const newAnnouncement = {
      id: Date.now(),
      ...formData,
      date: new Date().toLocaleDateString(),
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    setFormData({ title: "", description: "", category: "General" });
  };

  const handleDelete = (id) => {
    setAnnouncements(announcements.filter((item) => item.id !== id));
  };

  const filteredAnnouncements = announcements.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-800">
          University Announcements
        </h2>

        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm w-full md:w-72">
          <Search size={18} className="text-slate-500" />
          <input
            type="text"
            placeholder="Search announcements..."
            className="w-full outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Create Announcement Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
        <h3 className="font-semibold text-lg">Create Announcement</h3>

        <input
          type="text"
          placeholder="Title"
          className="w-full px-4 py-2 border rounded-lg"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
        />

        <textarea
          placeholder="Description"
          className="w-full px-4 py-2 border rounded-lg"
          rows="3"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        <select
          className="w-full px-4 py-2 border rounded-lg"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          <Plus size={18} />
          Publish
        </button>
      </div>

      {/* Announcements List */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((item) => (
            <div
              key={item.id}
              className="bg-white border-l-4 border-indigo-600 rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-slate-800">
                  {item.title}
                </h3>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <p className="text-xs text-slate-400 mt-1">
                {item.date}
              </p>

              <p className="text-sm text-slate-600 mt-2">
                {item.description}
              </p>

              <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-medium px-3 py-1 rounded-full mt-3">
                {item.category}
              </span>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-slate-500">
            No announcements available.
          </p>
        )}
      </div>
    </div>
  );
};

export default UniversityAnnouncements;