import { io } from 'socket.io-client';

// In Codespaces, connect to the same origin and let Vite proxy /socket.io to the backend.
// If VITE_WS_URL is set, use it; otherwise use current origin.
const URL = import.meta.env.VITE_WS_URL || undefined;

const socket = io(URL, {
    path: '/socket.io',
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    transports: ['websocket'],
});

export default socket;