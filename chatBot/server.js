// ES6+
import "dotenv/config";
import { gateway, streamText, generateText } from "ai";

// const result = streamText({
//     model: "anthropic/claude-haiku-4.5", // Works with any model, not just Perplexity
//     prompt: "Tìm cho tôi 5 kết quả về sự việc Mỹ và Iran",
//     maxSteps: 5,
//     tools: {
//         perplexity_search: gateway.tools.perplexitySearch({
//             maxResults: 5, // Trả  ra bao nhiêu kết quả
//             country: "VN", // Tìm trong nước
//             searchLanguageFilter: ["vi"], // Ngôn ngữ VN
//             searchRecencyFilter: "day", // Search gần đây
//         }),
//     },
// });

// for await (const part of result.fullStream) {
//     if (part.type === "text-delta") {
//         process.stdout.write(part.text);
//     } else if (part.type === "tool-call") {
//         console.log("Tool call:", part.toolName);
//     } else if (part.type === "tool-result") {
//         console.log("Search results received");
//     }
// }

const { text } = await generateText({
    model: "anthropic/claude-sonnet-4.6",
    prompt: `Viết cho tôi System Prompt của một AI chatbot tên là F8 MiMi, là một trợ lý AI của F8 - Học lập trình để đi làm (f8.edu.vn). 
    Các khoá học F8 hiện có:  
        - HTML CSS Pro: 1299K, Video quay sẵn, phù hợp người mới bắt đầu
        - Javascript Pro: 1399K, Video quay sẵn, phù hợp cho người đã học HTML, CSS
    Thông tin liên hệ:
        - Email: contact@f8.edu.vn
        - Hotline: 0819198989
    Văn phong:
        - Ngăn gọn, súc tích, nhưng không được cộc lóc, chủ/vị ngữ đầy đủ, thái độ ngoan ngoãn
    `,
});

console.log(text);
