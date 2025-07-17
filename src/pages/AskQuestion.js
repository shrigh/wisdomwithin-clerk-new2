import { useState } from "react";

export default function AskQuestion() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();

      if (data.answer) {
        setResponse(data.answer);
      } else {
        setResponse("No answer found.");
      }
    } catch (err) {
      console.error(err);
      setResponse("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <main style={{ maxWidth: 700, margin: "2rem auto", padding: "0 1rem" }}>
      <h2>Ask Your Question</h2>
      <p>Enter your question to get AI wisdom response.</p>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="What is troubling you?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={5}
          required
          style={{ width: "100%", padding: "1rem", fontSize: "1rem" }}
        />
        <button
          type="submit"
          style={{
            marginTop: "1rem",
            padding: "0.8rem 1.5rem",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          {loading ? "Thinking..." : "Submit"}
        </button>
      </form>

      {response && (
        <div
          style={{
            marginTop: "2rem",
            background: "#f0fff0",
            padding: "1rem",
            borderRadius: 6,
            border: "1px solid #aaffaa",
          }}
        >
          <strong>Answer:</strong>
          <p>{response}</p>
        </div>
      )}
    </main>
  );
}
