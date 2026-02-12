import React from "react";

const Employers = () => {
  const pricingPlans = [
    {
      id: 1,
      name: "Basic",
      price: "$199",
      period: "per month",
      features: [
        "1 Job Posting",
        "30-Day Listing",
        "Basic Analytics",
        "Email Support",
      ],
      recommended: false,
    },
    {
      id: 2,
      name: "Professional",
      price: "$399",
      period: "per month",
      features: [
        "5 Job Postings",
        "60-Day Listings",
        "Advanced Analytics",
        "Priority Support",
        "Company Profile",
        "Resume Database Access",
      ],
      recommended: true,
    },
    {
      id: 3,
      name: "Enterprise",
      price: "$799",
      period: "per month",
      features: [
        "Unlimited Job Postings",
        "90-Day Listings",
        "Premium Analytics",
        "Dedicated Account Manager",
        "Custom Branding",
        "AI Candidate Matching",
        "Recruitment Marketing",
      ],
      recommended: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ================= HERO ================= */}
      <section className="px-6 py-16 text-center max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          Hire the Best Talent, Faster
        </h1>
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
          HireNexon helps companies attract, evaluate, and hire top-quality
          candidates using AI-powered recruitment tools.
        </p>
      </section>

      {/* ================= BENEFITS ================= */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {[
            {
              icon: "🚀",
              title: "Reach Qualified Candidates",
              desc: "Get your jobs in front of verified and skilled candidates.",
            },
            {
              icon: "⚡",
              title: "Hire Faster",
              desc: "Reduce time-to-hire with smart filters and automation.",
            },
            {
              icon: "🎯",
              title: "AI Matching",
              desc: "Our AI matches candidates based on skills, not just keywords.",
            },
          ].map((b, i) => (
            <div
              key={i}
              className="rounded-xl bg-white p-8 text-center shadow-sm hover:shadow-lg transition"
            >
              <div className="text-5xl mb-4">{b.icon}</div>
              <h3 className="text-lg font-semibold text-slate-800">
                {b.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900">
            Simple, Transparent Pricing
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl border bg-slate-50 p-8 shadow-sm transition hover:shadow-xl ${
                  plan.recommended
                    ? "border-indigo-600 scale-105 bg-white"
                    : "border-slate-200"
                }`}
              >
                {plan.recommended && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-4 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                )}

                <h3 className="text-xl font-semibold text-slate-900">
                  {plan.name}
                </h3>

                <div className="mt-4">
                  <span className="text-4xl font-bold text-indigo-600">
                    {plan.price}
                  </span>
                  <span className="ml-2 text-sm text-slate-500">
                    {plan.period}
                  </span>
                </div>

                <ul className="mt-6 space-y-3 text-sm text-slate-600">
                  {plan.features.map((f, i) => (
                    <li key={i} className="border-b pb-2 last:border-none">
                      {f}
                    </li>
                  ))}
                </ul>

                <button className="mt-6 w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SUCCESS STORIES ================= */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900">
          Trusted by Growing Companies
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {[
            {
              quote:
                "HireNexon reduced our time-to-hire by 40% with better quality candidates.",
              name: "Jennifer Lee",
              role: "HR Director, TechCorp",
              img: "/images/company-logo-1.png",
            },
            {
              quote:
                "Their AI candidate matching is a game-changer for modern hiring.",
              name: "Marcus Johnson",
              role: "CEO, DesignHub",
              img: "/images/company-logo-2.png",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="rounded-xl bg-white p-8 shadow-sm hover:shadow-lg transition"
            >
              <p className="italic text-slate-600 leading-relaxed">
                “{s.quote}”
              </p>

              <div className="mt-6 flex items-center gap-4">
                <img
                  src={s.img}
                  alt={s.name}
                  className="h-12 w-12 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-semibold text-slate-800">{s.name}</h4>
                  <p className="text-sm text-slate-500">{s.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Employers;
