const mongoose = require("mongoose");
const shortid = require("shortid");
const time = require("./../libs/timeLib");
const passwordLib = require("./../libs/generatePasswordLib");
const response = require("./../libs/responseLib");
const logger = require("./../libs/loggerLib");
const validateInput = require("../libs/paramsValidationLib");
const check = require("../libs/checkLib");
const token = require("../libs/tokenLib");
const nodemailer = require("nodemailer");

/* User Model declaration */
const AuthModel = mongoose.model("Auth");
const UserModel = mongoose.model("User");

let PasswordResetMail = (req, res) => {
  let findUser = () => {
    return new Promise((resolve, reject) => {
      if (req.body.emailId) {
        console.log("req body email is there");
        console.log(req.body);
        UserModel.findOne({
            emailId: req.body.emailId
          },
          (err, userDetails) => {
            /* handle the error here if the User is not found */
            if (err) {
              console.log(err);
              logger.error(
                "Failed To Retrieve User Data",
                "userController: sendmail.findUser()",
                10
              );
              /* generate the error message and the api response message here */
              let apiResponse = response.generate(
                true,
                "Failed To Find User Details",
                500,
                null
              );
              reject(apiResponse);
              /* if Company Details is not found */
            } else if (check.isEmpty(userDetails)) {
              /* generate the response and the console error message here */
              logger.error(
                "No User Found",
                "userController: sendmail.findUser()",
                7
              );
              let apiResponse = response.generate(
                true,
                "No User Details Found",
                404,
                null
              );
              reject(apiResponse);
            } else {
              /* prepare the message and the api response here */
              logger.info("User Found", "userController: findUser()", 10);
              resolve(userDetails);
            }
          }
        );
      } else {
        let apiResponse = response.generate(
          true,
          '"email" parameter is missing',
          400,
          null
        );
        reject(apiResponse);
      }
    });
  }; // end validate user input

  let generateToken = userDetails => {
    let userDetailsobj = userDetails.toObject();
    delete userDetailsobj.userPassword;
    delete userDetailsobj._id;
    delete userDetailsobj.__v;
    delete userDetailsobj.createdOn;
    console.log("generate token");
    return new Promise((resolve, reject) => {
      token.generateToken(userDetails, (err, tokenDetails) => {
        if (err) {
          console.log(err);
          let apiResponse = response.generate(
            true,
            "Failed To Generate Token",
            500,
            null
          );
          reject(apiResponse);
        } else {
          tokenDetails.userId = userDetails.userId;
          tokenDetails.userDetails = userDetails;
          resolve(tokenDetails);
        }
      });
    });
  };
  let saveToken = tokenDetails => {
    console.log("save token");
    return new Promise((resolve, reject) => {
      AuthModel.findOne({
          userId: tokenDetails.userId
        },
        (err, retrievedTokenDetails) => {
          if (err) {
            console.log(err.message, "userController: saveToken", 10);
            let apiResponse = response.generate(
              true,
              "Failed To Generate Token",
              500,
              null
            );
            reject(apiResponse);
          } else if (check.isEmpty(retrievedTokenDetails)) {
            let newAuthToken = new AuthModel({
              userId: tokenDetails.userId,
              authToken: tokenDetails.token,
              tokenSecret: tokenDetails.tokenSecret,
              tokenGenerationTime: time.now()
            });
            newAuthToken.save((err, newTokenDetails) => {
              if (err) {
                console.log(err);
                logger.error(err.message, "userController: saveToken", 10);
                let apiResponse = response.generate(
                  true,
                  "Failed To Generate Token",
                  500,
                  null
                );
                reject(apiResponse);
              } else {
                let responseBody = {
                  authToken: newTokenDetails.authToken,
                  userDetails: tokenDetails.userDetails
                };
                resolve(responseBody);
              }
            });
          } else {
            retrievedTokenDetails.authToken = tokenDetails.token;
            retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret;
            retrievedTokenDetails.tokenGenerationTime = time.now();
            retrievedTokenDetails.save((err, newTokenDetails) => {
              if (err) {
                console.log(err);
                logger.error(err.message, "userController: saveToken", 10);
                let apiResponse = response.generate(
                  true,
                  "Failed To Generate Token",
                  500,
                  null
                );
                reject(apiResponse);
              } else {
                let responseBody = {
                  authToken: newTokenDetails.authToken,
                  userDetails: tokenDetails.userDetails
                };
                resolve(responseBody);
              }
            });
          }
        }
      );
    });
  };

  sendResetMail = details => {
    return new Promise((resolve, reject) => {
      let data = {
        email: req.body.emailId,
        authToken: details.authToken,
        name: `${details.userDetails.firstName} ${
          details.userDetails.lastName
        }`,
        /* resetPasswordBaseUrl: "http://edvivek.xyz/resetpasword", */
        resetPasswordBaseUrl: "http://localhost:4200/resetpasword",
        userId: details.userDetails.userId
      };

      console.log(data);
      var transporter = nodemailer.createTransport({
        service: "gmail",
        /* temporary email */
        auth: {
          user: "vivekedwisor@gmail.com",
          pass: "edvivekxyz"
        }
      });

      var mailOptions = {
        from: "vivekedwisor@gmail.com",
        to: req.body.emailId,
        template: "forgot-password-email",
        subject: "Password reset Link",
        text: `Dear ${data.name},
                You requested for a password reset,
                ${data.resetPasswordBaseUrl}/${data.userId}?authToken=${
          data.authToken
        }
                Cheers!`
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          logger.error(
            "Sent Mail Failed!",
            "User Controller: sendResetMail()",
            10
          );
          let apiResponse = response.generate(
            true,
            "Server Error!Sent Mail Failed.",
            500,
            null
          );
          reject(apiResponse);
        } else {
          console.log(info);
          resolve(data);
        }
      });
    });
  };

  deleteAuthToken = userDetails => {
    return new Promise((resolve, reject) => {
      AuthModel.findOneAndRemove({
          userId: userDetails.userId
        },
        (err, result) => {
          if (err) {
            console.log(err);
            logger.error(err.message, "user Controller: resetPassword", 10);
            let apiResponse = response.generate(
              true,
              `error occurred: ${err.message}`,
              500,
              null
            );
            reject(apiResponse);
          } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(
              true,
              "Already deleted or Invalid UserId",
              404,
              null
            );
            reject(apiResponse);
          } else {
            let apiResponse = response.generate(
              false,
              "Reset mail sent and Auth deleted Successfully",
              200,
              null
            );
            resolve(apiResponse);
          }
        }
      );
    });
  };

  findUser(req, res)
    .then(generateToken)
    .then(saveToken)
    .then(sendResetMail)
    .then(deleteAuthToken)
    .then(resolve => {
      res.send(resolve);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
}; //end of sendmail function

// start of login function
let loginFunction = (req, res) => {
  let findUser = () => {
    return new Promise((resolve, reject) => {
      if (req.body.emailId) {
        console.log("req body email is there");
        console.log(req.body);
        UserModel.findOne({
            emailId: req.body.emailId
          },
          (err, userDetails) => {
            /* handle the error here if the User is not found */
            if (err) {
              console.log(err);
              logger.error(
                "Failed To Retrieve User Data",
                "userController: findUser()",
                10
              );
              /* generate the error message and the api response message here */
              let apiResponse = response.generate(
                true,
                "Failed To Find User Details",
                500,
                null
              );
              reject(apiResponse);
              /* if Company Details is not found */
            } else if (check.isEmpty(userDetails)) {
              /* generate the response and the console error message here */
              logger.error("No User Found", "userController: findUser()", 7);
              let apiResponse = response.generate(
                true,
                "No User Details Found",
                404,
                null
              );
              reject(apiResponse);
            } else {
              /* prepare the message and the api response here */
              logger.info("User Found", "userController: findUser()", 10);
              resolve(userDetails);
            }
          }
        );
      } else {
        let apiResponse = response.generate(
          true,
          '"email" parameter is missing',
          400,
          null
        );
        reject(apiResponse);
      }
    });
  };
  let validatePassword = retrievedUserDetails => {
    console.log("validatePassword");
    return new Promise((resolve, reject) => {
      passwordLib.comparePassword(
        req.body.userPassword,
        retrievedUserDetails.userPassword,
        (err, isMatch) => {
          if (err) {
            console.log(err);
            logger.error(err.message, "userController: validatePassword()", 10);
            let apiResponse = response.generate(
              true,
              "Login Failed",
              500,
              null
            );
            reject(apiResponse);
          } else if (isMatch) {
            let retrievedUserDetailsObj = retrievedUserDetails.toObject();
            delete retrievedUserDetailsObj.userPassword;
            delete retrievedUserDetailsObj._id;
            delete retrievedUserDetailsObj.__v;
            delete retrievedUserDetailsObj.createdOn;
            resolve(retrievedUserDetailsObj);
          } else {
            logger.info(
              "Login Failed Due To Invalid Password",
              "userController: validatePassword()",
              10
            );
            let apiResponse = response.generate(
              true,
              "Wrong Password.Login Failed",
              400,
              null
            );
            reject(apiResponse);
          }
        }
      );
    });
  };

  let generateToken = userDetails => {
    console.log("generate token");
    return new Promise((resolve, reject) => {
      token.generateToken(userDetails, (err, tokenDetails) => {
        if (err) {
          console.log(err);
          let apiResponse = response.generate(
            true,
            "Failed To Generate Token",
            500,
            null
          );
          reject(apiResponse);
        } else {
          tokenDetails.userId = userDetails.userId;
          tokenDetails.userDetails = userDetails;
          console.log(
            "this is token details" + tokenDetails + "  " + userDetails
          );
          resolve(tokenDetails);
        }
      });
    });
  };
  let saveToken = tokenDetails => {
    console.log("save token");
    return new Promise((resolve, reject) => {
      AuthModel.findOne({
          userId: tokenDetails.userId
        },
        (err, retrievedTokenDetails) => {
          if (err) {
            console.log(err.message, "userController: saveToken", 10);
            let apiResponse = response.generate(
              true,
              "Failed To Generate Token",
              500,
              null
            );
            reject(apiResponse);
          } else if (check.isEmpty(retrievedTokenDetails)) {
            let newAuthToken = new AuthModel({
              userId: tokenDetails.userId,
              authToken: tokenDetails.token,
              tokenSecret: tokenDetails.tokenSecret,
              tokenGenerationTime: time.now()
            });
            newAuthToken.save((err, newTokenDetails) => {
              if (err) {
                console.log(err);
                logger.error(err.message, "userController: saveToken", 10);
                let apiResponse = response.generate(
                  true,
                  "Failed To Generate Token",
                  500,
                  null
                );
                reject(apiResponse);
              } else {
                let responseBody = {
                  authToken: newTokenDetails.authToken,
                  userDetails: tokenDetails.userDetails
                };
                resolve(responseBody);
              }
            });
          } else {
            retrievedTokenDetails.authToken = tokenDetails.token;
            retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret;
            retrievedTokenDetails.tokenGenerationTime = time.now();
            retrievedTokenDetails.save((err, newTokenDetails) => {
              if (err) {
                console.log(err);
                logger.error(err.message, "userController: saveToken", 10);
                let apiResponse = response.generate(
                  true,
                  "Failed To Generate Token",
                  500,
                  null
                );
                reject(apiResponse);
              } else {
                let responseBody = {
                  authToken: newTokenDetails.authToken,
                  userDetails: tokenDetails.userDetails
                };
                resolve(responseBody);
              }
            });
          }
        }
      );
    });
  };

  findUser(req, res)
    .then(validatePassword)
    .then(generateToken)
    .then(saveToken)
    .then(resolve => {
      let apiResponse = response.generate(
        false,
        "Login Successful",
        200,
        resolve
      );
      res.status(200);
      res.send(apiResponse);
    })
    .catch(err => {
      console.log("errorhandler");
      console.log(err);
      res.status(err.status);
      res.send(err);
    });
}; //end of signinFunction

/* start of signupFunction */
let signUpFunction = (req, res) => {
  let validateUserInput = () => {
    return new Promise((resolve, reject) => {
      if (req.body.emailId) {
        if (!validateInput.Email(req.body.emailId)) {
          let apiResponse = response.generate(
            true,
            "Email Does not met the requirement",
            400,
            null
          );
          reject(apiResponse);
        } else if (check.isEmpty(req.body.userPassword)) {
          let apiResponse = response.generate(
            true,
            '"password" parameter is missing"',
            400,
            null
          );
          reject(apiResponse);
        } else {
          resolve(req);
        }
      } else {
        logger.error(
          "Field Missing During User Creation",
          "userController: createUser()",
          5
        );
        let apiResponse = response.generate(
          true,
          "One or More Parameter(s) is missing",
          400,
          null
        );
        reject(apiResponse);
      }
    });
  }; // end validate user input
  let createUser = () => {
    return new Promise((resolve, reject) => {
      UserModel.findOne({
        emailId: req.body.emailId
      }).exec((err, retrievedUserDetails) => {
        if (err) {
          logger.error(err.message, "userController: createUser", 10);
          let apiResponse = response.generate(
            true,
            "Failed To Create User",
            500,
            null
          );
          reject(apiResponse);
        } else if (check.isEmpty(retrievedUserDetails)) {
          console.log(req.body);
          let newUser = new UserModel({
            userId: shortid.generate(),
            firstName: req.body.firstName,
            lastName: req.body.lastName || "",
            emailId: req.body.emailId.toLowerCase(),
            mobileNumber: req.body.phoneNumber,
            userPassword: passwordLib.hashpassword(req.body.userPassword),
            friendList: []
          });

          newUser.save((err, newUser) => {
            if (err) {
              console.log(err);
              logger.error(err.message, "userController: createUser", 10);
              let apiResponse = response.generate(
                true,
                "Failed to create new User",
                500,
                null
              );
              reject(apiResponse);
            } else {
              let newUserObj = newUser.toObject();
              resolve(newUserObj);
            }
          });
        } else {
          logger.error(
            "User Cannot Be Created.User Already Present",
            "userController: createUser",
            4
          );
          let apiResponse = response.generate(
            true,
            "User Already Present With this Email",
            403,
            null
          );
          reject(apiResponse);
        }
      });
    });
  }; // end create user function

  validateUserInput(req, res)
    .then(createUser)
    .then(resolve => {
      delete resolve.userPassword;

      let apiResponse = response.generate(false, "User created", 200, resolve);
      res.send(apiResponse);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
}; // end user signup function

let resetPassword = (req, res) => {
  let findUser = () => {
    return new Promise((resolve, reject) => {
      if (req.body.userId) {
        console.log("req body userId is there");
        console.log(req.body);
        UserModel.findOne({
            userId: req.body.userId
          },
          (err, userDetails) => {
            /* handle the error here if the User is not found */
            if (err) {
              console.log(err);
              logger.error(
                "Failed To Retrieve User Data",
                "resetPassword: findUser()",
                10
              );
              /* generate the error message and the api response message here */
              let apiResponse = response.generate(
                true,
                "Failed To Find User Details",
                500,
                null
              );
              reject(apiResponse);
              /* if Company Details is not found */
            } else if (check.isEmpty(userDetails)) {
              /* generate the response and the console error message here */
              logger.error("No User Found", "resetPassword: findUser()", 7);
              let apiResponse = response.generate(
                true,
                "No User Details Found",
                404,
                null
              );
              reject(apiResponse);
            } else {
              /* prepare the message and the api response here */
              logger.info("User Found", "resetPassword: findUser()", 10);
              resolve(userDetails);
            }
          }
        );
      } else {
        let apiResponse = response.generate(
          true,
          '"email" parameter is missing',
          400,
          null
        );
        reject(apiResponse);
      }
    });
  };

  let updatePassword = () => {
    console.log("updatePassword");
    return new Promise((resolve, reject) => {
      let userId = req.body.userId;
      UserModel.update({
        userId: req.body.userId
      }, {
        $set: {
          userPassword: passwordLib.hashpassword(req.body.userPassword)
        }
      }).exec((err, result) => {
        if (err) {
          console.log(err);
          logger.error(err.message, "User Controller:editUser", 10);
          let apiResponse = response.generate(
            true,
            "Failed To edit user details",
            500,
            null
          );
          reject(apiResponse);
        } else if (check.isEmpty(result)) {
          logger.info("No User Found", "User Controller: editUser");
          let apiResponse = response.generate(true, "No User Found", 404, null);
          reject(apiResponse);
        } else {
          resolve(result);
        }
      });
    });
  };

  findUser(req, res)
    .then(updatePassword)
    .then(resolve => {
      let apiResponse = response.generate(
        false,
        "User password updated",
        200,
        resolve
      );
      res.status(200);
      console.log(apiResponse);
      res.send(apiResponse);
    })
    .catch(err => {
      console.log("errorhandler");
      console.log(err);
      res.status(err.status);
      res.send(err);
    });
};

let getAllUsers = (req, res) => {
  UserModel.find({
    'userId': {
      $ne: req.params.userId
    }
  }, {
    'userId': 1,
    'firstName': 1,
    'lastName': 1,
    '_id': 0
  }).exec((err, userDetails) => {
    /* handle the error here if the User is not found */
    if (err) {
      console.log(err);
      logger.error("Failed To Retrieve User Data", "getAllUsers()", 10);
      /* generate the error message and the api response message here */
      let apiResponse = response.generate(
        true,
        "Failed To Find User Details",
        500,
        null
      );
      res.send(apiResponse);
      /* if Company Details is not found */
    } else if (check.isEmpty(userDetails)) {
      /* generate the response and the console error message here */
      logger.error("Failed To Retrieve User Data", "getAllUsers()", 10);
      let apiResponse = response.generate(
        true,
        "No User Details Found",
        404,
        null
      );
      res.send(apiResponse);
    } else {
      /* prepare the message and the api response here */
      logger.info("User Found", "getAllUsers()", 10);
      res.send(userDetails);
    }
  });
};

let logout = (req, res) => {
  AuthModel.findOneAndRemove({
      userId: req.user.userId
    },
    (err, result) => {
      if (err) {
        console.log(err);
        logger.error(err.message, "user Controller: logout", 10);
        let apiResponse = response.generate(
          true,
          `error occurred: ${err.message}`,
          500,
          null
        );
        res.send(apiResponse);
      } else if (check.isEmpty(result)) {
        let apiResponse = response.generate(
          true,
          "Already Logged Out or Invalid UserId",
          404,
          null
        );
        res.send(apiResponse);
      } else {
        let apiResponse = response.generate(
          false,
          "Logged Out Successfully",
          200,
          null
        );
        res.send(apiResponse);
      }
    }
  );
}; // end of the logout function.

let getSingleUser = (req, res) => {
  UserModel.findOne({
      userId: req.params.userId
    })
    .select("-password -__v -_id")
    .lean()
    .exec((err, result) => {
      if (err) {
        console.log(err);
        logger.error(err.message, "User Controller: getSingleUser", 10);
        let apiResponse = response.generate(
          true,
          "Failed To Find User Details",
          500,
          null
        );
        res.send(apiResponse);
      } else if (check.isEmpty(result)) {
        logger.info("No User Found", "User Controller:getSingleUser");
        let apiResponse = response.generate(true, "No User Found", 404, null);
        res.send(apiResponse);
      } else {
        let apiResponse = response.generate(
          false,
          "User Details Found",
          200,
          result
        );
        res.send(apiResponse);
      }
    });
}; // end get single user


let sendFriendRequest = (req, res) => {

  let options = req.body;


  addSentRequest = () => {
    console.log("\nin addSentRequest");
    return new Promise((resolve, reject) => {
      let sentRequest = {
        userId: req.body.requestedId,
        userName: req.body.requestedName
      }

      UserModel.updateOne({
          'userId': req.body.requestorId
        }, {
          $push: {
            requestSent: sentRequest
          }
        })
        .exec((err, result) => {
          if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller:editUser', 10)
            let apiResponse = response.generate(true, 'Failed To edit requestor user details', 500, null)
            reject(apiResponse)
          } else if (check.isEmpty(result)) {
            logger.info('No User Found', 'User Controller: editUser')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            reject(apiResponse)
          } else {
            let apiResponse = response.generate(false, 'User details edited', 200, result)
            resolve(apiResponse)
          }
        }); // end user model update
    })
  }

  addReceivedRequest = () => {
    console.log("\nin addReceivedRequest");
    return new Promise((resolve, reject) => {
      let receivedRequest = {
        userId: req.body.requestorId,
        userName: req.body.requestorName
      }
      console.log("\nthe requested*********\n" + req.body.requestedId + ' ' + req.body.requestedName);
      UserModel.updateOne({
          'userId': req.body.requestedId
        }, {
          $push: {
            requestRecieved: receivedRequest
          }
        })
        .exec((err, result) => {
          if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller:editUser', 10)
            let apiResponse = response.generate(true, 'Failed To edit requested user details', 500, null)
            reject(apiResponse)
          } else if (check.isEmpty(result)) {
            logger.info('No User Found', 'User Controller: editUser')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            reject(apiResponse)
          } else {
            let apiResponse = response.generate(false, 'User details edited', 200, result)
            resolve(apiResponse)
          }
        }); // end user model update
    })
  }

  addSentRequest(req, res)
    .then(addReceivedRequest)
    .then((resolve) => {
      //delete resolve.password
      let apiResponse = response.generate(false, 'Friend Request Sent', 200, resolve)
      res.send(apiResponse)
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    })
}

let acceptFriendRequest = (req, res) => {

  let options = req.body;


  removeSentRequest = () => {
    console.log("\nin removeSentRequest");
    return new Promise((resolve, reject) => {
      let sentRequest = {
        userId: req.body.requestorId,
        userName: req.body.requestorName
      }
      UserModel.updateOne({
          'userId': req.body.requestedId
        }, {
          $pull: {
            requestSent: sentRequest
          }
        })
        .exec((err, result) => {
          if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller:editUser', 10)
            let apiResponse = response.generate(true, 'Failed To remove sent request from user details', 500, null)
            reject(apiResponse)
          } else if (check.isEmpty(result)) {
            logger.info('No User Found', 'User Controller: editUser')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            reject(apiResponse)
          } else {
            let apiResponse = response.generate(false, 'Successfully removed from requestor sent requests', 200, result)
            resolve(apiResponse)
          }
        }); // end user model update
    })
  }

  addInFriendListForRequestorUser = () => {
    console.log("\nin addReceivedRequest");
    return new Promise((resolve, reject) => {
      let friend = {
        friendId: req.body.requestedId,
        friendName: req.body.requestedName
      }
      console.log("\nthe requested*********\n" + req.body.requestedId + ' ' + req.body.requestedName);
      UserModel.updateOne({
          'userId': req.body.requestorId
        }, {
          $push: {
            friendList: friend
          }
        })
        .exec((err, result) => {
          if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller:editUser', 10)
            let apiResponse = response.generate(true, 'Failed To add in friends list of requestor', 500, null)
            reject(apiResponse)
          } else if (check.isEmpty(result)) {
            logger.info('No User Found', 'User Controller: editUser')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            reject(apiResponse)
          } else {
            let apiResponse = response.generate(false, 'Successfully added in friend list of requestor', 200, result)
            resolve(apiResponse)
          }
        }); // end user model update
    })
  }

  removeReceivedRequest = () => {
    console.log("\nin removeReceivedRequest");
    return new Promise((resolve, reject) => {
      let receivedRequest = {
        userId: req.body.requestedId,
        userName: req.body.requestedName
      }
      console.log("***********" + receivedRequest);
      UserModel.updateOne({
          'userId': req.body.requestorId
        }, {
          $pull: {
            requestRecieved: receivedRequest
          }
        })
        .exec((err, result) => {
          if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller:editUser', 10)
            let apiResponse = response.generate(true, 'Failed To remove received request from user details', 500, null)
            reject(apiResponse)
          } else if (check.isEmpty(result)) {
            logger.info('No User Found', 'User Controller: editUser')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            reject(apiResponse)
          } else {
            let apiResponse = response.generate(false, 'Successfully removed from requested persons received requests', 200, result)
            resolve(apiResponse)
          }
        }); // end user model update
    })
  }

  addInFriendListForRequestedUser = () => {
    console.log("\nin addReceivedRequest");
    return new Promise((resolve, reject) => {
      let friend = {
        friendId: req.body.requestorId,
        friendName: req.body.requestorName
      }
      console.log("\nthe requested*********\n" + req.body.requestedId + ' ' + req.body.requestedName);
      UserModel.updateOne({
          'userId': req.body.requestedId
        }, {
          $push: {
            friendList: friend
          }
        })
        .exec((err, result) => {
          if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller:editUser', 10)
            let apiResponse = response.generate(true, 'Failed To add in friends list of requestor', 500, null)
            reject(apiResponse)
          } else if (check.isEmpty(result)) {
            logger.info('No User Found', 'User Controller: editUser')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            reject(apiResponse)
          } else {
            let apiResponse = response.generate(false, 'Successfully added in friend list of requestor', 200, result)
            resolve(apiResponse)
          }
        }); // end user model update
    })
  }


  removeSentRequest(req, res)
    .then(addInFriendListForRequestorUser)
    .then(removeReceivedRequest)
    .then(addInFriendListForRequestedUser)
    .then((resolve) => {
      //delete resolve.password
      let apiResponse = response.generate(false, 'Added in friends list', 200, resolve)
      res.send(apiResponse)
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    })
}

let rejectFriendRequest = (req, res) => {

  let options = req.body;


  removeSentRequest = () => {
    console.log("\nin removeSentRequest");
    return new Promise((resolve, reject) => {
      let sentRequest = {
        userId: req.body.requestorId,
        userName: req.body.requestorName
      }
      UserModel.updateOne({
          'userId': req.body.requestedId
        }, {
          $pull: {
            requestSent: sentRequest
          }
        })
        .exec((err, result) => {
          if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller:editUser', 10)
            let apiResponse = response.generate(true, 'Failed To remove sent request from user details', 500, null)
            reject(apiResponse)
          } else if (check.isEmpty(result)) {
            logger.info('No User Found', 'User Controller: editUser')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            reject(apiResponse)
          } else {
            let apiResponse = response.generate(false, 'Successfully removed from requestor sent requests', 200, result)
            resolve(apiResponse)
          }
        }); // end user model update
    })
  }

  removeReceivedRequest = () => {
    console.log("\nin removeReceivedRequest");
    return new Promise((resolve, reject) => {
      let receivedRequest = {
        userId: req.body.requestedId,
        userName: req.body.requestedName
      }
      console.log("***********" + receivedRequest);
      UserModel.updateOne({
          'userId': req.body.requestorId
        }, {
          $pull: {
            requestRecieved: receivedRequest
          }
        })
        .exec((err, result) => {
          if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller:editUser', 10)
            let apiResponse = response.generate(true, 'Failed To remove received request from user details', 500, null)
            reject(apiResponse)
          } else if (check.isEmpty(result)) {
            logger.info('No User Found', 'User Controller: editUser')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            reject(apiResponse)
          } else {
            let apiResponse = response.generate(false, 'Successfully removed from requested persons received requests', 200, result)
            resolve(apiResponse)
          }
        }); // end user model update
    })
  }


  removeSentRequest(req, res)
    .then(removeReceivedRequest)
    .then((resolve) => {
      //delete resolve.password
      let apiResponse = response.generate(false, 'Friend request rejected', 200, resolve)
      res.send(apiResponse)
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    })
}

module.exports = {
  signUpFunction: signUpFunction,
  loginFunction: loginFunction,
  PasswordResetMail: PasswordResetMail,
  resetPassword: resetPassword,
  getAllUsers: getAllUsers,
  logout: logout,
  getSingleUser: getSingleUser,
  sendFriendRequest: sendFriendRequest,
  acceptFriendRequest: acceptFriendRequest,
  rejectFriendRequest: rejectFriendRequest
}; // end exports;