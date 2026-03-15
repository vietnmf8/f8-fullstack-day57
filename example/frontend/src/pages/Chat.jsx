import { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import { ChatHeader, ChatMessage, ChatInput } from "@/components";
import { chatbotApi } from "@/api";

const PAGE_SIZE = 20;

function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isReplying, setIsReplying] = useState(false);
    const [isFetchingHistory, setIsFetchingHistory] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [cursor, setCursor] = useState(null);

    const containerRef = useRef(null);
    const bottomRef = useRef(null);

    // When true: scroll to bottom after next render
    const shouldScrollBottomRef = useRef(false);
    // When true: use "instant" instead of "smooth" (e.g. initial load)
    const scrollInstantRef = useRef(false);
    // When true: restore scroll position after prepending old messages
    const isPrependingRef = useRef(false);
    // Saved scrollHeight before prepend, used to calculate new scrollTop
    const savedScrollHeightRef = useRef(0);

    // ─── Scroll restoration after prepending (runs before browser paints) ───
    useLayoutEffect(() => {
        if (!isPrependingRef.current || !containerRef.current) return;
        containerRef.current.scrollTop =
            containerRef.current.scrollHeight - savedScrollHeightRef.current;
        isPrependingRef.current = false;
    }, [messages]);

    // ─── Scroll to bottom after new message or typing indicator ─────────────
    useEffect(() => {
        if (isPrependingRef.current) return;
        if (!shouldScrollBottomRef.current) return;
        bottomRef.current?.scrollIntoView({
            behavior: scrollInstantRef.current ? "instant" : "smooth",
        });
        shouldScrollBottomRef.current = false;
        scrollInstantRef.current = false;
    }, [messages, isReplying]);

    // ─── Load initial messages on mount ──────────────────────────────────────
    useEffect(() => {
        const load = async () => {
            setIsFetchingHistory(true);
            try {
                const res = await chatbotApi.getMessages({ limit: PAGE_SIZE });
                const { messages: data, hasMore: more, cursor: nextCursor } = res.data;
                shouldScrollBottomRef.current = true;
                scrollInstantRef.current = true;
                setMessages(data);
                setHasMore(more);
                setCursor(nextCursor);
            } catch (err) {
                console.error("Failed to load messages:", err);
            } finally {
                setIsFetchingHistory(false);
            }
        };
        load();
    }, []);

    // ─── Load older messages (cursor pagination) ─────────────────────────────
    const loadMore = useCallback(async () => {
        if (!hasMore || isFetchingHistory || !cursor) return;

        const container = containerRef.current;
        if (!container) return;

        savedScrollHeightRef.current = container.scrollHeight;
        isPrependingRef.current = true;
        setIsFetchingHistory(true);

        try {
            const res = await chatbotApi.getMessages({ before: cursor, limit: PAGE_SIZE });
            const { messages: older, hasMore: more, cursor: nextCursor } = res.data;
            setMessages((prev) => [...older, ...prev]);
            setHasMore(more);
            setCursor(nextCursor);
        } catch (err) {
            console.error("Failed to load more:", err);
            isPrependingRef.current = false;
        } finally {
            setIsFetchingHistory(false);
        }
    }, [hasMore, isFetchingHistory, cursor]);

    // ─── Trigger loadMore when scrolled near top ──────────────────────────────
    const handleScroll = useCallback(() => {
        if (!containerRef.current) return;
        if (containerRef.current.scrollTop < 80) {
            loadMore();
        }
    }, [loadMore]);

    // ─── Send message ─────────────────────────────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isReplying) return;

        const userMessage = { role: "user", content: input.trim(), id: crypto.randomUUID() };
        shouldScrollBottomRef.current = true;
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsReplying(true);

        try {
            const res = await chatbotApi.chat(userMessage.content);
            shouldScrollBottomRef.current = true;
            setMessages((prev) => [...prev, { ...res.data, id: res.data.id ?? crypto.randomUUID() }]);
        } catch {
            shouldScrollBottomRef.current = true;
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau!", id: crypto.randomUUID() },
            ]);
        } finally {
            setIsReplying(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <ChatHeader />

            <main
                ref={containerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto"
            >
                <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
                    {/* Loading spinner for initial load */}
                    {isFetchingHistory && messages.length === 0 && (
                        <div className="flex justify-center py-12">
                            <div className="w-6 h-6 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}

                    {/* "Load more" indicator at top */}
                    {isFetchingHistory && messages.length > 0 && (
                        <div className="flex justify-center py-2">
                            <div className="w-4 h-4 border-2 border-orange-300 border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}

                    {/* Empty state */}
                    {!isFetchingHistory && messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-2xl font-bold select-none">
                                M
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">Xin chào! Mình là F8 Mimi</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Hỏi mình về khóa học, lộ trình học hoặc bất cứ điều gì về lập trình nhé!
                                </p>
                            </div>
                        </div>
                    )}

                    {messages.map((message) => (
                        <ChatMessage key={message.id} message={message} />
                    ))}

                    {isReplying && <ChatMessage isLoading />}

                    <div ref={bottomRef} />
                </div>
            </main>

            <ChatInput
                input={input}
                onChange={(e) => setInput(e.target.value)}
                onSubmit={handleSubmit}
                isLoading={isReplying}
            />
        </div>
    );
}

export default Chat;
