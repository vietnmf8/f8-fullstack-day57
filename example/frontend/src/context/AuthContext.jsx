import { createContext, useState, useCallback } from "react";
import { authApi } from "@/api";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    // false = still checking token on mount, true = done checking
    const [isChecked, setIsChecked] = useState(false);

    // Called once on app mount by AuthInit
    const initAuth = useCallback(async () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            setIsChecked(true);
            return;
        }
        try {
            const res = await authApi.getMe();
            setUser(res.data);
        } catch {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
        } finally {
            setIsChecked(true);
        }
    }, []);

    const login = useCallback(async (email, password) => {
        const res = await authApi.login({ email, password });
        const { access_token, refresh_token } = res.data;
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        const meRes = await authApi.getMe();
        setUser(meRes.data);
        return meRes.data;
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    }, []);

    return (
        <AuthContext.Provider value={{ user, isChecked, initAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
