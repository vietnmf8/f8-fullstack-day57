const { message } = require("@/libs/prisma");
const { generateText } = require("ai");
const OpenAI = require("openai");

const openaiClient = new OpenAI({
    apiKey: process.env.AI_GATEWAY_API_KEY,
    baseURL: "https://ai-gateway.vercel.sh/v1",
});

class AIService {
    // Gen ra Text
    async generateText(prompt, model = "anthropic/claude-haiku-4.5") {
        const { text } = await generateText({
            model,
            prompt,
        });

        return text;
    }

    // Phân quyền role:
    // user: người dùng | system: Prompt System | assistant: AI
    async completions(systemPrompt, messages = []) {
        const response = await openaiClient.chat.completions.create({
            model: "anthropic/claude-haiku-4.5",
            // Công thức Input thực tế: System Prompt + History + New Message
            messages: [
                {
                    role: "system",
                    content: systemPrompt,
                },

                ...messages,
            ],
        });

        return response.choices[0].message.content;
    }
}

module.exports = new AIService();
