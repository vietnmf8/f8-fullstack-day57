import httpRequest from "@/utils/httpRequest";
import { MessageCircle, UserPlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Home() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    /* Lấy danh sách User */
    useEffect(() => {
        const getUsers = async () => {
            const users = await httpRequest.get("/users");
            setUsers(users);
        };
        getUsers();
    }, []);

    /* Chỉ điều hướng, không tạo conversation ngay lập tức */
    const handleStartChat = (targetUserId) => {
        // Chuyển sang trang soạn tin nhắn mới mà chưa lưu vào DB
        navigate(`/new-chat?userId=${targetUserId}`);
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="mx-auto max-w-4xl">
                <header className="mb-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                            People
                        </h1>
                        <p className="mt-1 text-slate-500">
                            Tìm kiếm và bắt đầu trò chuyện với mọi người.
                        </p>
                    </div>
                    <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700">
                        <UserPlus size={20} /> Invite Friend
                    </button>
                </header>

                <div className="grid gap-4 sm:grid-cols-2">
                    {users.data?.map((user) => (
                        <div
                            key={user.id}
                            onClick={() => handleStartChat(user.id)}
                            className="group flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-blue-400 hover:shadow-md"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-colors group-hover:bg-blue-50 group-hover:text-blue-500">
                                    <MessageCircle size={24} />
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate font-bold text-slate-900">
                                        {user.name || "User " + user.id}
                                    </p>
                                    <p className="truncate text-sm text-slate-500">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                            <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                                CHAT
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
