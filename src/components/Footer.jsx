import React from 'react'
import { motion } from 'framer-motion'
import { 
  Ship, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  ArrowUp,
  Shield,
  Clock,
  Users,
  HeadphonesIcon
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import '../css/Footer.css'

function Footer() {
  const navigate = useNavigate()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  const socialVariants = {
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: { type: "spring", stiffness: 300 }
    }
  }

  return (
    <footer className="footer">
      {/* Scroll to Top Button */}
      <motion.button 
        className="scroll-to-top"
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <ArrowUp size={20} />
      </motion.button>

      {/* Main Footer Content */}
      <motion.div 
        className="footer-main"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container">
          <div className="footer-grid">
            
            {/* Company Info */}
            <motion.div className="footer-section" variants={itemVariants}>
              <div className="footer-logo">
                <Ship size={32} />
                <span className="logo-text">Trident Marine</span>
              </div>
              <p className="footer-description">
                Professional boat fleet management solution designed to streamline your marine operations. 
                Manage vessel data, track services, and handle repairs efficiently.
              </p>
              <div className="footer-features">
                <div className="footer-feature">
                  <Shield size={16} />
                  <span>Secure & Reliable</span>
                </div>
                <div className="footer-feature">
                  <Clock size={16} />
                  <span>24/7 Available</span>
                </div>
                <div className="footer-feature">
                  <Users size={16} />
                  <span>Expert Support</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div className="footer-section" variants={itemVariants}>
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-links">
                <li>
                  <motion.a 
                    href="#" 
                    onClick={() => navigate('/')}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Home
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="#features"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Features
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="#benefits"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Benefits
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="#testimonials"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Testimonials
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="#contact"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Contact
                  </motion.a>
                </li>
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div className="footer-section" variants={itemVariants}>
              <h4 className="footer-title">Services</h4>
              <ul className="footer-links">
                <li>
                  <motion.a 
                    href="#"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Boat Data Management
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="#"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Service Scheduling
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="#"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Repair Management
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="#"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Notification System
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="#"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    User Management
                  </motion.a>
                </li>
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div className="footer-section" variants={itemVariants}>
              <h4 className="footer-title">Get in Touch</h4>
              <div className="contact-info">
                <motion.div 
                  className="contact-item"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Mail size={18} />
                  <div>
                    <p>Email</p>
                    <a href="mailto:support@tridentmarine.com">support@tridentmarine.com</a>
                  </div>
                </motion.div>
                <motion.div 
                  className="contact-item"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Phone size={18} />
                  <div>
                    <p>Phone</p>
                    <a href="tel:+1234567890">+1 (234) 567-8900</a>
                  </div>
                </motion.div>
                <motion.div 
                  className="contact-item"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <MapPin size={18} />
                  <div>
                    <p>Address</p>
                    <span>123 Marina Bay, Coastal City, CC 12345</span>
                  </div>
                </motion.div>
                <motion.div 
                  className="contact-item"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <HeadphonesIcon size={18} />
                  <div>
                    <p>Support</p>
                    <span>24/7 Customer Service</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Footer Bottom */}
      <motion.div 
        className="footer-bottom"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="container">
          <div className="footer-bottom-content">
            <div className="footer-bottom-left">
              <p>&copy; 2025 Trident Marine. All rights reserved.</p>
              <div className="footer-legal">
                <motion.a 
                  href="#"
                  whileHover={{ color: "#0ea5e9" }}
                  transition={{ duration: 0.2 }}
                >
                  Privacy Policy
                </motion.a>
                <span>|</span>
                <motion.a 
                  href="#"
                  whileHover={{ color: "#0ea5e9" }}
                  transition={{ duration: 0.2 }}
                >
                  Terms of Service
                </motion.a>
                <span>|</span>
                <motion.a 
                  href="#"
                  whileHover={{ color: "#0ea5e9" }}
                  transition={{ duration: 0.2 }}
                >
                  Cookie Policy
                </motion.a>
              </div>
            </div>
            <div className="footer-bottom-right">
              <div className="social-links">
                <motion.a 
                  href="#" 
                  className="social-link"
                  variants={socialVariants}
                  whileHover="hover"
                >
                  <Facebook size={20} />
                </motion.a>
                <motion.a 
                  href="#" 
                  className="social-link"
                  variants={socialVariants}
                  whileHover="hover"
                >
                  <Twitter size={20} />
                </motion.a>
                <motion.a 
                  href="#" 
                  className="social-link"
                  variants={socialVariants}
                  whileHover="hover"
                >
                  <Linkedin size={20} />
                </motion.a>
                <motion.a 
                  href="#" 
                  className="social-link"
                  variants={socialVariants}
                  whileHover="hover"
                >
                  <Instagram size={20} />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Animated Background Elements */}
      <div className="footer-bg-elements">
        <motion.div 
          className="bg-wave"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="bg-circle"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </footer>
  )
}

export default Footer
