/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../styles/Confirmation.css";
import { useNavigate, Link } from 'react-router-dom';

const Confirm: React.FC = () => {

    const navigate = useNavigate();
    return (
        <div className="home-container">
            <header className="hero-section">
                <nav className="navbar">
                    <Link to={"/"}><div className="logo">Green Thumb Hub</div></Link>
                </nav>

            </header>

            <section className="features-section">
            <div className="hero-content">
                    <h1>Confirm Your Registration</h1>
                    <p>Thank you for registering with us! Please check your email inbox for a confirmation message.
                        To complete your registration, kindly follow the link provided in the email.
                        If you haven't received the email, please check your spam folder or contact our support team for assistance.
                    </p>
                    <button className="get-started" onClick={ () => navigate('/login') }>Go to Login</button>
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


            <footer className="footer">


            </footer>
        </div>
    );
};

export default Confirm;
