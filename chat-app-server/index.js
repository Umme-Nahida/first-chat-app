const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const cors = require('cors')
const {addUser,removeUser,getUserById} = require("./SavedUser")
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
  // console.log('user connected successfully',socket.id)
   
  socket.on("join", ({name,room}, callBack)=>{
     console.log("join request", name)
     const {error, user} =  addUser({id:socket.id, name, room});
     if(error){
       callBack(error)
     }

     socket.join(room)
     socket.emit('message', {user: 'admin', text: `welcome ${name} to ${room} `})
     socket.broadcast.to(room).emit('message', {user: 'admin', text: `${name} just joined ${room} `})
      callBack()
  })

  socket.on('message', (message)=>{
    console.log(message)
  })

   socket.on('disconnect',(socket)=>{
  
    // get user from existing user
   const user = removeUser(socket.id)
   console.log('user disconnect',socket.id);

   if(user){
     io.to(user.room).emit('message', {user:'admin', text:`${user.name} has been left ${user.room} `})
   }


  })
})



httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})