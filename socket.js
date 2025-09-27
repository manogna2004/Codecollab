let io;

module.exports = {
    init: (httpServer) => {
        // Initialize Socket.IO server
        io = require('socket.io')(httpServer, {
            cors: {
                origin: process.env.FRONTEND_URL || "http://localhost:3001",
                methods: ["GET", "POST"]
            }
        });

        // Event handler for new connections
        io.on('connection', (socket) => {
            console.log(`Socket connected: ${socket.id}`);

            // 1. Join Project Room (for collaboration)
            socket.on('join-project', (projectId) => {
                socket.join(projectId);
                console.log(`User ${socket.id} joined room: ${projectId}`);
            });

            // 2. Real-Time Editor: Broadcast code changes
            socket.on('code-change', (data) => {
                // data = { projectId: '...', code: 'new code', fileId: '...' }
                
                // Broadcast to all other users in the same project room
                socket.to(data.projectId).emit('code-update', data);
            });
            
            // 3. Integrated Chat: Broadcast chat messages
            socket.on('chat-message', (data) => {
                // data = { projectId: '...', sender: '...', message: '...' }
                
                // Broadcast the message to the entire project room
                io.to(data.projectId).emit('new-chat-message', data);
            });

            // Handle disconnection
            socket.on('disconnect', () => {
                console.log(`Socket disconnected: ${socket.id}`);
            });
        });

        return io;
    },
    getIo: () => {
        if (!io) {
            throw new Error('Socket.io not initialized!');
        }
        return io;
    }
};