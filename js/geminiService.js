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
            // 🌟 呼叫自己的 Vercel Serverless Function
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ systemPrompt, userMessage, chatHistory })
            });

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
            if (onLoading) onLoading(false);
            if (onError) onError("連線至代理伺服器失敗");
        }
    }
};