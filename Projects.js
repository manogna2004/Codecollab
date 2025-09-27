import React, { useState } from "react";
import "./Project.css";

function Projects() {
  const [createRoom, setCreateRoom] = useState("");
  const [joinRoom, setJoinRoom] = useState("");

  const handleCreateRoom = () => {
    if (createRoom.trim() !== "") {
      alert(`Room "${createRoom}" created!`);
      setCreateRoom("");
    }
  };

  const handleJoinRoom = () => {
    if (joinRoom.trim() !== "") {
      alert(`Joined room "${joinRoom}"!`);
      setJoinRoom("");
    }
  };

  return (
    <div className="projects-container">
      <h2 className="projects-title">📂 Projects</h2>
      <p className="projects-description">
        Create a new room or join an existing workspace.
      </p>

      <div className="projects-grid">
        {/* Create Room */}
        <div className="project-card create">
          <h3>Create a Room</h3>
          <input
            type="text"
            placeholder="Room Name"
            value={createRoom}
            onChange={(e) => setCreateRoom(e.target.value)}
          />
          <button onClick={handleCreateRoom}>Create</button>
        </div>

        {/* Join Room */}
        <div className="project-card join">
          <h3>Join a Room</h3>
          <input
            type="text"
            placeholder="Room ID"
            value={joinRoom}
            onChange={(e) => setJoinRoom(e.target.value)}
          />
          <button onClick={handleJoinRoom}>Join</button>
        </div>
      </div>
    </div>
  );
}

export default Projects;
