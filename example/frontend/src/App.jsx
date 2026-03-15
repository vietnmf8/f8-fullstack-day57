import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthInit, PrivateRoute } from "@/components";
import Chat from "@/pages/Chat";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { ROUTES } from "@/config/routes";

function App() {
    return (
        <BrowserRouter>
            <AuthInit>
                <Routes>
                    <Route
                        path={ROUTES.HOME}
                        element={
                            <PrivateRoute>
                                <Chat />
                            </PrivateRoute>
                        }
                    />
                    <Route path={ROUTES.LOGIN} element={<Login />} />
                    <Route path={ROUTES.REGISTER} element={<Register />} />
                    <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
                </Routes>
            </AuthInit>
        </BrowserRouter>
    );
}

export default App;
