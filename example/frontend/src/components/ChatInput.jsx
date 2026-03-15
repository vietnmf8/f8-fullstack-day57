const SendIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
    >
        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
);

const ChatInput = ({ input, onChange, onSubmit, isLoading }) => {
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSubmit(e);
        }
    };

    const canSubmit = input.trim() && !isLoading;

    return (
        <div className="bg-white border-t border-gray-200 sticky bottom-0">
            <div className="max-w-3xl mx-auto px-4 py-3">
                <form onSubmit={onSubmit} className="flex items-end gap-2">
                    <textarea
                        value={input}
                        onChange={onChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Nhập tin nhắn..."
                        disabled={isLoading}
                        rows={1}
                        maxLength={4000}
                        className="flex-1 resize-none rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent disabled:opacity-60 transition-all overflow-y-auto"
                        style={{ maxHeight: "128px" }}
                    />
                    <button
                        type="submit"
                        disabled={!canSubmit}
                        className="flex-shrink-0 w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1"
                        aria-label="Gửi tin nhắn"
                    >
                        <SendIcon />
                    </button>
                </form>
                <p className="text-center text-xs text-gray-400 mt-2 hidden sm:block">
                    Nhấn{" "}
                    <kbd className="px-1 py-0.5 bg-gray-100 border border-gray-200 rounded text-xs">
                        Enter
                    </kbd>{" "}
                    để gửi &nbsp;·&nbsp;{" "}
                    <kbd className="px-1 py-0.5 bg-gray-100 border border-gray-200 rounded text-xs">
                        Shift + Enter
                    </kbd>{" "}
                    để xuống dòng
                </p>
            </div>
        </div>
    );
};

export default ChatInput;
