import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/config/routes";

function PrivateRoute({ children }) {
    const { user, isChecked } = useAuth();
    const location = useLocation();

    if (!isChecked) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="w-6 h-6 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!user) {
        return (
            <Navigate
                to={ROUTES.LOGIN}
                state={{ from: location.pathname }}
                replace
            />
        );
    }

    return children;
}

export default PrivateRoute;
