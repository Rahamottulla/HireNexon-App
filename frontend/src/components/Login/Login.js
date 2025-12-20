//frontend/src/components/Login/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({ loginInput: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const data = await login({
        loginInput: formData.loginInput.trim(),
        password: formData.password.trim()
      });
      

      setSuccess('Login successful! Redirecting...');

// Redirect based on role
const role = data.user.role || 'user'; // default role
switch (role) {
  case 'user':
    navigate('/candidate/dashboard', { replace: true });
    break;

  case 'organization':
    navigate('/organization/dashboard', { replace: true });
    break;

  case 'admin':
    navigate('/admin/dashboard', { replace: true }); // only if exists
    break;

  default:
    navigate('/candidate/dashboard', { replace: true });
}
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="welcome-text">
          <h2>HireNexon Login</h2>
          <p>Sign in to your account</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="loginInput"
            className="input-field"
            value={formData.loginInput}
            onChange={handleChange}
            placeholder="Username or Email"
            required
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="input-field"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="signin-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button type="submit" className="login-btn-primary" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>

          <div className="remember-forgot">
            <div className="remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link to="/forgot-password" className="forgot-link">
              Forgot password?
            </Link>
          </div>
        </form>

        <div className="divider">Or continue with</div>

        <div className="social-buttons">
          <button onClick={() => window.location.href = "https://hirenexon-app.onrender.com/api/social/google"}
          className="btn-social google">
            <img src="/images/google-logo.png" alt="Google" /> Google
          </button>
          <button onClick={() => window.location.href = "https://hirenexon-app.onrender.com/api/social/microsoft"}
          className="btn-social microsoft">
            <img src="/images/microsoft-logo.png" alt="Microsoft" /> Microsoft
          </button>
        </div>

        <div className="auth-footer">
          <p>
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

