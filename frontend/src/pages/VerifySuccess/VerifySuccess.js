// frontend/src/pages/verifySuccess/verifySuccess.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./VerifySuccess.css";

const VerifySuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="verify-success-container">
      <div className="verify-success-box">
        <h2>✅ Email Verified Successfully!</h2>
        <p>Your email has been verified. You can now login to your account.</p>
        <button 
          className="verify-btn-login"
          onClick={() => navigate("/login")}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default VerifySuccess;
