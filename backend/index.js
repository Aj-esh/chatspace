import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { connectDB } from './src/config/db.js';
import { initsocket } from './src/socket/socket.js';

const app = express();

const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

// In Codespaces + Vite proxy, reflect the incoming origin to simplify dev
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Basic health endpoints
app.get('/health', (_req, res) => res.json({ ok: true }));
app.get('/api/health', (_req, res) => res.json({ ok: true }));

async function start() {
  try {
    await connectDB();

    const server = http.createServer(app);
    initsocket(server);

    server.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  }
}

start();
