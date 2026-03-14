// api/chat.js
export default async function handler(req, res) {
    // 1. 只允許 POST 請求
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // 2. 從 Vercel 後台抓取環境變數
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: '伺服器未設定 API KEY' });
    }

    const { systemPrompt, userMessage, chatHistory } = req.body;

    // 3. 建立 Gemini 要求的資料結構
    const contents = [
        { role: "user", parts: [{ text: systemPrompt }] }
    ];

    if (chatHistory && Array.isArray(chatHistory)) {
        chatHistory.forEach(m => {
            contents.push({
                role: m.role === 'ai' ? 'model' : 'user',
                parts: [{ text: m.text }]
            });
        });
    }

    const finalUserText = userMessage || "你好，我完成畫作了。";
    contents.push({ role: "user", parts: [{ text: finalUserText }] });

    try {
        const apiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const response = await fetch(apiURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: contents })
        });

        const data = await response.json();

        if (data.error) {
            return res.status(500).json({ error: data.error.message });
        }

        // 4. 只回傳必要的文字給前端，確保安全
        if (data.candidates && data.candidates[0].content) {
            const aiText = data.candidates[0].content.parts[0].text;
            return res.status(200).json({ text: aiText });
        } else {
            return res.status(500).json({ error: "AI 未能生成回應" });
        }
    } catch (err) {
        return res.status(500).json({ error: "代理伺服器連線異常" });
    }
}