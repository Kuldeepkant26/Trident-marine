import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Ship } from 'lucide-react'
import '../css/Signin.css'

function Signin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign in data:', formData);
    // Handle sign in logic here
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signin-page">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        <i className="ri-arrow-left-line"></i>
        Back
      </button>

      <div className="signin-container">
        {/* Left Side - Branding */}
        <div className="signin-left">
          <div className="signin-brand">
            <div className="brand-icon">
              <Ship size={48} color="white" />
            </div>
            <h1>Trident Marine</h1>
            <p>Professional Fleet Management Solution</p>
          </div>
          
          <div className="signin-features">
            <div className="feature-item">
              <i className="ri-ship-line"></i>
              <span>Manage Your Fleet</span>
            </div>
            <div className="feature-item">
              <i className="ri-calendar-check-line"></i>
              <span>Track Maintenance</span>
            </div>
            <div className="feature-item">
              <i className="ri-notification-line"></i>
              <span>Smart Notifications</span>
            </div>
            <div className="feature-item">
              <i className="ri-bar-chart-line"></i>
              <span>Analytics & Reports</span>
            </div>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="signin-right">
          <div className="signin-header">
            <h2>Welcome Back</h2>
            <p>Sign in to access your fleet management dashboard</p>
          </div>

          <form className="signin-form" onSubmit={handleSubmit}>
            <div className="form-group has-label">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
              <i className="ri-mail-line input-icon"></i>
            </div>

            <div className="form-group has-label">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"}></i>
              </button>
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <a href="#forgot" className="forgot-password">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="signin-btn">
              Sign In
            </button>
          </form>

          <div className="divider">
            <span>or continue with</span>
          </div>

          <div className="social-signin">
            <a href="#google" className="social-btn">
              <i className="ri-google-fill" style={{color: '#db4437'}}></i>
              Google
            </a>
            <a href="#microsoft" className="social-btn">
              <i className="ri-microsoft-fill" style={{color: '#00a1f1'}}></i>
              Microsoft
            </a>
          </div>

          <div className="signup-link">
            <p>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/signup'); }}>Create Account</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin
