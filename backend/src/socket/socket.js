import { Server } from 'socket.io';

export const initsocket = (httpserver) => {
    const io = new Server(httpserver, {
        cors : {
            origin : '*',
            methods : ['GET', 'POST'],
            credentials : true
        }
    });

    io.on('connection', (socket) => {
        console.log(`User connected : ${socket.id}`)

    socket.on('join', (roomID) => {
        socket.join(roomID)

        console.log(`User with ID : ${socket.id} joined room : ${roomID}`);
    })

    socket.on('send', (data) => {
        io.to(data.roomID).emit('recieve', data)
    })

    socket.on('disconnect', () => {
        console.log(`User disconnected : ${socket.id}`);
    })
    });

    return io;
}