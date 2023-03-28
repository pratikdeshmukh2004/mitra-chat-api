
module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    socket.on("join_room", ({room1, room2})=>{
        console.log('joining room', room1, room2);
        socket.join(room1)
        socket.join(room2)
    })

    // Listen for a new chat message event
    socket.on('msg', async (messageData) => {
        console.log('====================================');
        console.log(messageData);
        console.log('====================================');
        io.to(messageData.room).emit("msgs", messageData)
      return {}
      
    });


    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
};
