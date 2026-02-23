import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL || "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  //cooldown
  const [cooldown, setCooldown] = useState(0);
  const [resendMessage, setResendMessage] = useState("");
  React.useEffect(() => {
  if (cooldown <= 0) return;

  const timer = setInterval(() => {
    setCooldown((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [cooldown]);
  
  const handleResend = async () => {
  try {
    setResendMessage("");
    const response = await fetch(`${API}/api/auth/resend-verification`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.email }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    setResendMessage("Verification email sent again!");
    setCooldown(60);
  } catch (err) {
    setResendMessage(err.message || "Failed to resend email.");
  }
}; 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleLoginRedirect = () => {
    setShowSuccessPopup(false);
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError(
        "Password must be at least 6 characters, include uppercase, lowercase, and a special character."
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Signup failed");

      setShowSuccessPopup(true);
      setCooldown(60);
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-5 font-sans">
      <div className="w-full max-w-[450px] rounded-xl bg-white px-10 py-6 text-center shadow-xl">
        <h2 className="mb-8 text-[28px] font-semibold text-gray-800">
        HireNexon Sign Up
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-[14px] text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />

          <input
            type="email"
            name="email"
            placeholder="E-mail address"
            value={formData.email}
            onChange={handleChange}
            required
            className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-[14px] text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-[14px] pr-12 text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[17px] text-blue-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="relative mb-6">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-[14px] pr-12 text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[17px] text-blue-600"
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mb-5 w-full rounded-lg bg-blue-600 py-[14px] text-base font-semibold text-white transition hover:bg-blue-500 disabled:opacity-70"
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {error && (
          <div className="mb-4 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <div className="relative mb-5 text-sm text-gray-500 before:absolute before:left-0 before:top-1/2 before:h-px before:w-[35%] before:bg-gray-200 after:absolute after:right-0 after:top-1/2 after:h-px after:w-[35%] after:bg-gray-200">
          Or continue with
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() =>
              (window.location.href = "https://api.hirenexon.com/api/social/google")
            }
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white py-3 text-[15px] font-medium text-red-600 transition hover:border-red-500 hover:bg-red-50"
          >
            <img src="/images/public/google-logo.png" className="h-5 w-5" />
            Google
          </button>

          <button
            onClick={() =>
              (window.location.href = "https://api.hirenexon.com/api/social/microsoft")
            }
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white py-3 text-[15px] font-medium text-blue-600 transition hover:border-blue-500 hover:bg-blue-50"
          >
            <img src="/images/public/microsoft-logo.png" className="h-5 w-5" />
            Microsoft
          </button>
        </div>

        <div className="mt-5 text-sm text-gray-600">
          Have an account?
          <Link
            to="/login"
            className="ml-1 font-medium text-blue-600 hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>

      {showSuccessPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-blue-900/20">
          <div className="w-[360px] rounded-xl bg-white px-10 py-8 text-center shadow-2xl">
            <h3 className="mb-2 text-[22px] font-semibold text-blue-600">
              Registration Successful!🎉
            </h3>
            <p className="mb-5 text-base text-gray-700">
              Welcome to <b>HireNexon</b>, {formData.username}! <br />
              A verification email has been sent to{" "}
              <b>{formData.email}</b>.
            </p>
             <div className="mb-4 text-sm text-gray-600">
             Didn’t receive the email?
            </div>

            <button
            onClick={handleResend}
            disabled={cooldown > 0}
            className="mb-3 text-blue-600 hover:underline disabled:opacity-50"
            >
            {cooldown > 0
            ? `Resend available in ${cooldown}s`
            : "Resend Verification Email"}
            </button>

            {resendMessage && (
             <div className="mb-3 text-sm text-green-600">
            {resendMessage}
            </div>
            )}

            <button
              onClick={handleLoginRedirect}
              className="rounded-lg bg-blue-600 px-8 py-2 text-[15px] text-white transition hover:bg-blue-700"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
