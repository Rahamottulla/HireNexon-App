import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const VerifySuccess = () => {
  const navigate = useNavigate();

  // Optional auto-redirect after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-8 text-center">
        <CheckCircle className="mx-auto text-emerald-500 w-14 h-14 mb-4" />

        <h1 className="text-2xl font-semibold text-white mb-2">
          Email Verified Successfully
        </h1>

        <p className="text-slate-400 mb-6">
          Your email has been verified. You can now log in and start using
          HireNexon.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-lg transition"
        >
          Go to Login
        </button>

        <p className="text-xs text-slate-500 mt-4">
          Redirecting automatically in a few seconds…
        </p>
      </div>
    </div>
  );
};

export default VerifySuccess;
