/**
 * server.ts
 *
 * Standalone Express + Socket.IO server for real-time features.
 * This runs independently from the Vite development server.
 *
 * Key Features:
 * - Express HTTP server for API endpoints
 * - Socket.IO for real-time, bidirectional communication
 * - CORS enabled for Vite dev server communication
 */

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

// --- Configuration ---
const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT || '3001', 10);
const hostname = process.env.HOSTNAME || '0.0.0.0';
const clientHostname = process.env.CLIENT_HOSTNAME || 'localhost';

// --- Server Initialization ---
async function startServer() {
  try {
    const app = express();

    // Middleware
    app.use(cors({
      origin: dev ? 'http://localhost:3000' : process.env.CLIENT_URL || '*',
      credentials: true
    }));
    app.use(express.json());

    // Health check endpoint
    app.get('/api/health', (req, res) => {
      res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
      });
    });

    // OG Image endpoint (placeholder)
    app.get('/api/og', (req, res) => {
      const title = req.query.title || 'Thunder Gaming Café';
      res.send(`<html><body><h1>${title}</h1></body></html>`);
    });

    // Create HTTP server
    const server = createServer(app);

    // --- Socket.IO Integration ---
    const io = new Server(server, {
      path: '/api/socketio',
      cors: {
        origin: dev ? 'http://localhost:3000' : process.env.CLIENT_URL || '*',
        methods: ['GET', 'POST']
      }
    });

    // Socket.IO event handlers
    io.on('connection', (socket) => {
      console.log(`✅ Client connected: ${socket.id}`);

      socket.on('disconnect', () => {
        console.log(`❌ Client disconnected: ${socket.id}`);
      });

      // Example: Echo messages
      socket.on('message', (data) => {
        console.log('Message received:', data);
        socket.emit('message', data);
      });
    });

    // --- Start Listening ---
    server.listen(port, hostname, () => {
      console.log(`\n> ✅ Backend server successfully started!`);
      console.log(`> 🚀 Mode: ${dev ? 'Development' : 'Production'}`);
      console.log(`> 📍 Local:   http://${clientHostname}:${port}`);
      
      if (hostname === '0.0.0.0') {
        console.log(`> 🌐 Network: (Use your local IP address, e.g., http://192.168.1.x:${port})`);
      }
      
      console.log(`> 🔌 Socket.IO: ws://${clientHostname}:${port}/api/socketio\n`);
      console.log(`> Note: Run 'npm run dev' to start the Vite frontend on port 3000\n`);
    });

  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

// Execute the server startup function
startServer();
