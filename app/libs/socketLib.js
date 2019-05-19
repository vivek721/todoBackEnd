/**
 * modules dependencies.
 */
const socketio = require("socket.io");
const events = require("events");
const eventEmitter = new events.EventEmitter();

const tokenLib = require("./tokenLib.js");

let setServer = server => {
  let allOnlineUsers = [];

  let io = socketio.listen(server);

  let myIo = io.of("/");

  myIo.on("connection", socket => {
    console.log("on connection--emitting verify user");

    socket.emit("verifyUser", "");

    // code to verify the user and make him online

    socket.on("set-user", authToken => {
      console.log("set-user called");
      tokenLib.verifyClaimWithoutSecret(authToken, (err, user) => {
        if (err) {
          socket.emit("auth-error", {
            status: 500,
            error: "Please provide correct auth token"
          });
        } else {
          console.log("user is verified..setting details");
          let currentUser = user.data;
          // setting socket user id
          socket.userId = currentUser.userId;
          let fullName = `${currentUser.firstName} ${currentUser.lastName}`;
          console.log(`${fullName} is online ${currentUser.userId}`);


          let userObj = {
            userId: currentUser.userId,
            fullName: fullName
          }
          allOnlineUsers.push(userObj)
          console.log(allOnlineUsers);

          // setting room name
          socket.room = 'todoRoom'
          // joining chat-group room.
          socket.join(socket.room)
          socket.to(socket.room).broadcast.emit('online-user-list', allOnlineUsers);

        }
      });
    }); // end of listening set-user event

    socket.on("event-occured", (data) => {
      console.log("****eventOccured for ***************" + data);
      myIo.emit(data.requestSentTo, data);

    }); // end of event occured 


    // disconnect event
    socket.on('disconnect', () => {
      // disconnect the user from socket
      console.log("user is disconnected");
      // console.log(socket.connectorName);
      console.log(socket.userId);

      var removeIndex = allOnlineUsers.map(function (user) {
        return user.userId;
      }).indexOf(socket.userId);
      allOnlineUsers.splice(removeIndex, 1)
      console.log(allOnlineUsers)
    }) // end of on disconnect
  });
};
// end of setServer block



module.exports = {
  setServer: setServer
};