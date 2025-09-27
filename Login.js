import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Import the separate CSS file
import './Login.css';

// --- Configuration ---
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000'; 

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- Core Authentication Logic ---
  const handleAuth = async (endpoint, data) => {
    setLoading(true);
    setMessage({ text: "", type: "" });
    
    const apiPath = `${BACKEND_URL}/api/auth/${endpoint}`;

    try {
      const response = await fetch(apiPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // Handle server responses where status is not 2xx
      if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: `HTTP Error: ${response.status} ${response.statusText}` }));
          throw new Error(errorData.message || `Authentication failed with status ${response.status}.`);
      }
      
      // Handle success
      const successData = await response.json();
      
      if (successData.token) {
        setMessage({ text: successData.message || "Success! Redirecting to home...", type: "success" });
        localStorage.setItem("authToken", successData.token);
        
        setTimeout(() => {
          navigate("/home");
        }, 800);
      } else {
        throw new Error(successData.message || `Authentication failed, no token received.`);
      }

    } catch (error) {
      console.error('Authentication Error:', error);
      
      let errorMsg;
      if (error.message.includes('Failed to fetch')) {
          errorMsg = `Connection Error: Cannot reach backend server. Please ensure your Node.js server is running on ${BACKEND_URL} and that CORS is configured for port 3001.`;
      } else {
          errorMsg = error.message;
      }
      
      setMessage({ text: errorMsg, type: "error" });

    } finally {
      setLoading(false);
    }
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      handleAuth('register', { fullName: formData.fullName, email: formData.email, password: formData.password });
    } else {
      handleAuth('login', { email: formData.email, password: formData.password });
    }
  };

  // --- UI Component for Messages (Retaining Tailwind classes for this specific element) ---
  const Message = ({ msg, type }) => (
    <div 
      // Using Tailwind for alert/message styling
      className={`p-3 rounded-xl shadow-md text-sm mb-4 transition-opacity duration-300 border-l-8
        ${type === 'error' ? 'bg-red-100 text-red-700 border-red-500' : 'bg-green-100 text-green-700 border-green-500'
      }`}
    >
      {msg}
    </div>
  );

  return (
    <div className="login-container">
      
      {/* Left Side: Animated Brand and Tagline (Hidden on mobile by CSS) */}
      <div className="login-left">
        <h1 className="brand-title">🚀 CodeCollab</h1>
        <p className="brand-tagline">
          Collaborate. Code. Connect. <br /> Real-time teamwork made simple.
        </p>
      </div>

      {/* Right Side: Form */}
      <div className="login-right">
        <h2 className="form-title">
          {isRegister ? "Create an Account" : "Welcome Back"}
        </h2>
        
        {message.text && <Message msg={message.text} type={message.type} />}

        <form onSubmit={handleSubmit} className="login-form">
          
          {isRegister && (
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              required
              className="form-input"
              value={formData.fullName}
              onChange={handleInputChange}
              disabled={loading}
            />
          )}
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="form-input"
            value={formData.email}
            onChange={handleInputChange}
            disabled={loading}
          />
          
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="form-input"
            value={formData.password}
            onChange={handleInputChange}
            disabled={loading}
          />
          
          <button 
            type="submit" 
            className={`form-button flex items-center justify-center 
              ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              isRegister ? "Register Account" : "Login to Workspace"
            )}
          </button>

        </form>
        
        <p className="toggle-text">
          {isRegister ? "Already have an account?" : "Don’t have an account?"}{" "}
          <span 
            onClick={() => setIsRegister(!isRegister)} 
            className="toggle-link"
          >
            {isRegister ? "Login here" : "Register now"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
