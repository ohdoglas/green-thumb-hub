/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <header className="hero-section">
                <nav className="navbar">
                    <div className="logo">Green Thumb Hub</div>
                    <div className="auth-buttons">
                        <Link to="/register">
                        <button className="sign-up">Sign Up</button>
                        </Link>
                        <button className="login">Login</button>
                    </div>
                </nav>

            </header>

            <section className="features-section">
            <div className="hero-content">
                    <h1>The plant manager for you</h1>
                    <p>Effortlessly manage your garden with expert tools and tips.</p>
                    <button className="get-started">Get started</button>
                </div>
                <h2>Feature Overview</h2>
                <div className="features">
                    <div className="feature">
                        <h3>My Plants</h3>
                        <p>Easily register and manage all your plants.</p>
                    </div>
                    <div className="feature">
                        <h3>Care Tips</h3>
                        <p>Access expert tips for optimal plant care.</p>
                    </div>
                    <div className="feature">
                        <h3>Reminders</h3>
                        <p>Schedule reminders for watering and maintenance.</p>
                    </div>
                </div>
            </section>

            <section className="testimonials-section">
                <h2>What Our Users Say</h2>
                <div className="testimonials">
                    <div className="testimonial">
                        <p>"This app has transformed my gardening experience!"</p>
                        <span>- Emily Thompson</span>
                    </div>
                    <div className="testimonial">
                        <p>"I love the plant care tips. My garden has never looked better!"</p>
                        <span>- James Carter</span>
                    </div>
                    <div className="testimonial">
                        <p>"The plant registration feature is fantastic. Keeps everything organized!"</p>
                        <span>- Sophia Martinez</span>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="cta">
                    <h2>Get started with Green Thumb Hub</h2>
                    <button className="get-started">Get started</button>
                </div>
                {/* <div className="footer-links">
                    <div className="links-column">
                        <h4>Product</h4>
                        <a href="#">Features</a>
                        <a href="#">Pricing</a>
                    </div>
                    <div className="links-column">
                        <h4>Resources</h4>
                        <a href="#">Blog</a>
                        <a href="#">User Guides</a>
                        <a href="#">Webinars</a>
                    </div>
                    <div className="links-column">
                        <h4>Company</h4>
                        <a href="#">About us</a>
                        <a href="#">Contact us</a>
                    </div>
                    <div className="links-column">
                        <h4>Plans & Pricing</h4>
                        <a href="#">Personal</a>
                        <a href="#">Startup</a>
                        <a href="#">Organization</a>
                    </div>
                </div> */}
            </footer>
        </div>
    );
};

export default Home;
