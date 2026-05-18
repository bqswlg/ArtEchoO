import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const token = process.env.GITHUB_TOKEN;
  const endpoint = process.env.GITHUB_MODELS_BASE_URL || "https://models.github.ai/inference";

  if (!token) {
    return res.status(500).json({ error: "缺少 GITHUB_TOKEN" });
  }

  const { systemPrompt, userMessage, chatHistory } = req.body || {};
  const messages = [];

  if (systemPrompt) {
    messages.push({ role: "system", content: systemPrompt });
  }

  if (Array.isArray(chatHistory)) {
    chatHistory.forEach(message => {
      messages.push({
        role: message.role === "ai" ? "assistant" : "user",
        content: message.text || message.content || ""
      });
    });
  }

  messages.push({
    role: "user",
    content: userMessage || "請給我一段簡短回應。"
  });

  try {
    const client = ModelClient(endpoint, new AzureKeyCredential(token));
    const response = await client.path("/chat/completions").post({
      body: {
        messages,
        model: process.env.CHAT_MODEL || "openai/gpt-4o-mini",
        max_tokens: 500,
        temperature: 0.7
      }
    });

    if (isUnexpected(response)) {
      return res.status(500).json({
        error: response.body.error?.message || "AI 未能生成回應"
      });
    }

    return res.status(200).json({
      text: response.body.choices?.[0]?.message?.content || ""
    });
  } catch (err) {
    console.error("Chatbot API error:", err);
    return res.status(500).json({ error: err.message || "AI 伺服器錯誤" });
  }
}
