import { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import "./AskQuestion.css";

export default function AskQuestion() {
  const { user } = useUser(); // Clerk user object
  const [messages, setMessages] = useState([]); // Chat messages
  const [question, setQuestion] = useState(""); // User input
  const [loading, setLoading] = useState(false); // Loading state
  const chatEndRef = useRef(null); // For auto scroll

  // Scroll to bottom whenever new messages are added
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Load chat history from backend on mount (if user is logged in)
  useEffect(() => {
    if (user) {
      fetch(`/api/chat-history?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.messages) {
            setMessages(data.messages);
          }
        })
        .catch((err) => console.error("Failed to load history:", err));
    }
  }, [user]);

  // Format timestamp for chat display
  const formatTime = (time) => {
    const t = new Date(time);
    return t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Send question and receive AI response
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
      const aiMessage = {
        sender: "ai",
        text: data.answer || "I don't have an answer right now.",
        time: new Date(),
      };

      const finalMessages = [...updatedMessages, aiMessage];
      setMessages(finalMessages);

      // Save chat to backend if user is logged in
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
        { sender: "ai", text: "Something went wrong.", time: new Date() },
      ]);
    }

    setLoading(false);
  };

  // Set default mantra message
  const requestMantra = () => {
    setQuestion("Can you share a mantra or prayer?");
  };

  // Clear chat history (frontend + backend)
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
              <p>{msg.text}</p>
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
          {loading ? "..." : "Send"}
        </button>
        <button
          type="button"
          onClick={requestMantra}
          className="mantra-button"
        >
          🙏 Ask for Mantra
        </button>
        <button
          type="button"
          onClick={clearHistory}
          className="clear-button"
        >
          🗑️ Clear History
        </button>
      </form>
    </main>
  );
}
