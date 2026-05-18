import { generateStoryScenario } from "./storyGenerator.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const story = await generateStoryScenario(req.body || {});
    return res.status(200).json({ story });
  } catch (err) {
    console.error("Story generation error:", err);
    return res.status(500).json({ error: err.message || "AI 劇情生成失敗" });
  }
}
