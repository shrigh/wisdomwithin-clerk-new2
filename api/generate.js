// /api/generate.js
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
        model: "gpt-4.1", // or gpt-4o-mini for cheaper
        messages: [
          {
            role: "system",
            content:
              "You are a wise spiritual guide rooted in Hindu scriptures. Respond with clean HTML using <h2>, <p>, <ul>. No markdown or code blocks. Do not suggest or ask the user any follow-up questions."
          },
          {
            role: "user",
            content: question,
          },
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ OpenAI API error:", data);
      return res.status(500).json({ error: data.error?.message || "OpenAI API error" });
    }

    const answer = data.choices?.[0]?.message?.content || null;

    if (!answer) {
      console.error("⚠️ No answer from OpenAI:", data);
      return res.status(500).json({ error: "No answer generated" });
    }

    return res.status(200).json({ answer });
  } catch (error) {
    console.error("❌ Server error:", error);
    return res.status(500).json({ error: "Something went wrong on the server" });
  }
}
