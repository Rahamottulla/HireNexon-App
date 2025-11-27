// frontend/src/components/Signup/Signup.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleLoginRedirect = () => {
    setShowSuccessPopup(false);
    navigate('/login');
  };

  // ✅ Signup & send verification email automatically
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError("Password must be at least 6 characters, include uppercase, lowercase, and a special character.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Signup failed");

      // ✅ Success
      setShowSuccessPopup(true);

    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Candidate Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" className="input-field" value={formData.username} onChange={handleChange} required />

          <input type="email" name="email" placeholder="E-mail address" className="input-field" value={formData.email} onChange={handleChange} required />

          <div className="password-wrapper">
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" className="input-field" value={formData.password} onChange={handleChange} required />
            <button type="button" className="signup-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="password-wrapper">
            <input type={showConfirm ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" className="input-field" value={formData.confirmPassword} onChange={handleChange} required />
            <button type="button" className="signup-toggle-btn" onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button type="submit" className="btn-signup" disabled={isLoading}>
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        <div className="or-continue">Or continue with</div>

        <div className="social-buttons">
          <button onClick={() => window.location.href = "http://localhost:5000/api/social/google"}
          className="btn-social google">
            <img src="/images/google-logo.png" alt="HireNexon" /> Google
          </button>
          <button onClick={() => window.location.href = "http://localhost:5000/api/social/microsoft"} 
          className="btn-social microsoft">
            <img src="/images/microsoft-logo.png" alt="HireNexon" /> Microsoft
          </button>
        </div>

        <div className="signin-link">
          Have an account? <Link to="/login">Sign In</Link>
        </div>
      </div>

      {/* ✅ Success Popup */}
      {showSuccessPopup && (
        <div className="signup-success-popup">
          <div className="signup-success-box">
            <h3>Registration Successful! 🎉</h3>
            <p>
              Welcome to <b>HireNexon</b>, {formData.username}! <br />
              A verification email has been sent to <b>{formData.email}</b>. Please verify your account to login.
            </p>
            <button  className="signup-login-btn" onClick={handleLoginRedirect}>Go to Login</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;

