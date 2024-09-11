import React from "react";
import "../styles/Signup.css";
import { Link } from "react-router-dom";


const Signup: React.FC = () => {
  return (
    <div className="signup-container">
      {/* Lado esquerdo - Formulário de cadastro */}

      <div className="signup-form-container">
      <header>
        <nav className="signup-home">
          <Link to="/">
          <button>Home</button>
          </Link>
        </nav>
      </header>
        <div className="signup-header">
          <h2>Sign Up for Green Thumb Hub</h2>
        </div>

        <form className="signup-form">
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email Address" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />
          <button type="submit">Sign Up</button>
        </form>
        <div className="social-signup">
          <p>Sign Up with Google</p>
          <p>Sign Up with Facebook</p>
          <p>Sign Up with Apple</p>
        </div>
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
