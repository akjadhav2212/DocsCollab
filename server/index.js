const express = require('express');
const { Server }  = require("socket.io");
const {createServer} = require('http')
const path = require('path')
require('dotenv').config();

const app = express();
const httpServer = createServer(app);
const uuidToData = new Map();
const io = new Server(httpServer, {
    cors: true
 });
app.use(express.json());
app.use(express.static('dist'));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
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
const port = process.env.PORT || 3000;
httpServer.listen(port,()=>{console.log('server is listening on port',port);});