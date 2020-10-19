const io = require('socket.io')(4000)
const users={}

io.on('connection',socket=>{
    socket.on('new-user',name=>{
        if(name !==null){
            users[socket.id]=name
            socket.broadcast.emit('user-connected',name)
        }    
    })

    socket.on('send-chat-message',message=>{
        socket.broadcast.emit('chat-message',{message:message , name:users[socket.id]}) // it sends message to all the other broadcaster user but the one who sends it
    })

    socket.on('disconnect',()=>{
        socket.broadcast.emit('user-disconnected',users[socket.id])  ;
        delete users[socket.id];
    })
    
});