import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Turnstile } from "@marsidev/react-turnstile";

/* ─────────────────────────────────────────────
   STEP INDICATOR
───────────────────────────────────────────── */
const StepIndicator = ({ step }) => (
  <div className="mb-8 flex items-center justify-center gap-3">
    {[1, 2].map((n) => (
      <React.Fragment key={n}>
        <div className="flex flex-col items-center gap-1">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all duration-500 ${
              n < step
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                : n === step
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200 ring-4 ring-blue-100"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            {n < step ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              n
            )}
          </div>
          <span className={`text-[10px] font-semibold uppercase tracking-wider ${n === step ? "text-blue-600" : "text-gray-400"}`}>
            {n === 1 ? "Identity" : "Profile"}
          </span>
        </div>
        {n < 2 && (
          <div className="mb-4 h-px w-16 overflow-hidden bg-gray-200">
            <div
              className="h-full bg-blue-600 transition-all duration-700"
              style={{ width: step > n ? "100%" : "0%" }}
            />
          </div>
        )}
      </React.Fragment>
    ))}
  </div>
);

/* ─────────────────────────────────────────────
   ROLE CARD
───────────────────────────────────────────── */
const RoleCard = ({ value, label, description, icon, selected, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(value)}
    className={`group relative flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all duration-200 ${
      selected
        ? "border-blue-600 bg-blue-50 shadow-md shadow-blue-100"
        : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/40"
    }`}
  >
    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl transition-all ${selected ? "bg-blue-600 shadow-md shadow-blue-200" : "bg-gray-100 group-hover:bg-blue-100"}`}>
      {icon}
    </div>
    <div>
      <p className={`text-sm font-semibold ${selected ? "text-blue-700" : "text-gray-800"}`}>{label}</p>
      <p className="mt-0.5 text-xs text-gray-500">{description}</p>
    </div>
    <div className={`absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${selected ? "border-blue-600 bg-blue-600" : "border-gray-300"}`}>
      {selected && (
        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
  </button>
);

/* ─────────────────────────────────────────────
   INPUT FIELD
───────────────────────────────────────────── */
const InputField = ({ label, type = "text", name, value, onChange, placeholder, required, status, statusMsg }) => (
  <div className="mb-4">
    {label && (
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </label>
    )}
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full rounded-xl border px-4 py-3.5 pr-11 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 focus:ring-2 ${
          status === "success"
            ? "border-green-400 bg-green-50/40 focus:border-green-400 focus:ring-green-100"
            : status === "error"
            ? "border-red-400 bg-red-50/40 focus:border-red-400 focus:ring-red-100"
            : "border-gray-200 bg-gray-50/60 focus:border-blue-500 focus:bg-white focus:ring-blue-100"
        }`}
      />

      {/* Icon inside input — right side */}
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        {status === "loading" && (
          <svg className="h-4 w-4 animate-spin text-blue-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        )}
        {status === "success" && (
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
            <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
        {status === "error" && (
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500">
            <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        )}
      </div>
    </div>

    {/* Status message below input */}
    {statusMsg && (
      <p className={`mt-1.5 flex items-center gap-1 text-xs font-medium ${
        status === "error" ? "text-red-500" : status === "success" ? "text-green-600" : "text-gray-400"
      }`}>
        {statusMsg}
      </p>
    )}
  </div>
);


/* ─────────────────────────────────────────────
   PASSWORD STRENGTH
───────────────────────────────────────────── */
const PasswordStrength = ({ password }) => {
  const checks = [
    { label: "8+ chars", ok: password.length >= 8 },
    { label: "Uppercase", ok: /[A-Z]/.test(password) },
    { label: "Lowercase", ok: /[a-z]/.test(password) },
    { label: "Special char", ok: /\W/.test(password) },
  ];
  const score = checks.filter((c) => c.ok).length;
  const colors = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-400", "bg-green-500"];
  const labels = ["", "Weak", "Fair", "Good", "Strong"];

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="mb-1.5 flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i < score ? colors[score] : "bg-gray-200"}`} />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {checks.map((c) => (
            <span key={c.label} className={`text-[10px] font-medium ${c.ok ? "text-green-600" : "text-gray-400"}`}>
              {c.ok ? "✓" : "○"} {c.label}
            </span>
          ))}
        </div>
        <span className={`text-[10px] font-bold ${score >= 3 ? "text-green-600" : "text-orange-500"}`}>{labels[score]}</span>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   SUCCESS POPUP
───────────────────────────────────────────── */
const SuccessPopup = ({ email, fullName,role, onCreateWorkspace, onLoginRedirect, onResend, cooldown, resendMessage }) => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900/40 backdrop-blur-sm">
    <div className="animate-popup w-[380px] rounded-2xl bg-white p-8 text-center shadow-2xl">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="mb-1 text-xl font-bold text-gray-900">Account Created! 🎉</h3>
      <p className="mb-1 text-sm font-medium text-blue-600">Welcome, {fullName}!</p>
      <p className="mb-5 text-sm text-gray-500">
        A verification email has been sent to <br />
        <span className="font-semibold text-gray-700">{email}</span>
      </p>
      <div className="mb-4 rounded-xl bg-blue-50 p-3 text-xs text-gray-600">
        📬 Check your inbox and spam folder. Click the link to verify your account before logging in.
      </div>

      <div className="mb-4 text-sm text-gray-500">Didn't receive the email?</div>
      <button
        onClick={onResend}
        disabled={cooldown > 0}
        className="mb-4 text-sm font-semibold text-blue-600 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
      >
        {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Verification Email"}
      </button>
      {resendMessage && <p className="mb-3 text-xs text-green-600">{resendMessage}</p>}
      
      {/*Action button */}
      {role === "candidate" || !role ? (
        <button onClick={onLoginRedirect}
          className="w-full rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700">
          Go to Login →
        </button>
      ) : (
        <div className="flex flex-col gap-2">
          <button onClick={onCreateWorkspace}
            className="w-full rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700">
            {role === "employer" ? "🏢 Create Company Workspace →" : "🎓 Create University Workspace →"}
          </button>
          <button onClick={onLoginRedirect}
            className="w-full rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-500 transition hover:bg-gray-50">
            Skip for now — Go to Login
          </button>
        </div>
      )}
    </div>
  </div>
);

/* ═════════════════════════════════════════════
   MAIN SIGNUP COMPONENT
═════════════════════════════════════════════ */
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

if (!TURNSTILE_SITE_KEY) {
  throw new Error("Missing Turnstile Site Key");
}

const ROLES = [
  { value: "candidate", label: "Candidate", description: "Find jobs and apply for opportunities", icon: "🎯" },
  { value: "employer", label: "Employer", description: "Hire talent and manage your company workspace", icon: "🏢" },
  { value: "university", label: "University", description: "Manage campus placements and students", icon: "🎓" },
];

const Signup = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL || "";

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    role: searchParams.get("role") || "",
    agreedToTerms: false,
  });

  const [fieldStatus, setFieldStatus] = useState({ username: null, email: null });
  const [fieldMsg, setFieldMsg] = useState({ username: "", email: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [resendMessage, setResendMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  // Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  // Debounced availability check
  const checkAvailability = useCallback(
    async (field, value) => {
      if (!value.trim()) {
        setFieldStatus((p) => ({ ...p, [field]: null }));
        setFieldMsg((p) => ({ ...p, [field]: "" }));
        return;
      }
      setFieldStatus((p) => ({ ...p, [field]: "loading" }));
      try {
        const res = await fetch(`${API}/api/auth/check-availability?${field}=${encodeURIComponent(value)}`);
        const data = await res.json();
        if (data.available) {
          setFieldStatus((p) => ({ ...p, [field]: "success" }));
          setFieldMsg((p) => ({ ...p, [field]: `${field === "username" ? "Username" : "Email"} is available ✓` }));
        } else {
          setFieldStatus((p) => ({ ...p, [field]: "error" }));
          setFieldMsg((p) => ({ ...p, [field]: `${field === "username" ? "Username" : "Email"} already taken` }));
        }
      } catch {
        setFieldStatus((p) => ({ ...p, [field]: null }));
        setFieldMsg((p) => ({ ...p, [field]: "" }));
      }
    },
    [API]
  );

  useEffect(() => {
    if (!formData.username) return;
    const t = setTimeout(() => checkAvailability("username", formData.username), 600);
    return () => clearTimeout(t);
  }, [formData.username, checkAvailability]);

  useEffect(() => {
    if (!formData.email) return;
    const t = setTimeout(() => checkAvailability("email", formData.email), 600);
    return () => clearTimeout(t);
  }, [formData.email, checkAvailability]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    if (error) setError("");
  };

  const handleStep1Continue = (e) => {
    e.preventDefault();
    if (fieldStatus.username === "error" || fieldStatus.email === "error") {
      setError("Please fix the errors above before continuing.");
      return;
    }
    if (!formData.username.trim() || !formData.email.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.role) { setError("Please select a role."); return; }
    if (!formData.agreedToTerms) { setError("You must agree to the Terms of Service and Privacy Policy."); return; }
    if (!turnstileToken) { setError("Please complete the CAPTCHA verification."); return; }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError("Password must be 8+ chars with uppercase, lowercase, and a special character.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          fullName: formData.fullName,
          password: formData.password,
          role: formData.role,
          turnstileToken,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");
      setShowSuccessPopup(true);
      setCooldown(60);
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setResendMessage("");
      const res = await fetch(`${API}/api/auth/resend-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setResendMessage("Verification email sent!");
      setCooldown(60);
    } catch (err) {
      setResendMessage(err.message || "Failed to resend email.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 px-5 py-10 font-sans">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-indigo-100/60 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-50/40 blur-3xl" />
      </div>

      <div className="relative w-full max-w-[480px]">
        {/* Logo */}
        
        {/* Card */}
        <div className="rounded-2xl bg-white/80 px-8 py-8 shadow-xl shadow-gray-200/60 backdrop-blur-md ring-1 ring-gray-100">
          <StepIndicator step={step} />

          {step === 1 ? (
            <>
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
                <p className="mt-1 text-sm text-gray-500">Start with your unique identity</p>
              </div>

              <form onSubmit={handleStep1Continue}>
                <InputField
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="e.g. john_doe"
                  required
                  status={fieldStatus.username}
                  statusMsg={fieldMsg.username}
                />
                <InputField
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  status={fieldStatus.email}
                  statusMsg={fieldMsg.email}
                />

                {error && <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">{error}</p>}

                <button
                  type="submit"
                  className="mt-2 w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-200 transition-all duration-200 hover:bg-blue-700 hover:shadow-blue-300 active:scale-[0.98]"
                >
                  Continue →
                </button>
              </form>

              {/* Divider */}
              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-xs text-gray-400">Or sign up with</span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => (window.location.href = "https://api.hirenexon.com/api/social/google")}
                  className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:shadow-sm"
                >
                  <img src="/images/public/google-logo.png" className="h-4 w-4" alt="Google" />
                  Continue with Google
                </button>
                <button
                  onClick={() => (window.location.href = "https://api.hirenexon.com/api/social/microsoft")}
                  className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:shadow-sm"
                >
                  <img src="/images/public/microsoft-logo.png" className="h-4 w-4" alt="Microsoft" />
                  Continue with Microsoft
                </button>
              </div>

              <p className="mt-5 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-blue-600 hover:underline">Sign in</Link>
              </p>
            </>
          ) : (
            <>
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900">Complete your profile</h2>
                <p className="mt-1 text-sm text-gray-500">Tell us who you are and how you'll use HireNexon</p>
              </div>

              <form onSubmit={handleSubmit}>
                <InputField
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />

                {/* Password */}
                <div className="mb-4">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a strong password"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3.5 pr-11 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600">
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <PasswordStrength password={formData.password} />
                </div>

                {/* Confirm Password */}
                <div className="mb-5">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Repeat your password"
                      required
                      className={`w-full rounded-xl border bg-gray-50/60 px-4 py-3.5 pr-11 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:ring-2 ${
                        formData.confirmPassword && formData.password !== formData.confirmPassword
                          ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                          : formData.confirmPassword && formData.password === formData.confirmPassword
                          ? "border-green-400 focus:border-green-400 focus:ring-green-100"
                          : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                      }`}
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600">
                      {showConfirm ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
                  )}
                </div>

                {/* Role Selection */}
                <div className="mb-5">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">Select Your Role</label>
                  <div className="flex flex-col gap-2.5">
                    {ROLES.map((r) => (
                      <RoleCard
                        key={r.value}
                        {...r}
                        selected={formData.role === r.value}
                        onChange={(v) => setFormData((p) => ({ ...p, role: v }))}
                      />
                    ))}
                  </div>
                </div>

                {/* Terms */}
                <div className="mb-4 flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    name="agreedToTerms"
                    id="terms"
                    checked={formData.agreedToTerms}
                    onChange={handleChange}
                    required
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="terms" className="cursor-pointer text-xs text-gray-600 leading-relaxed">
                    I agree to the{" "}
                    <Link to="/terms" className="font-semibold text-blue-600 hover:underline">Terms of Service</Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="font-semibold text-blue-600 hover:underline">Privacy Policy</Link>
                  </label>
                </div>

                {/* Turnstile CAPTCHA */}
                <div className="mb-4 flex justify-center">
                  <Turnstile
                    siteKey={TURNSTILE_SITE_KEY}
                    onSuccess={(token) => setTurnstileToken(token)}
                    onExpire={() => setTurnstileToken("")}
                    options={{ theme: "light", size: "normal" }}
                  />
                </div>

                {error && <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">{error}</p>}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-200 transition-all duration-200 hover:bg-blue-700 active:scale-[0.98] disabled:opacity-70"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Creating account...
                    </span>
                  ) : (
                    "Create Account →"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => { setStep(1); setError(""); }}
                  className="mt-3 w-full text-center text-sm text-gray-400 hover:text-gray-600"
                >
                  ← Back to Step 1
                </button>
              </form>
            </>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">
          Protected by Cloudflare Turnstile · Secured with TLS
        </p>
      </div>

      {showSuccessPopup && (
        <SuccessPopup
          email={formData.email}
          fullName={formData.fullName}
          role={formData.role}
          onLoginRedirect={() => { setShowSuccessPopup(false); navigate("/login"); }}
          onCreateWorkspace={() => {
            setShowSuccessPopup(false);
            navigate("/login", {
              state: {
                redirectAfterLogin: formData.role === "employer"
                  ? "/company/create-workspace"
                  : "/university/create-workspace"
              }
            });
          }}
          onResend={handleResend}
          cooldown={cooldown}
          resendMessage={resendMessage}
        />
      )}
    </div>
  );
};

export default Signup;
