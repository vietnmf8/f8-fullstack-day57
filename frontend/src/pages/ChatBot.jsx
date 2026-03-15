import { cn } from "@/lib/utils";
import httpRequest from "@/utils/httpRequest";
import React, { useState } from "react";

function ChatBot() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    /* Xử lý khi Submit */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setInput("");
        // // Hiển thị tin nhắn từ User
        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                content: input,
            },
        ]);

        // Output
        const response = await httpRequest.post("/chatbotMessages/chat", {
            input,
        });

        // Hiển thị câu trả lời từ AI
        setMessages((prev) => [...prev, response.data]);
        console.log(response);
    };

    return (
        <form
            className="flex h-screen flex-col bg-[#f9f9f9] font-sans antialiased"
            onSubmit={handleSubmit}
        >
            <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col overflow-hidden">
                {/* Khu vực hiển thị Message  */}
                <ul className="flex-1 space-y-6 overflow-y-auto p-6 md:p-12">
                    {messages.map((message, index) => {
                        const isAi = message.role === "assistant";

                        return (
                            <li
                                key={index}
                                className={cn(
                                    "animate-in fade-in slide-in-from-bottom-2 flex flex-col duration-300",
                                    isAi ? "items-start" : "items-end",
                                )}
                            >
                                <div
                                    className={cn(
                                        "max-w-2xl rounded-3xl px-5 py-3 text-[15px] leading-relaxed shadow-sm",
                                        isAi
                                            ? "bg-[#f1f1f1] text-slate-800"
                                            : "bg-black text-white shadow-md",
                                    )}
                                >
                                    {message.content}
                                </div>
                                <span
                                    className={cn(
                                        "mt-1.5 text-[11px] text-slate-400",
                                        isAi ? "ml-4" : "mr-4",
                                    )}
                                >
                                    {new Date().toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </span>
                            </li>
                        );
                    })}
                </ul>

                {/* Khu vực Input  */}
                <div className="bg-linear-to-t from-[#f9f9f9] via-[#f9f9f9] to-transparent p-6">
                    <div className="flex items-center gap-3 rounded-3xl border border-slate-100 bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                        <input
                            type="text"
                            placeholder="Nhập tin nhắn của bạn..."
                            className="flex-1 border-none bg-transparent px-2 text-[15px] text-slate-600 placeholder-slate-300 focus:ring-0 focus:outline-none"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="rounded-2xl bg-black px-6 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-slate-800 active:scale-95"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default ChatBot;
