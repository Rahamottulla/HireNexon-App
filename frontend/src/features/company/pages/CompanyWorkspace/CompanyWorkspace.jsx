// frontend/src/features/company/pages/CompanyWorkspace/CompanyWorkspace.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/shared/components/common/Header";
import Footer from "@/shared/components/common/Footer";
import api from "@/shared/api/axios"; 

const industries = [
  "Technology & Software", "Finance & Banking", "Healthcare & Pharma",
  "Education & EdTech", "E-Commerce & Retail", "Manufacturing & Engineering",
  "Consulting & Professional Services", "Media & Entertainment",
  "Real Estate & Construction", "Logistics & Supply Chain",
  "Automotive", "Energy & Utilities", "Government & Public Sector", "Other",
];

const orgTypes = [
  "Private Limited", "Public Limited", "Startup", "MNC (Multinational)",
  "Partnership Firm", "Sole Proprietorship", "NGO / Non-Profit", "Government Body",
  "LLP (Limited Liability Partnership)", "Other",
];

const companySizes = [
  { label: "1–10", sub: "Micro" },
  { label: "11–50", sub: "Small" },
  { label: "51–200", sub: "Medium" },
  { label: "201–500", sub: "Growing" },
  { label: "501–1000", sub: "Large" },
  { label: "1000+", sub: "Enterprise" },
];

const CompanyWorkspace = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    emailDomain: "",
    orgType: "",
    industry: "",
    companySize: "",
    headquarters: "",
    website: "",
    description: "",
    logo: null,
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (error) setError("");
  };

  const handleLogoFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setFormData((p) => ({ ...p, logo: file }));
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleLogoChange = (e) => handleLogoFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleLogoFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.companySize) { setError("Please select a company size."); return; }
  setIsLoading(true);
  try {
    const fd = new FormData();
    Object.entries(formData).forEach(([k, v]) => { if (v) fd.append(k, v); });
    // ✅ Use axios instead of fetch
    await api.post("/company/workspace", fd, {
      headers: { "Content-Type": undefined  },
    });

    navigate("/company/dashboard");
  } catch (err) {
    setError(err.response?.data?.message || err.message || "Failed to create workspace.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 font-sans">
      <Header />

      <main className="px-4 py-12">
        {/* Page Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-xl shadow-blue-200 text-3xl">
            🏢
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Create Your Company Workspace
          </h1>
          <p className="mt-2 text-base text-gray-500">
            Set up your company profile on HireNexon to start hiring top talent
          </p>
          {/* Steps */}
          <div className="mt-5 flex items-center justify-center gap-2 text-xs font-semibold text-gray-400">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-[10px]">✓</span>
            <span className="text-blue-600">Account Created</span>
            <span className="h-px w-8 bg-gray-300" />
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-[10px] ring-4 ring-blue-100">2</span>
            <span className="text-blue-600">Company Profile</span>
            <span className="h-px w-8 bg-gray-300" />
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-gray-400 text-[10px]">3</span>
            <span>Start Hiring</span>
          </div>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl bg-white p-8 shadow-2xl shadow-gray-200/60 ring-1 ring-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Logo Upload */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-400">
                  Company Logo
                </label>
                <div className="flex items-center gap-5">
                  {/* Preview */}
                  <div
                    onDrop={handleDrop}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    className={`relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed transition-all ${dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"}`}
                  >
                    {logoPreview
                      ? <img src={logoPreview} className="h-full w-full object-cover" alt="Logo preview" />
                      : <span className="text-3xl text-gray-300">🏢</span>
                    }
                  </div>
                  <div>
                    <label className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-100">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      Upload Logo
                      <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                    </label>
                    <p className="mt-1.5 text-xs text-gray-400">PNG, JPG or SVG · Max 2MB · Recommended 400×400px</p>
                    <p className="text-xs text-gray-400">Or drag and drop onto the box</p>
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Company Name */}
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-gray-400">
                  Company Name <span className="text-red-400">*</span>
                </label>
                <input
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="e.g. Tata Consultancy Services"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Email Domain */}
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-gray-400">
                  Company Email Domain <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium select-none">@</span>
                  <input
                    name="emailDomain"
                    value={formData.emailDomain}
                    onChange={handleChange}
                    placeholder="yourcompany.com"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/60 pl-8 pr-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-400">Used to verify team members during onboarding</p>
              </div>

              {/* Org Type + Industry — 2 col */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-gray-400">
                    Organisation Type <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="orgType"
                    value={formData.orgType}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3.5 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Select type</option>
                    {orgTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-gray-400">
                    Industry <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3.5 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Select industry</option>
                    {industries.map((i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
              </div>

              {/* Company Size */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-400">
                  Company Size <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {companySizes.map((s) => (
                    <button
                      type="button"
                      key={s.label}
                      onClick={() => setFormData((p) => ({ ...p, companySize: s.label }))}
                      className={`flex flex-col items-center rounded-xl border py-3 text-xs font-bold transition-all ${
                        formData.companySize === s.label
                          ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-200"
                          : "border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50/40"
                      }`}
                    >
                      <span>{s.label}</span>
                      <span className={`text-[10px] font-normal mt-0.5 ${formData.companySize === s.label ? "text-blue-100" : "text-gray-400"}`}>{s.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Headquarters */}
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-gray-400">
                  Headquarters <span className="text-red-400">*</span>
                </label>
                <input
                  name="headquarters"
                  value={formData.headquarters}
                  onChange={handleChange}
                  placeholder="e.g. Bengaluru, Karnataka, India"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Website */}
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-gray-400">
                  Website <span className="text-gray-300 normal-case font-normal">(optional)</span>
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://yourcompany.com"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-gray-400">
                  About the Company <span className="text-gray-300 normal-case font-normal">(optional)</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell candidates what makes your company a great place to work..."
                  rows={3}
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-300 active:scale-[0.99] disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Setting up your workspace...
                  </span>
                ) : (
                  "Create Workspace →"
                )}
              </button>

              <p className="text-center text-xs text-gray-400">
                You can update these details anytime from your company settings.{" "}
                <Link to="/company/dashboard" className="text-blue-500 hover:underline">Skip for now</Link>
              </p>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CompanyWorkspace;
