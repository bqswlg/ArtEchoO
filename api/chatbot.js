const { OpenAI } = require("openai");
const fs = require("fs");

// 1. 初始化 Client
const client = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: "你的_GITHUB_TOKEN"
});

// 2. 將圖片轉為 Base64 (Node.js 寫法)
const imagePath = "user_artwork.jpg";
const base64Image = fs.readFileSync(imagePath, { encoding: 'base64' });

async function main() {
  const response = await client.chat.completions.create({
    model: "gpt-5-mini",
    messages: [
      {
        role: "system",
        content: "你是一位具備同理心的藝術治療引導者。"
      },
      {
        role: "user",
        content: [
          { type: "text", text: "這是我的作品，我感覺有點憂鬱。" },
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${base64Image}`
            }
          }
        ]
      }
    ],
    max_tokens: 500
  });

  console.log(response.choices[0].message.content);
}

main();