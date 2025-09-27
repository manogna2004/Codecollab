import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white p-4 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold">CodeCollab 🚀</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-yellow-300">Home</Link>
        <Link to="/chat" className="hover:text-yellow-300">Chat</Link>
        <Link to="/video" className="hover:text-yellow-300">Video Call</Link>
        <Link to="/editor" className="hover:text-yellow-300">Editor</Link>
        <Link to="/projects" className="hover:text-yellow-300">Projects</Link>
        <Link to="/versions" className="hover:text-yellow-300">Version Control</Link>
      </div>
    </nav>
  );
}

export default Navbar;
