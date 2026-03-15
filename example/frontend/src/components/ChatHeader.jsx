import { useAuth } from "@/hooks/useAuth";

const ChatHeader = () => {
    const { user, logout } = useAuth();

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
            <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
                <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm select-none">
                        M
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
                </div>

                <div className="min-w-0">
                    <h1 className="font-semibold text-gray-900 text-sm leading-tight">
                        F8 Mimi
                    </h1>
                    <p className="text-xs text-green-500">Đang hoạt động</p>
                </div>

                <div className="ml-auto flex items-center gap-3">
                    {user && (
                        <span className="hidden sm:block text-xs text-gray-400 truncate max-w-[160px]">
                            {user.email}
                        </span>
                    )}
                    {user ? (
                        <button
                            onClick={logout}
                            className="text-xs text-gray-500 hover:text-red-500 transition-colors px-2 py-1 rounded-lg hover:bg-red-50"
                        >
                            Đăng xuất
                        </button>
                    ) : (
                        <a
                            href="https://f8.edu.vn"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gray-400 hover:text-orange-500 transition-colors whitespace-nowrap"
                        >
                            f8.edu.vn ↗
                        </a>
                    )}
                </div>
            </div>
        </header>
    );
};

export default ChatHeader;
