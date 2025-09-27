import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h2 className="home-title">
          🚀 Welcome to <span className="highlight">CodeCollab</span>
        </h2>
        <p className="home-description">
          Imagine <span className="bold">Google Docs, but for code</span>.  
          Collaborate with your team in real-time, chat instantly, jump on a video call, 
          manage projects, track versions, and even run code in a sandbox – 
          all in one <span className="highlight-blue">colorful</span>, 
          <span className="highlight-pink"> user-friendly</span> platform.
        </p>

        {/* Features Grid */}
        <div className="features-grid">
          <div className="feature-card pink" onClick={() => navigate("/chat")}>
            💬 Integrated Chat
          </div>
          <div className="feature-card green" onClick={() => navigate("/video")}>
            🎥 Video Calls
          </div>
          <div className="feature-card yellow" onClick={() => navigate("/editor")}>
            👨‍💻 Real-Time Editor
          </div>
          <div className="feature-card blue" onClick={() => navigate("/projects")}>
            📂 Project Management
          </div>
          <div className="feature-card purple" onClick={() => navigate("/versions")}>
            🕒 Version Control
          </div>
          <div className="feature-card orange">
            ⚡ Code Execution
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
