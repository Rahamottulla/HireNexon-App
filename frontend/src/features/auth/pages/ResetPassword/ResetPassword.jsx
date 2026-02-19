import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "@/features/auth/context/AuthContext";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const { updatePassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (!token) {
    setError("Invalid or expired reset link.");
    return;
    }
    
    if (newPassword.length < 8) {
    setError("Password must be at least 8 characters long.");
    return;
  }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      await updatePassword(token, newPassword);
      setSuccess("Password updated successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!token) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-5">
      <div className="w-full max-w-[400px] rounded-xl bg-white px-10 py-8 text-center shadow-xl">
        <h2 className="text-xl font-semibold text-red-600 mb-4">
        Reset Link Expired
        </h2>
        <p className="text-gray-600 text-sm mb-6">
        This password reset link is no longer valid.
        Please request a new one below.
        </p>
        <button
          onClick={() => navigate("/forgot-password")}
          className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-500"
        >
          Request New Link
        </button>
      </div>
    </div>
  );
} 
  const isDisabled =
  isLoading ||
  newPassword.length < 8 ||
  newPassword !== confirmPassword;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-5">
      <div className="w-full max-w-[400px] rounded-xl bg-white px-10 py-8 text-center shadow-xl">
        <div className="mb-4 flex justify-center">
          <img
            src="/images/public/hi.png"
            alt="HireNexon Logo"
            className="h-[130px] w-[150px] object-contain"
          />
        </div>

        <h2 className="mb-2 text-2xl font-semibold text-gray-800">
          Set a New Password
        </h2>
        <p className="mb-6 text-sm text-gray-500">
          Enter your new password below
        </p>

        {error && (
          <div className="mb-4 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 text-sm font-medium text-green-600">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5 text-left">
            <label
              htmlFor="newPassword"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 pr-14 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <button
              type="button"
              onClick={() => setShowNewPassword(prev => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[17px] text-blue-600"
              >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="mb-6 text-left">
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 pr-14 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <button
              type="button"
              onClick={() => setShowConfirmPassword(prev => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[17px] text-blue-600"
              >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isDisabled}
            className="w-full rounded-md bg-blue-600 py-3 text-base font-medium text-white transition hover:bg-blue-500 disabled:opacity-60"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
