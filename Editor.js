import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import "./Editor.css";

function CodeEditor() {
  const [code, setCode] = useState("// Start coding here...");
  const [output, setOutput] = useState("");

  // Dynamic user list
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");

  const runCode = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(code);
      setOutput(String(result));
    } catch (err) {
      setOutput(err.message);
    }
  };

  const addUser = () => {
    if (newUser.trim() !== "") {
      setUsers([...users, newUser.trim()]);
      setNewUser("");
    }
  };

  return (
    <div className="editor-main-container">
      {/* Left: Editor */}
      <div className="editor-left">
        <h2 className="editor-title">👨‍💻 Real-Time Code Editor</h2>
        <div className="editor-box">
          <Editor
            height="60vh"
            defaultLanguage="javascript"
            defaultValue={code}
            theme="vs-dark"
            onChange={(value) => setCode(value)}
          />
        </div>
        <button className="run-button" onClick={runCode}>▶ Run Code</button>
        <div className="output-box">
          <h3>Output:</h3>
          <pre>{output}</pre>
        </div>
      </div>

      {/* Right: Add Users */}
      <div className="editor-right">
        <h3>👥 Add Users</h3>
        <div className="add-user-box">
          <input
            type="text"
            placeholder="Enter username..."
            value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
          />
          <button onClick={addUser}>Add User</button>
        </div>

        {users.length > 0 && (
          <ul className="user-list">
            {users.map((user, index) => (
              <li key={index}>
                <span className="user-avatar">{user[0]}</span> {user}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CodeEditor;
