import React, { useState } from "react";
import "../styles/LoginSignupLayout.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import axios from "axios";

const Login: React.FC = () => {


    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post("/login", {
                email: usernameOrEmail.includes("@") ? usernameOrEmail : "",
                username: !usernameOrEmail.includes("@") ? usernameOrEmail : "",
                password,
            });

            if (rememberMe) {
                localStorage.setItem("token", response.data.token);
            } else {
                sessionStorage.setItem("token", response.data.token);
            }

            setErrorMessage("");
            navigate("/");
        } catch (error) {
            console.log('Error:', error);

            if (axios.isAxiosError(error)) {
              // Verifica se o erro é uma instância de AxiosError
            if (error.response && error.response.data && typeof error.response.data.message === 'string') {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
            } else {
              // Lida com outros tipos de erros, se necessário
            setErrorMessage('An unknown error occurred. Please try again.');
            }

        }
    }

    return (
        <div className="login-container">
                <div className="navbar">
    <Link to={"/"}>
    <div className="logo">Green Thumb Hub</div>
    </Link>
    <div className="auth-buttons">
                        <button className="sign-up" onClick={ () => navigate('/register') }>Sign Up</button>
                    </div>
    </div>
            <div className="login-content">

                <div className="login-form-container">
                    <div className="login-header">
                        <h2>Login to Green Thumb Hub</h2>
                    </div>
                    <form className="login-form" onSubmit={handleLogin}>
                        <input
                        type="text"
                        placeholder="Username or Email"
                        value={usernameOrEmail}
                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                        className="input-valid"
                        />

                        <div className="password-container">
                            <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-valid"
                            />
                            <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        <div className="remember-me">
                            <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label>Remember me</label>
                        </div>
                        <button type="submit">Login</button>
                    </form>

                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className="signup-link">
                        <p>Don’t have an account? <Link to="/register">Sign up</Link></p>
                    </div>
                </div>
            </div>
            <div className="separator"></div>

            <div className="login-image"></div>
            </div>
    )
}

export default Login;