import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Ship, 
  Shield, 
  Users, 
  Wrench, 
  Bell, 
  BarChart3, 
  Smartphone, 
  Bot, 
  CheckCircle,
  Play,
  ArrowRight,
  Star,
  Clock,
  Award,
  Globe
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import '../css/Home.css'
import Footer from '../components/Footer'

function Home() {
  const navigate = useNavigate()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const containerRef = useRef(null)
  const heroSectionRef = useRef(null)
  const videoRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [hasInitialized, setHasInitialized] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [isHeroInView, setIsHeroInView] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)

  const testimonials = [
    {
      name: "Captain James Rodriguez",
      company: "Pacific Fleet Services",
      text: "The boat data management system has streamlined our operations. We can now track all our vessel information and service schedules in one place.",
      rating: 5
    },
    {
      name: "Sarah Mitchell",
      company: "Coastal Marine Operations",
      text: "The notification system for service expiries and maintenance schedules has helped us stay compliant and avoid costly breakdowns.",
      rating: 5
    },
    {
      name: "Michael Chen",
      company: "Harbor Management Corp",
      text: "The repair job tracking feature works like a project management system - we can assign tasks, set deadlines and monitor progress efficiently.",
      rating: 5
    }
  ]

  const features = [
    {
      icon: Ship,
      title: "Boat Data Management",
      description: "Store and manage detailed information for each boat in your fleet with comprehensive vessel records and documentation."
    },
    {
      icon: Bell,
      title: "Service Schedule Tracking",
      description: "Track servicing schedules and receive automated notifications about upcoming maintenance and document expiration dates."
    },
    {
      icon: Wrench,
      title: "Repair Job Management",
      description: "Handle repair jobs like a project management system with task assignment, deadline tracking and progress monitoring."
    },
    {
      icon: Users,
      title: "User Management",
      description: "Support for different user roles including Clients and Admin with secure registration and login functionality."
    },
    {
      icon: BarChart3,
      title: "Service History",
      description: "Maintain comprehensive service history and logs for each vessel to track maintenance patterns and compliance."
    },
    {
      icon: Shield,
      title: "Expiration Alerts",
      description: "Get timely notifications for document expiry, insurance renewals, and scheduled maintenance requirements."
    }
  ]

  const stats = [
    { number: "100+", label: "Boats Managed" },
    { number: "99%", label: "Uptime Rate" },
    { number: "25+", label: "Active Users" },
    { number: "24/7", label: "Support" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Check if it's mobile view
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 1024) // Mobile/tablet breakpoint - matches CSS @media (max-width: 1024px)
    }
    
    checkMobileView()
    window.addEventListener('resize', checkMobileView)
    
    return () => window.removeEventListener('resize', checkMobileView)
  }, [])

  // Intersection Observer for hero section visibility
  useEffect(() => {
    if (!heroSectionRef.current || !isMobileView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroInView(entry.isIntersecting)
      },
      {
        threshold: 0.3, // Hero section is considered "in view" when 30% visible (more responsive)
        rootMargin: '0px'
      }
    )

    observer.observe(heroSectionRef.current)

    return () => {
      if (heroSectionRef.current) {
        observer.unobserve(heroSectionRef.current)
      }
    }
  }, [isMobileView])

  // Auto-play video on mobile when hero section is in view
  useEffect(() => {
    if (!isMobileView || !videoRef.current || !isVideoLoaded || videoError) return

    if (isHeroInView) {
      // Play video when hero section is in view on mobile
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Silently handle autoplay errors
        })
      }
    } else {
      // Pause video when hero section is out of view on mobile
      videoRef.current.pause()
    }
  }, [isHeroInView, isMobileView, isVideoLoaded, videoError])

  // Mouse tracking for 3D effect
  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY
      
      setMousePosition({ x: mouseX, y: mouseY })
    }
  }

  const handleMouseEnter = () => {
    // Only handle hover on desktop (larger screens)
    if (isMobileView) return
    
    setIsHovering(true)
    
    // Initialize smooth first hover animation
    if (!hasInitialized) {
      setTimeout(() => setHasInitialized(true), 100)
    }
    
    // Play video on hover if loaded
    if (videoRef.current && isVideoLoaded && !videoError) {
      const playPromise = videoRef.current.play()
      
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Silently handle autoplay errors
        })
      }
    }
  }

  const handleMouseLeave = () => {
    // Only handle hover on desktop (larger screens)
    if (isMobileView) return
    
    setIsHovering(false)
    setMousePosition({ x: 0, y: 0 })
    
    // Pause and reset video when not hovering
    if (videoRef.current && isVideoLoaded && !videoError) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  // Video event handlers
  const handleVideoLoaded = () => {
    setIsVideoLoaded(true)
    setVideoError(false)
    if (videoRef.current) {
      videoRef.current.setAttribute('data-loaded', 'true')
    }
  }

  const handleVideoError = () => {
    setIsVideoLoaded(false)
    setVideoError(true)
  }

  const handleVideoCanPlay = () => {
    if (!isVideoLoaded && !videoError) {
      setIsVideoLoaded(true)
      setVideoError(false)
    }
  }

  // Video loading timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isVideoLoaded && !videoError) {
        setVideoError(true)
        setIsVideoLoaded(false)
      }
    }, 8000) // 8 second timeout

    return () => clearTimeout(timer)
  }, [isVideoLoaded, videoError])

  // Video loading timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInitialized) {
        setVideoError(true)
      }
    }, 10000) // 10 second timeout for YouTube to load

    return () => clearTimeout(timer)
  }, [hasInitialized])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" ref={heroSectionRef}>
        <div className="hero-background">
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
          <div className="wave wave3"></div>
        </div>
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Manage Your Boat Fleet with 
              <span className="gradient-text"> Confidence</span>
            </motion.h1>
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A comprehensive web-based application for managing your fleet of boats. Store detailed vessel information, 
              track servicing schedules, get expiration notifications, and handle repair jobs with our project management system.
            </motion.p>
            <motion.div 
              className="hero-buttons"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button className="btn-primary" onClick={() => navigate('/signup')}>
                Get Started Free
                <ArrowRight size={20} />
              </button>
              <button className="btn-secondary">
                <Play size={20} />
                Watch Demo
              </button>
            </motion.div>
          </motion.div>
          <motion.div 
            className="hero-video"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div 
              className="hero-video-container"
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: isHovering 
                  ? `perspective(1000px) rotateY(${mousePosition.x * 0.02}deg) rotateX(${-mousePosition.y * 0.02}deg) translateZ(${Math.abs(mousePosition.x) * 0.1 + Math.abs(mousePosition.y) * 0.1}px)`
                  : 'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
                transition: isHovering && hasInitialized ? 'none' : 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {/* Hero media - Video always visible, plays on hover */}
              <div className="hero-media-wrapper">
                {/* Pexels video - always shown, plays on hover */}
                <video 
                  ref={videoRef}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onLoadedData={handleVideoLoaded}
                  onError={handleVideoError}
                  onCanPlayThrough={handleVideoCanPlay}
                  className="hero-main-video"
                  style={{
                    transform: isHovering 
                      ? `scale(${1 + (Math.abs(mousePosition.x) + Math.abs(mousePosition.y)) * 0.00012}) translateX(${mousePosition.x * 0.03}px) translateY(${mousePosition.y * 0.03}px)`
                      : 'scale(1)',
                    transition: isHovering && hasInitialized ? 'none' : 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: isVideoLoaded && !videoError ? 1 : 0
                  }}
                >
                  <source src="https://videos.pexels.com/video-files/17637291/17637291-uhd_2560_1440_50fps.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Fallback image only when video fails to load */}
                {(!isVideoLoaded || videoError) && (
                  <img 
                    src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Modern marina with yacht fleet - Professional boat management system"
                    className="hero-fallback-image"
                    style={{
                      transform: isHovering 
                        ? `scale(${1 + (Math.abs(mousePosition.x) + Math.abs(mousePosition.y)) * 0.00012}) translateX(${mousePosition.x * 0.03}px) translateY(${mousePosition.y * 0.03}px)`
                        : 'scale(1)',
                      transition: isHovering && hasInitialized ? 'none' : 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  />
                )}
              </div>
              
              <div className="hero-video-overlay"
                style={{
                  transform: isHovering 
                    ? `translateX(${mousePosition.x * 0.01}px) translateY(${mousePosition.y * 0.01}px)`
                    : 'translateX(0) translateY(0)',
                  transition: isHovering && hasInitialized ? 'none' : 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity: (isHovering || (isMobileView && isHeroInView && isVideoLoaded && !videoError)) ? 0 : 1 // Hide overlay on hover or when video is playing on mobile
                }}
              >
                <motion.div
                  className="overlay-content"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  style={{
                    transform: isHovering 
                      ? `translateX(${mousePosition.x * 0.03}px) translateY(${mousePosition.y * 0.03}px) scale(${1 + Math.abs(mousePosition.x) * 0.0002}) rotateZ(${mousePosition.x * 0.01}deg)`
                      : 'translateX(0) translateY(0) scale(1) rotateZ(0deg)',
                    transition: isHovering && hasInitialized ? 'none' : 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <Ship size={48} color="white" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <motion.div 
            className="stats-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div key={index} className="stat-item" variants={itemVariants}>
                <h3 className="stat-number">{stat.number}</h3>
                <p className="stat-label">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Essential Features for Boat Fleet Management</h2>
            <p className="section-subtitle">
              Everything you need to store boat data, track services, manage repairs, and stay notified about important schedules
            </p>
          </motion.div>
          <motion.div 
            className="features-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="feature-card"
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="feature-icon">
                  <feature.icon size={32} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="phases-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Why Choose Trident Marine?</h2>
            <p className="section-subtitle">
              Comprehensive boat fleet management designed to simplify your marine operations and boost efficiency
            </p>
          </motion.div>
          <div className="phases-timeline">
            <motion.div 
              className="phase-card benefit-card"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="phase-badge benefit-badge">Centralized Management</div>
              <h3>All Your Boat Data in One Place</h3>
              <ul>
                <li><CheckCircle size={16} /> Store detailed information for every vessel</li>
                <li><CheckCircle size={16} /> Access complete service history instantly</li>
                <li><CheckCircle size={16} /> Maintain digital documentation records</li>
                <li><CheckCircle size={16} /> Track vessel specifications and equipment</li>
              </ul>
              <div className="phase-duration">
                <Shield size={16} />
                Secure & Organized
              </div>
            </motion.div>

            <motion.div 
              className="phase-card benefit-card"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="phase-badge benefit-badge">Smart Notifications</div>
              <h3>Never Miss Important Deadlines</h3>
              <ul>
                <li><Bell size={16} /> Automatic service schedule reminders</li>
                <li><Bell size={16} /> Document expiration alerts</li>
                <li><Bell size={16} /> Insurance renewal notifications</li>
                <li><Bell size={16} /> Customizable alert preferences</li>
              </ul>
              <div className="phase-duration">
                <Clock size={16} />
                Always On Time
              </div>
            </motion.div>

            <motion.div 
              className="phase-card benefit-card"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="phase-badge benefit-badge">Efficient Workflow</div>
              <h3>Streamlined Repair Management</h3>
              <ul>
                <li><Wrench size={16} /> Create and assign repair tasks easily</li>
                <li><Wrench size={16} /> Track progress with deadline monitoring</li>
                <li><Wrench size={16} /> Collaborate with team members</li>
                <li><Wrench size={16} /> Generate repair reports and invoices</li>
              </ul>
              <div className="phase-duration">
                <Award size={16} />
                Productive & Efficient
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Trusted by Marine Professionals</h2>
            <p className="section-subtitle">
              See how our boat fleet management system is helping marine operations stay organized and efficient
            </p>
          </motion.div>
          <motion.div 
            className="testimonial-carousel"
            key={currentTestimonial}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="testimonial-card">
              <div className="stars">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
              <p className="testimonial-text">"{testimonials[currentTestimonial].text}"</p>
              <div className="testimonial-author">
                <h4>{testimonials[currentTestimonial].name}</h4>
                <p>{testimonials[currentTestimonial].company}</p>
              </div>
            </div>
          </motion.div>
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="cta-title">Ready to Organize Your Boat Fleet?</h2>
            <p className="cta-subtitle">
              Join marine professionals who use Trident Marine to manage their boat data, track services, and handle repairs efficiently
            </p>
            <div className="cta-buttons">
              <button className="btn-primary" onClick={() => navigate('/signup')}>
                Start Free Trial
                <ArrowRight size={20} />
              </button>
              <button className="btn-outline">
                Schedule Demo
              </button>
            </div>
            <div className="cta-features">
              <div className="cta-feature">
                <CheckCircle size={16} />
                <span>Free 30-day trial</span>
              </div>
              <div className="cta-feature">
                <CheckCircle size={16} />
                <span>No credit card required</span>
              </div>
              <div className="cta-feature">
                <CheckCircle size={16} />
                <span>Full feature access</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
   
    </div>
  )
}

export default Home
