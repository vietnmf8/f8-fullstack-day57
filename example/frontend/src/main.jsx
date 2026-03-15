import { createRoot } from "react-dom/client.js";
import { AuthProvider } from "@/context/AuthContext";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <App />
    </AuthProvider>,
);
