import React, { useState } from "react";
import "./Chat.css"; // import css
 
function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (text.trim() !== "") {
      setMessages([...messages, { sender: "You", text }]);
      setText("");
    }
  };

  return (
    <div className="chat-container">
      <h2 className="chat-title">💬 Team Chat</h2>

      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className="chat-message">
            <span className="chat-sender">{msg.sender}:</span> {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="chat-input"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="chat-button">
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
