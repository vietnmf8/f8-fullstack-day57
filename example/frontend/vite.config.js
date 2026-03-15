import { defineConfig } from "vite";
import reactSWC from "@vitejs/plugin-react-swc";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
    plugins: [reactSWC()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ["react", "react-dom"],
                    router: ["react-router-dom"],
                    markdown: ["react-markdown", "remark-gfm"],
                    highlighter: ["react-syntax-highlighter"],
                },
            },
        },
    },
});
