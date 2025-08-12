// /api/generate.js gpt-4.1

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Missing question" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1",
        messages: [
          { role: "system", content: "You are a wise spiritual guide rooted in Hindu scriptures. Please respond only with clean, well-formed HTML using tags like <h2>, <p>, <ul>, <li>, <strong>, etc. Do NOT include markdown, code blocks, or any script sanitizers. The HTML will be rendered directly in a web app." },
          { role: "user", content: question },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI error response:", data);
      return res.status(500).json({ error: data.error.message || "OpenAI API error" });
    }

    const answer = data.choices[0].message.content;
    return res.status(200).json({ answer });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Something went wrong." });
  }
}
