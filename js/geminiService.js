// geminiService.js

export const GeminiService = {
    formatMarkdown(text) {
        if (!text) return "";
        let formatted = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
        formatted = formatted.replace(/\n/g, '<br>');
        return formatted;
    },

    async call({ systemPrompt, userMessage, chatHistory, onLoading, onSuccess, onError }) {
        if (onLoading) onLoading(true);

        try {
            // 🌟 自動判斷：如果你是用 WebStorm 預覽 (63342)，就把請求轉發給後端 (3001)
            // 如果你未來部署到 Vercel，它會自動變成相對路徑，無縫接軌！
            const isWebStormPreview = window.location.port === '63342';
            const apiBaseUrl = isWebStormPreview ? 'http://localhost:3001' : '';
            const fetchUrl = `${apiBaseUrl}/api/chat`;

            const response = await fetch(fetchUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ systemPrompt, userMessage, chatHistory })
            });

            // 🌟 前端專用的錯誤攔截：如果 HTTP 狀態碼不是 200 系列
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `伺服器錯誤: ${response.status}`);
            }

            const data = await response.json();
            if (onLoading) onLoading(false);

            if (data.error) {
                if (onError) onError(data.error);
                return;
            }

            if (data.text) {
                const formattedText = this.formatMarkdown(data.text);
                if (onSuccess) onSuccess(formattedText, data.text);
            }
        } catch (err) {
            console.error("前端呼叫 API 發生異常:", err);
            if (onLoading) onLoading(false);
            if (onError) onError(err.message || "連線失敗！請確認你是否已在終端機啟動後端 API (node api/index.js)");
        }
    }
};