// api/chat.js
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

export default async function handler(req, res) {
    // 1. 只允許 POST
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    // 2. 讀取 GitHub Models 的環境變數
    const token = process.env.GITHUB_TOKEN;
    const endpoint = process.env.GITHUB_MODELS_BASE_URL || "https://models.github.ai/inference";

    if (!token) {
        return res.status(500).json({ error: "伺服器未設定 GITHUB_TOKEN" });
    }

    const { systemPrompt, userMessage, chatHistory } = req.body || {};

    // 3. 組成 AI 所需的 messages 陣列
    const messages = [];

    if (systemPrompt) {
        messages.push({
            role: "system",
            content: systemPrompt
        });
    }

    if (chatHistory && Array.isArray(chatHistory)) {
        chatHistory.forEach(m => {
            messages.push({
                role: m.role === "ai" ? "assistant" : "user",
                content: m.text
            });
        });
    }

    const finalUserText = userMessage || "你好，我完成畫作了。";
    messages.push({
        role: "user",
        content: finalUserText
    });

    try {
        // 4. 使用微軟 Inference SDK 建立連線客戶端
        const client = ModelClient(endpoint, new AzureKeyCredential(token));

        // 5. 呼叫 API
        const response = await client.path("/chat/completions").post({
            body: {
                messages: messages,
                // ⚠️ 強烈建議：測試階段請先用 openai/gpt-4o-mini 確保資料流通。
                // 確定一切正常後，若你的帳號有授權，再去挑戰換成 openai/gpt-5-mini
                model: "openai/gpt-5-mini",
                max_tokens: 500,
                temperature: 0.7
            }
        });

        // 6. 檢查 API 是否回傳預期外的錯誤 (直接回傳給前端，不再觸發 throw 警告)
        if (isUnexpected(response)) {
            console.error("模型端發生錯誤:", response.body.error);
            return res.status(500).json({
                error: response.body.error?.message || "模型呼叫失敗，請確認 Token 權限或模型名稱"
            });
        }

        // 7. 正確解析微軟 SDK 的回傳結構
        const aiText = response.body.choices[0].message.content;

        if (aiText) {
            return res.status(200).json({ text: aiText });
        } else {
            return res.status(500).json({ error: "AI 未能生成回應" });
        }
    } catch (err) {
        console.error("伺服器內部或連線異常:", err);
        return res.status(500).json({ error: "代理伺服器連線異常" });
    }
}