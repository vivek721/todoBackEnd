/**
 * modules dependencies.
 */
const socketio = require("socket.io");
const mongoose = require("mongoose");
const shortid = require("shortid");
const logger = require("./loggerLib.js");
const events = require("events");
const eventEmitter = new events.EventEmitter();
const moment = require("moment");

const schedule = require('node-schedule');

const nodemailer = require("nodemailer");

const EventModel = mongoose.model("Event");

const tokenLib = require("./tokenLib.js");
const check = require("./checkLib.js");
const response = require("./responseLib");

let allEventDetails = [];

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
        }
      });
    }); // end of listening set-user event

    socket.on("event-occured", (data) => {
      console.log("****eventOccured for ***************" + data.actionPerformed);
      setTimeout(function () {
        if (data.eventStart !== null) {
          eventEmitter.emit('sendAlertMail', data);
        }

      }, 2000)
      myIo.emit(data.createdForId, data);
      let scheduleTime = moment(data.eventStart).subtract(1, 'm').toDate();
      var j = schedule.scheduleJob(scheduleTime, function () {
        console.log("sending remainder mail");
        eventEmitter.emit('alert-user-for-upcomming-event', data);
        myIo.emit('alert-user-for-upcomming-meeting', data);
      });

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

eventEmitter.on('alert-user-for-upcomming-event', (data) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    /* temporary email */
    auth: {
      user: "vivekedwisor@gmail.com",
      pass: "Edwisorvivek1"
    }
  });

  var mailOptions = {
    from: "vivekedwisor@gmail.com",
    to: data.creatorForEmail,
    subject: `You Have a meeting in 1 minute`,
    text: `Dear ${data.createdForName},
You have an meeting with title "${data.eventTitle}" occuring in 1 minute
Cheers!`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(err);
      console.log("an error occured while sending alert email")
    } else {
      console.log(info);
    }
  });
})


eventEmitter.on('sendAlertMail', (data) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    /* temporary email */
    auth: {
      user: "vivekedwisor@gmail.com",
      pass: "Edwisorvivek1"
    }
  });

  var mailOptions = {
    from: "vivekedwisor@gmail.com",
    to: data.creatorForEmail,
    subject: `an event has been ${data.actionPerformed}`,
    text: `Dear ${data.createdForName},
An event with title "${data.eventTitle}" is ${data.actionPerformed} by ${data.creatorName}
Cheers!`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(err);
      console.log("an error occured while sending alert email")
    } else {
      console.log(info);
    }
  });
});




module.exports = {
  setServer: setServer
};