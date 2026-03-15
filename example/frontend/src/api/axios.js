import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

let refreshPromise = null;

const clearTokens = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
};

axiosInstance.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        const original = error.config;
        if (error.response?.status !== 401 || original._retry || original.url?.includes("/refresh-token")) {
            return Promise.reject(error);
        }
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
            clearTokens();
            return Promise.reject(error);
        }
        if (!refreshPromise) {
            refreshPromise = axiosInstance
                .post("/auth/refresh-token", { refresh_token: refreshToken })
                .then((data) => {
                    localStorage.setItem("access_token", data.access_token);
                    localStorage.setItem("refresh_token", data.refresh_token);
                    return data;
                })
                .catch(() => {
                    clearTokens();
                    throw error;
                })
                .finally(() => {
                    refreshPromise = null;
                });
        }
        return refreshPromise.then(() => {
            original._retry = true;
            original.headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
            return axiosInstance(original);
        });
    }
);

export default axiosInstance;
