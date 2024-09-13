import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Confirmed.css";

const RegistrationConfirmed: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login');
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="home-container">
            <header className="hero-section">
                <nav className="navbar">
                    <div className="logo">
                        Green Thumb Hub
                    </div>
                </nav>
            </header>

            <section className="features-section">
                <div className="hero-content">
                    <h1>Registration Confirmed</h1>
                    <p>Your account has been successfully confirmed! You will be redirected to the login page shortly.</p>
                    <p>If you are not redirected automatically, <span onClick={() => navigate('/login')} className="link">click here</span>.</p>
                </div>
            </section>

            <footer className="footer">
            </footer>
        </div>
    )
}

export default RegistrationConfirmed