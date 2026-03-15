import PusherJS from "pusher-js";

/* Client Config WS */
let client = new PusherJS("MvvnVXsfh5j64mVzxwgvL29N5mmNMNEEGMSMtvc5w", {
    cluster: "",
    wsHost: "127.0.0.1",
    wsPort: 6002,
    forceTLS: false,
    encrypted: false,
    disableStats: true,
    enabledTransports: ["ws", "wss"],
});

export default client;
