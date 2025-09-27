import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Chat from "./Chat";
import VideoCall from "./VideoCall";
import Editor from "./Editor";
import Projects from "./Projects";
import VersionControl from "./VersionControl";
import CodeExecution from "./CodeExecution";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/video" element={<VideoCall />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/versions" element={<VersionControl />} />
        <Route path="/code-execution" element={<CodeExecution />} />
      </Routes>
    </Router>
  );
}

export default App;
