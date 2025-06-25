import React, { useState } from 'react'
import '../css/Navbar.css'
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate()

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    {/* Hamburger Menu */}
                    <div className='left-menu'>
                        <button
                            className="hamburger-menu"
                            onClick={toggleSidebar}
                            aria-label="Toggle menu"
                        >
                            <i className="ri-menu-line"></i>
                        </button>

                        {/* Logo */}
                        <div className="navbar-logo">
                            <span className="logo-text">Trident Marine</span>
                        </div>
                    </div>
                    {/* Sign In Button */}
                    <div className="navbar-actions">
                        <button className="signin-btn" onClick={()=>navigate('/signin')}>
                            <i className="ri-user-line"></i>
                            Sign In
                        </button>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <div className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                <div className="sidebar-header">
                    <h3>Menu</h3>
                    <button
                        className="close-btn"
                        onClick={toggleSidebar}
                        aria-label="Close menu"
                    >
                        <i className="ri-close-line"></i>
                    </button>
                </div>
                <div className="sidebar-content">
                    <nav className="sidebar-nav">
                        <a href="#home" className="sidebar-link">Home</a>
                        <a href="#services" className="sidebar-link">Services</a>
                        <a href="#about" className="sidebar-link">About</a>
                        <a href="#contact" className="sidebar-link">Contact</a>
                    </nav>
                </div>
            </div>

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    )
}

export default Navbar