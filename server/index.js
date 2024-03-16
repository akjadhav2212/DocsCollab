const { Server }  = require("socket.io");
const {createServer} = require('http')


const httpServer = createServer();
const uuidToData = new Map();
const io = new Server(httpServer, {
    cors: true
 });
io.on('connection', socket => {
    socket.on('get-document',id=>{
        if(!uuidToData.has(id)){ 
            uuidToData.set(id,"");
        }
        socket.join(id);
        socket.emit('load-document',uuidToData.get(id));
        socket.on('send-changes', delta =>{
            socket.to(id).emit('receive-changes',delta);
        })
        socket.on('save-changes',data=>{
            uuidToData.set(id,data);
        })
    })

});
httpServer.listen(3000,()=>{'server is listening on port 3000'});