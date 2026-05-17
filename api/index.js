import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

dotenv.config();

const app = express();

// 開發時允許 WebStorm preview 的 origin
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:63342',
  'http://127.0.0.1:63342'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('CORS not allowed'), false);
  }
}));

app.use(express.json());

// 測試用健康檢查路由
app.get('/api/health', (req, res) => res.json({ ok: true, status: "伺服器運行中" }));

// 聊天路由
app.post('/api/chat', async (req, res) => {
  const token = process.env.GITHUB_TOKEN;
  const endpoint = process.env.GITHUB_MODELS_BASE_URL || "https://models.github.ai/inference";

  if (!token) {
    return res.status(500).json({ error: '伺服器未設定 GITHUB_TOKEN' });
  }

  const { systemPrompt, userMessage, chatHistory } = req.body || {};
  const messages = [];

  if (systemPrompt) messages.push({ role: 'system', content: systemPrompt });
  if (Array.isArray(chatHistory)) {
    chatHistory.forEach(m => {
      messages.push({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.text });
    });
  }
  messages.push({ role: 'user', content: userMessage || '你好，我完成畫作了。' });

  try {
    // 使用正確的微軟 SDK 呼叫方式
    const client = ModelClient(endpoint, new AzureKeyCredential(token));
    const response = await client.path("/chat/completions").post({
      body: {
        messages: messages,
        model: "openai/gpt-4o-mini", // 🚀 先用保證能過的模型測試
        max_tokens: 500,
        temperature: 0.7
      }
    });

    if (isUnexpected(response)) {
      throw new Error(response.body.error?.message || "模型呼叫失敗");
    }

    const aiText = response.body.choices[0].message.content;
    return res.json({ text: aiText });
  } catch (err) {
    console.error('API 錯誤:', err);
    return res.status(500).json({ error: 'AI 伺服器錯誤' });
  }
});

// 啟動伺服器
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 API 伺服器已啟動: http://localhost:${PORT}`));