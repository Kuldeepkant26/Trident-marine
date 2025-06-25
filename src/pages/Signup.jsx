import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Ship } from 'lucide-react'
import '../css/Signup.css'

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (!formData.agreeToTerms) {
      alert('Please agree to the terms and conditions!');
      return;
    }
    console.log('Sign up data:', formData);
    // Handle sign up logic here
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="signup-page">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        <i className="ri-arrow-left-line"></i>
        Back
      </button>

      <div className="signup-container">
        {/* Left Side - Branding */}
        <div className="signup-left">
          <div className="signup-brand">
            <div className="brand-icon">
              <Ship size={48} color="white" />
            </div>
            <h1>Trident Marine</h1>
            <p>Join our Professional Fleet Management Solution</p>
          </div>
          
          <div className="signup-benefits">
            <div className="benefit-item">
              <i className="ri-shield-check-line"></i>
              <span>Secure & Reliable</span>
            </div>
            <div className="benefit-item">
              <i className="ri-time-line"></i>
              <span>Real-time Tracking</span>
            </div>
            <div className="benefit-item">
              <i className="ri-team-line"></i>
              <span>Team Collaboration</span>
            </div>
            <div className="benefit-item">
              <i className="ri-customer-service-line"></i>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="signup-right">
          <div className="signup-header">
            <h2>Create Account</h2>
            <p>Start managing your fleet with professional tools</p>
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group has-label">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                  required
                />
                <i className="ri-user-line input-icon"></i>
              </div>

              <div className="form-group has-label">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                  required
                />
                <i className="ri-user-line input-icon"></i>
              </div>
            </div>

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
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                required
              />
              <i className="ri-phone-line input-icon"></i>
            </div>

            <div className="form-group has-label">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a password"
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

            <div className="form-group has-label">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={toggleConfirmPasswordVisibility}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                <i className={showConfirmPassword ? "ri-eye-off-line" : "ri-eye-line"}></i>
              </button>
            </div>

            <div className="terms-agreement">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="agreeToTerms">
                I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" className="signup-btn">
              Create Account
            </button>
          </form>

          <div className="divider">
            <span>or sign up with</span>
          </div>

          <div className="social-signup">
            <a href="#google" className="social-btn">
              <i className="ri-google-fill" style={{color: '#db4437'}}></i>
              Google
            </a>
            <a href="#microsoft" className="social-btn">
              <i className="ri-microsoft-fill" style={{color: '#00a1f1'}}></i>
              Microsoft
            </a>
          </div>

          <div className="signin-link">
            <p>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/signin'); }}>Sign In</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
