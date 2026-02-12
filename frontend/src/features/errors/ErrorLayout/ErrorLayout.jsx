import React from "react";
import { Link } from "react-router-dom";

const ErrorLayout = ({
  code,
  title,
  message,
  image,
  primaryAction,
  secondaryAction,
}) => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6">
      <div className="max-w-lg text-center text-white">
        <img
          src={image}
          alt={code}
          className="mx-auto mb-6 h-48"
        />

        <h1 className="text-5xl font-bold text-red-400">{code}</h1>
        <h2 className="text-2xl font-semibold mt-4">{title}</h2>
        <p className="text-slate-300 mt-3">{message}</p>

        <div className="mt-6 flex justify-center gap-4">
          {primaryAction && (
            <Link
              to={primaryAction.to}
              className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700"
            >
              {primaryAction.label}
            </Link> 
          )}
          {secondaryAction && (
            <Link
              to={secondaryAction.to}
              className="px-5 py-2 rounded-md border border-slate-500 hover:bg-slate-800"
            >
              {secondaryAction.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorLayout;
