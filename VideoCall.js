import React from "react";
import "./VideoCall.css";

function VideoCall() {
  return (
    <div className="video-container">
      <h2 className="video-title">🎥 Live Video Call</h2>

      {/* Video Screen */}
      <div className="video-box">
        <p className="video-placeholder">[ Video Stream Placeholder ]</p>
      </div>

      {/* Buttons */}
      <div className="video-controls">
        <button className="btn join">✅ Join Call</button>
        <button className="btn leave">❌ Leave Call</button>
      </div>
    </div>
  );
}

export default VideoCall;
