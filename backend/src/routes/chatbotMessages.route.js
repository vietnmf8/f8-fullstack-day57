const express = require("express");
const router = express.Router();
const authRequired = require("@/middlewares/authRequired");
const chatBotMessageController = require("@/controllers/chatBotMessage.controller");

//todo: Tất cả các routes về hội thoại đều cần đăng nhập
router.use(authRequired);

/* Tạo mới cuộc hội thoại */
router.post("/chat", chatBotMessageController.chat);

module.exports = router;
