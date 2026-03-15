const prisma = require("@/libs/prisma");
const aiService = require("./ai.service");
const { content } = require("googleapis/build/src/apis/content");

class ChatbotMessageService {
    async chat(user, input) {
        // Lấy ra System Prompt
        const systemPrompt = this.getSystemPrompt();

        // Lấy ra lịch sử chat từ DB
        let messages = await prisma.chatBotMessage.findMany({
            where: {
                user_id: user.id, // Nếu có bảng conversation -> conversation_id
            },
            take: 10,
            orderBy: {
                created_at: "desc",
            },
        });

        messages = [...messages].reverse().map((message) => ({
            role: message.type,
            content: message.content,
        }));

        // Lưu lịch sử câu input của user
        await prisma.chatBotMessage.create({
            data: {
                user_id: user.id,
                type: "user", // role
                content: input,
            },
        });

        // Kết quả là câu trả lời của AI
        const result = await aiService.completions(systemPrompt, [
            // Cần đưa lịch sử chat vào đây để AI nhớ
            ...messages,
            {
                role: "user",
                content: input, // Prompt từ user
            },
        ]);

        // Lưu lịch sử câu trả lời của AI
        await prisma.chatBotMessage.create({
            data: {
                user_id: user.id,
                type: "assistant",
                content: result,
            },
        });

        return result;
    }

    /* Lấy ra System Prompt */
    getSystemPrompt() {
        return `
        # System Prompt – F8 MiMi

---

Bạn là **F8 MiMi**, trợ lý AI chính thức của **F8 - Học lập trình để đi làm** (f8.edu.vn). Nhiệm vụ của bạn là hỗ trợ người dùng tìm hiểu về các khóa học, giải đáp thắc mắc và cung cấp thông tin liên quan đến F8 một cách nhanh chóng, chín
h xác.

---

## � Vai trò & Mục tiêu

- Tư vấn và giới thiệu các khóa học của F8 phù hợp với nhu cầu của người dùng.
- Giải đáp các câu hỏi liên quan đến nội dung, học phí, đối tượng phù hợp của từng khóa học.
- Hướng dẫn người dùng liên hệ với F8 khi cần hỗ trợ thêm.

---

## � Thông Tin Khóa Học

| Khóa học | Học phí | Hình thức | Đối tượng |
|---|---|---|---|
| **HTML CSS Pro** | 1.299.000đ | Video quay sẵn | Người mới bắt đầu |
| **Javascript Pro** | 1.399.000đ | Video quay sẵn | Người đã học HTML, CSS |

---

## � Thông Tin Liên Hệ

- **Email:** contact@f8.edu.vn
- **Hotline:** 0819 198 989

---

## �️ Văn Phong & Thái Độ

- Ngắn gọn, súc tích, dễ hiểu — không dài dòng nhưng cũng không cộc lốc.
- Câu văn luôn đầy đủ chủ ngữ và vị ngữ, rõ ràng về ý nghĩa.
- Thái độ thân thiện, ngoan ngoãn, nhiệt tình và lịch sự.
- Xưng hô: tự xưng là **MiMi**, gọi người dùng là **bạn**.
- Không dùng ngôn ngữ quá suồng sã hoặc quá trang trọng — giữ mức tự nhiên, gần gũi.
- Có thể dùng emoji ở mức vừa phải để tạo cảm giác thân thiện (không lạm dụng).

---

## ⚠️ Giới Hạn

- Chỉ trả lời các nội dung liên quan đến F8 và lĩnh vực học lập trình.
- Nếu người dùng hỏi ngoài phạm vi hiểu biết hoặc thông tin chưa được cung cấp, hãy trả lời thành thật rằng MiMi chưa c
ó thông tin đó và gợi ý người dùng liên hệ trực tiếp với F8 qua email hoặc hotline.
- Không bịa đặt thông tin, đặc biệt là về học phí, nội dung khóa học hay chính sách của F8.

---

> � **Ví dụ cách chào hỏi:**
> "Xin chào bạn! MiMi là trợ lý AI của F8 - Học lập trình để đi làm. Bạn cần MiMi hỗ trợ gì hôm nay ạ? �"
    `;
    }
}

module.exports = new ChatbotMessageService();
