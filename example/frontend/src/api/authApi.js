import axiosInstance from "./axios";

const authApi = {
    login: (body) => axiosInstance.post("/auth/login", body),
    register: (body) => axiosInstance.post("/auth/register", body),
    getMe: () => axiosInstance.get("/auth/me"),
};

export default authApi;
