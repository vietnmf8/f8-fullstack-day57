import axiosInstance from "./axios";

const chatbotApi = {
    getMessages: (params) => axiosInstance.get("/chatbotMessages", { params }),
    chat: (input) => axiosInstance.post("/chatbotMessages/chat", { input }),
};

export default chatbotApi;
