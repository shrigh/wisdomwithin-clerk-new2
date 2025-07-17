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
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // ✅ This is key!
        messages: [
          {
            role: "system",
            content: "You are a spiritual guide rooted in Indian wisdom. Respond with clarity and compassion.",
          },
          {
            role: "user",
            content: question,
          },
        ],
      }),
    });

    if (!openaiRes.ok) {
      console.error("OpenAI error response:", await openaiRes.text());
      return res.status(500).json({ error: "OpenAI API error" });
    }

    const data = await openaiRes.json();
    const answer = data.choices?.[0]?.message?.content?.trim();
    res.status(200).json({ answer: answer || "No answer found." });

  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ error: "OpenAI request failed" });
  }
}
