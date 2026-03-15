import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

function AuthInit({ children }) {
    const { initAuth } = useAuth();

    useEffect(() => {
        initAuth();
    }, [initAuth]);

    return children;
}

export default AuthInit;
