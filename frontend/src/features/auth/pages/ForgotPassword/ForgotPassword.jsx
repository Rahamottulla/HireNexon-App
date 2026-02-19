import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      await resetPassword(email);
      setMessage("Password reset link have been sent to your email");
      setEmail("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-5">
      <div className="w-full max-w-[450px] rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-2 text-center text-2xl font-semibold text-gray-800">
          Reset Your Password
        </h2>
        <p className="mb-6 text-center text-sm text-gray-500">
          Enter your email to receive reset code
        </p>

        {error && (
          <div className="mb-4 rounded-md bg-red-100 px-3 py-2 text-center text-sm text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 rounded-md bg-green-100 px-3 py-2 text-center text-sm text-green-700">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-3 text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mb-5 w-full rounded-md bg-blue-600 py-3 text-base font-medium text-white transition hover:bg-blue-500 disabled:bg-blue-300"
          >
            {isLoading ? "Sending..." : "Send Reset Code"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Remember your password?
          <Link
            to="/login"
            className="ml-1 font-medium text-blue-600 hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
