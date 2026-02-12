import React from "react";
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";

const VerifyFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-8 text-center">
        <XCircle className="mx-auto text-red-500 w-14 h-14 mb-4" />

        <h1 className="text-2xl font-semibold text-white mb-2">
          Verification Failed
        </h1>

        <p className="text-slate-400 mb-6">
          The verification link is invalid or has expired. Please try again or
          request a new verification email.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/resend-verification")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition"
          >
            Resend Verification Email
          </button>

          <button
            onClick={() => navigate("/login")}
            className="border border-slate-700 text-slate-300 hover:bg-slate-800 py-3 rounded-lg transition"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyFailed;
