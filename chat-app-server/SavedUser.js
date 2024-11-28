const users = [];

const addUser = ({id,name,room})=>{
     name = name.trim().toLowerCase();
     room = room.trim().toLowerCase();

    const exitingUser = users.find(user => user.name === name && user.room === room);
    if(exitingUser){
        return {error: "user is already exist"}
    }

    const user = {
        id,
        name,
        room
    }
    users.push(user)
    return user;
}


const removeUser = (id)=>{
    const index = users.findIndex(inx => inx.id === id)

    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}


const getUserById = (id)=>{
   const user = users.find(user => user.id === Number(id));
//    console.log(typeof(user.id))
   console.log('this is find user',users)
   return user;
}

module.exports = {addUser,removeUser, getUserById}