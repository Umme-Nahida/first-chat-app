const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const cors = require('cors')
const {addUser,removeUser} = require("./SavedUser")
const app = express()
const port = 3000




const httpServer = http.createServer(app)
const io = socketIo(httpServer, {
  cors: {
      origin: "http://localhost:5173"
  }


});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

io.on('connection', function(socket){
  console.log('user connected successfully',socket.id)
   
  socket.on("join", ({name,room}, callBack)=>{
    console.log("join request", name)
     const {error, user} =  addUser({id:socket.id, name, room});
     if(error){
       callBack(error)
     }else{
      callBack()
     }
  })

   socket.on('disconnect',(socket)=>{
   console.log('user disconnect',socket.id)
   removeUser(socket.id)
  })
})



httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})