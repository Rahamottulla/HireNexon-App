import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InputField = ({ label, type = "text", name, value, onChange, placeholder, required, hint }) => (
  <div className="mb-5">
    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
    />
    {hint && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
  </div>
);

const UniversityWorkspace = () => {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL || "";

  const [formData, setFormData] = useState({
    universityName: "",
    location: "",
    website: "",
    placementOfficer: "",
    departments: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${API}/api/university/workspace`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          departments: formData.departments.split(",").map((d) => d.trim()).filter(Boolean),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      navigate("/university/dashboard");
    } catch (err) {
      setError(err.message || "Failed to create workspace.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50/30 px-5 py-12 font-sans">
      <div className="w-full max-w-[520px]">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-200 text-2xl">🎓</div>
          <h1 className="text-2xl font-bold text-gray-900">Create University Workspace</h1>
          <p className="mt-1 text-sm text-gray-500">Set up your campus placement portal</p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-100">
          <form onSubmit={handleSubmit}>
            <InputField label="University Name" name="universityName" value={formData.universityName} onChange={handleChange} placeholder="Chandigarh University" required />
            <InputField label="Location" name="location" value={formData.location} onChange={handleChange} placeholder="Mohali, Punjab" required />
            <InputField label="Website" type="url" name="website" value={formData.website} onChange={handleChange} placeholder="https://university.edu" hint="Optional" />
            <InputField
              label="Placement Officer Name"
              name="placementOfficer"
              value={formData.placementOfficer}
              onChange={handleChange}
              placeholder="Dr. Rajesh Kumar"
              required
            />
            <InputField
              label="Departments"
              name="departments"
              value={formData.departments}
              onChange={handleChange}
              placeholder="CSE, ECE, MBA, ME..."
              hint="Comma-separated list of departments"
              required
            />

            {error && <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 disabled:opacity-70"
            >
              {isLoading ? "Creating workspace..." : "Create Workspace →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UniversityWorkspace;
