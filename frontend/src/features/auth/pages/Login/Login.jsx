import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "@/features/auth/context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ loginInput: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const data = await login({
        loginInput: formData.loginInput.trim(),
        password: formData.password.trim(),
      });

      setSuccess("Login successful! Redirecting...");

      const role = data.user.role;

switch (role) {
  case "student":
    navigate("/candidate/dashboard", { replace: true });
    break;

  case "company":
    navigate("/company/dashboard", { replace: true });
    break;

  case "university":
    navigate("/university/dashboard", { replace: true });
    break;

  case "admin":
    navigate("/admin/dashboard", { replace: true });
    break;

  default:
    navigate("/", { replace: true });
}
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-5 font-sans">
      <div className="w-full max-w-[450px] rounded-xl bg-white px-10 py-6 text-center shadow-xl">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            HireNexon Login
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Sign in to your account
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-100 px-3 py-2 text-sm text-red-500">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-md bg-green-100 px-3 py-2 text-sm font-medium text-green-700">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="loginInput"
            value={formData.loginInput}
            onChange={handleChange}
            placeholder="Username or Email"
            required
            className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-[14px] text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
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

          <button
            type="submit"
            disabled={isLoading}
            className="mb-4 w-full rounded-lg bg-blue-600 py-3 text-[15px] font-medium text-white transition hover:bg-blue-500 disabled:opacity-70"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          <div className="mb-4 flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                className="h-4 w-4 accent-blue-600"
              />
              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="font-medium text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </form>

        <div className="relative my-5 text-sm text-gray-500 before:absolute before:left-0 before:top-1/2 before:h-px before:w-[32%] before:bg-gray-200 after:absolute after:right-0 after:top-1/2 after:h-px after:w-[32%] after:bg-gray-200">
          Or continue with
        </div>

        <div className="mb-5 flex gap-3">
          <button
            onClick={() =>
              (window.location.href =
                "https://api.hirenexon.com/api/social/google")
            }
            className="flex flex-1 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white py-2 text-sm font-medium text-red-600 transition hover:border-red-500 hover:bg-red-50"
          >
            <img src="/images/public/google-logo.png" className="h-5 w-5" />
            Google
          </button>

          <button
            onClick={() =>
              (window.location.href =
                "https://api.hirenexon.com/api/social/microsoft")
            }
            className="flex flex-1 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white py-2 text-sm font-medium text-blue-600 transition hover:border-blue-500 hover:bg-blue-50"
          >
            <img src="/images/public/microsoft-logo.png" className="h-5 w-5" />
            Microsoft
          </button>
        </div>

        <div className="text-sm text-gray-600">
          Don’t have an account?
          <Link
            to="/signup"
            className="ml-1 font-medium text-blue-600 hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
