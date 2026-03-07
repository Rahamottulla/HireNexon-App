import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const industries = [
  "Technology", "Finance", "Healthcare", "Education", "E-Commerce",
  "Manufacturing", "Consulting", "Media & Entertainment", "Real Estate", "Other",
];

const companySizes = [
  "1–10", "11–50", "51–200", "201–500", "501–1000", "1000+",
];

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

const CompanyWorkspace = () => {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL || "";

  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    companySize: "",
    location: "",
    website: "",
    logo: null,
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (error) setError("");
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((p) => ({ ...p, logo: file }));
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => { if (v) fd.append(k, v); });

      const res = await fetch(`${API}/api/company/workspace`, {
        method: "POST",
        credentials: "include",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      navigate("/company/dashboard");
    } catch (err) {
      setError(err.message || "Failed to create workspace.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50/30 px-5 py-12 font-sans">
      <div className="w-full max-w-[520px]">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-200 text-2xl">🏢</div>
          <h1 className="text-2xl font-bold text-gray-900">Create Company Workspace</h1>
          <p className="mt-1 text-sm text-gray-500">Set up your company profile to start hiring</p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-100">
          <form onSubmit={handleSubmit}>
            {/* Logo Upload */}
            <div className="mb-5">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">Company Logo</label>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">
                  {logoPreview
                    ? <img src={logoPreview} className="h-full w-full object-cover" alt="Logo" />
                    : <span className="text-2xl text-gray-300">🏢</span>
                  }
                </div>
                <label className="cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50">
                  Upload Logo
                  <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                </label>
              </div>
            </div>

            <InputField label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Acme Corp" required />

            <div className="mb-5">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">Industry</label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3.5 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Select Industry</option>
                {industries.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>

            <div className="mb-5">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">Company Size</label>
              <div className="grid grid-cols-3 gap-2">
                {companySizes.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setFormData((p) => ({ ...p, companySize: s }))}
                    className={`rounded-xl border py-2.5 text-xs font-semibold transition ${formData.companySize === s ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50/40"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <InputField label="Location" name="location" value={formData.location} onChange={handleChange} placeholder="Bangalore, India" required />
            <InputField label="Website" type="url" name="website" value={formData.website} onChange={handleChange} placeholder="https://yourcompany.com" hint="Optional" />

            {error && <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700 disabled:opacity-70"
            >
              {isLoading ? "Creating workspace..." : "Create Workspace →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyWorkspace;
