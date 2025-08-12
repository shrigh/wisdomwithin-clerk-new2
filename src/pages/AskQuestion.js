import { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import "./AskQuestion.css";

export default function AskQuestion() {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (user) {
      fetch(`/api/chat-history?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.messages) {
            setMessages(data.messages);
          }
        })
        .catch((err) => console.error("Failed to load history:", err));
    }
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (time) => {
    const t = new Date(time);
    return t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const userMessage = { sender: "user", text: question, time: new Date() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setQuestion("");
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();

      const cleanHTML = DOMPurify.sanitize(data.answer || "I don't have an answer right now.");

      const aiMessage = {
        sender: "ai",
        text: cleanHTML,
        time: new Date(),
      };

      const finalMessages = [...updatedMessages, aiMessage];
      setMessages(finalMessages);

      if (user) {
        await fetch("/api/save-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, messages: finalMessages }),
        });
      }
    } catch (err) {
      console.error("Error generating response:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "<p>Something went wrong.</p>", time: new Date() },
      ]);
    }

    setLoading(false);
  };

  const requestMantra = () => {
    setQuestion("Can you share a mantra or prayer?");
  };

  const clearHistory = async () => {
    setMessages([]);
    if (user) {
      try {
        await fetch(`/api/clear-history`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id }),
        });
      } catch (err) {
        console.error("Failed to clear history:", err);
      }
    }
  };

  return (
    <main className="chat-container">
      <h2>Ask Your Question</h2>

      <div className="chat-window">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.sender}`}>
            <div className="chat-bubble">
              {msg.sender === "ai" ? (
                parse(msg.text)
              ) : (
                <p>{msg.text}</p>
              )}
              <span className="timestamp">{formatTime(msg.time)}</span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="chat-message ai">
            <div className="chat-bubble typing">
              <p>Typing...</p>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="chat-form">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={2}
          placeholder="What is troubling you?"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Thinking..." : "Send"}
        </button>
        <button type="button" onClick={requestMantra} className="mantra-button">
          🙏 Ask for Mantra
        </button>
        <button type="button" onClick={clearHistory} className="clear-button">
          🗑️ Clear History
        </button>
      </form>
    </main>
  );
}
