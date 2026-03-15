import paths from "./configs/path";
import DefaultLayout from "./layouts/DefaultLayout";
import ChatBot from "./pages/ChatBot";
import Home from "./pages/Home";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";

const routes = [
    {
        layout: DefaultLayout,
        children: [
            { path: paths.home, component: Home },
            { path: paths.verifyEmail, component: VerifyEmail },
            { path: paths.login, component: Login },
            { path: paths.chatBot, component: ChatBot },
        ],
    },
];

export default routes;
