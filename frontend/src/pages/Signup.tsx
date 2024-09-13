import React, { useState } from "react";
import "../styles/Signup.css";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from 'axios';


const Signup: React.FC = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const checkPasswordStrength = (password: string): string => {
    if (password.length < 6) {
      return 'weak-password';
    } else if (password.length < 10) {
      return 'medium-password';
    } else {
      return 'strong-password';
    }
  }


    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [errors, setErrors] = useState({
      username: false,
      email: false,
      password: false,
      confirmPassword: false
    })
    const navigate = useNavigate();

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPassword = e.target.value;
      setPassword(newPassword);
      setPasswordStrength(checkPasswordStrength(newPassword));
    };


    const handleSignup = async (e: React.FormEvent) => {
      e.preventDefault();

      const newErrors = {
        username: !username,
        email: !email,
        password: !password,
        confirmPassword: password !== confirmPassword
      };

      setErrors(newErrors);

      if (Object.values(newErrors).includes(true)) {
        return;
      }

      try {
        await api.post('/register', { username, email, password });
        setSuccessMessage('Signup successful! Please check your e-mail to confirm your register.');
        setErrorMessage('');
        navigate('/confirmation');
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

        setSuccessMessage('');
      }
    }

  return (
    <div className="signup-container">
      {/* Lado esquerdo - Formulário de cadastro */}

      <div className="navbar">
      <Link to={"/"}>
      <div className="logo">Green Thumb Hub</div>
      </Link>

      </div>

      <div className="signup-form-container">

      <header>
        <nav className="signup-home">
        </nav>
      </header>
        <div className="signup-header">
          <h2>Sign Up for Green Thumb Hub</h2>
        </div>

        <form className="signup-form" onSubmit={handleSignup}>
          <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={errors.username ? 'input-error' : 'input-valid'}/>
          <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={errors.username ? 'input-error' : 'input-valid'}/>
                    <div className={`password-strength ${passwordStrength}`}>
        Password Strength: {passwordStrength.replace('-', ' ').toUpperCase()}
      </div>
<div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className={errors.password ? 'input-error' : 'input-valid'}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className={`password-strength ${passwordStrength}`}>
        Password Strength: {passwordStrength.replace('-', ' ').toUpperCase()}
      </div>
          <div className="password-container">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={errors.confirmPassword ? 'input-error' : 'input-valid'}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <button type="submit">Sign Up</button>
        </form>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        {/* <div className="social-signup">
          <p>Sign Up with Google</p>
          <p>Sign Up with Facebook</p>
          <p>Sign Up with Apple</p>
        </div> */}
        <div className="login-link">
          <p>
            Already have an account? <a href="/login">Log in</a>
          </p>
        </div>
      </div>

      {/* Linha vertical separadora */}
      <div className="separator"></div>

      {/* Lado direito - Imagem */}
      <div className="signup-image"></div>
    </div>
  );
};

export default Signup;
