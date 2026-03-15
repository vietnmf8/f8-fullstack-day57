const chatBotMessagesService = require("@/services/chatBotMessages.service");

const chat = async (req, res) => {
    const { input } = req.body;
    const user = req.auth.user;

    const result = await chatBotMessagesService.chat(user, input);
    res.success({
        role: "assistant",
        content: result,
    });
};

module.exports = { chat };
