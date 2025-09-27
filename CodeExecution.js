import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import "./CodeExecution.css";

function CodeExecution() {
  const [code, setCode] = useState("// Write your code here...");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");

  const runCode = () => {
    if (language === "javascript") {
      try {
        // eslint-disable-next-line no-eval
        const result = eval(code);
        setOutput(String(result));
      } catch (err) {
        setOutput(err.message);
      }
    } else {
      setOutput(`Execution for ${language} is not supported in-browser.`);
    }
  };

  return (
    <div className="codeexec-container">
      <h2>⚡ Code Execution</h2>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="cpp">C++</option>
        <option value="c">C</option>
      </select>
      <Editor
        height="50vh"
        language={language === "javascript" ? "javascript" : "plaintext"}
        value={code}
        theme="vs-dark"
        onChange={(val) => setCode(val)}
      />
      <button onClick={runCode}>▶ Run Code</button>
      <div className="output-box">
        <pre>{output}</pre>
      </div>
    </div>
  );
}

export default CodeExecution;
