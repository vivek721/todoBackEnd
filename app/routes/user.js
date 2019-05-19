const express = require("express");
const appConfig = require("./../../config/appConfig");
const userController = require("../controller/userController");
const fs = require("fs");
const path = require("path");
const auth = require("../middlewares/auth");

let countryName;
let countryCode;

module.exports.setRouter = app => {
  let baseUrl = `${appConfig.apiVersion}/users`;
  /*  Send country Name */
  app.get(`${baseUrl}/countryName`, (req, res) => {
    let data = fs.readFileSync(path.resolve(__dirname, "../../config/names.json"));
    countryName = JSON.parse(data);
    res.send(countryName);
  });

  /**
	 * @api {get} /api/v1/users/countryName Get country Names
	 * @apiVersion 0.0.1
	 * @apiGroup Users
	 *
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 * {
    "BD": "Bangladesh",
    "BE": "Belgium",
    "BF": "Burkina Faso",
    "BG": "Bulgaria",
    "BA": "Bosnia and Herzegovina",
    .....
}
		}
	}
	 
	 */

  /*  Send country Name */
  app.get(`${baseUrl}/countryCode`, (req, res) => {
    let data = fs.readFileSync(path.resolve(__dirname, "../../config/phone.json"));
    countryCode = JSON.parse(data);
    res.send(countryCode);
  });

  /**
	 * @api {get} /api/v1/users/countryCode Get country codes
	 * @apiVersion 0.0.1
	 * @apiGroup Users
	 *
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 * {
     "BD": "880",
    "BE": "32",
    "BF": "226",
    "BG": "359",
    "BA": "387",
    "BB": "+1-246",
    "WF": "681",
    .....
}
		}
	}
	 
	 */

  /* signup param: firstname,lastname,emailid,phonenumber,password */
  app.post(`${baseUrl}/signup`, userController.signUpFunction);

  /**
	 * @api {post} /api/v1/users/signup Signup function
	 * @apiVersion 0.0.1
	 * @apiGroup Users
	 *
	 * @apiParam {String} firstName firstName of the user is passed as body parameter
     * @apiParam {String} lastName lastName of the user is passed as body parameter
     * @apiParam {String} emailId emailId of the user is passed as body parameter
     * @apiParam {String} phoneNumber phoneNumber of the user is passed as body parameter
     * @apiParam {String} userPassword userPassword of the user is passed as body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
    "error": false,
    "message": "User created",
    "status": 200,
    "data": {
        "__v": 0,
        "_id": "5cc06d9514f66619786b86c8",
        "isAdmin": false,
        "createdOn": "2019-04-24T14:07:17.000Z",
        "mobileNumber": "43543545343",
        "emailId": "assddw@gmail.com",
        "lastName": "sadasd",
        "firstName": "asasd",
        "userId": "dYmWMNmrS"
    }
}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 *{
    "error": true,
    "message": "Email Does not met the requirement",
    "status": 400,
    "data": null
}
	 */

  /* signin params: emailId,password */
  app.post(`${baseUrl}/login`, userController.loginFunction);

  /**
	 * @api {post} /api/v1/users/login login function
	 * @apiVersion 0.0.1
	 * @apiGroup Users
   * @apiParam {String} emailId emailId of the user is passed as body parameter
   * @apiParam {String} userPassword userPassword of the user is passed as body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
    "error": false,
    "message": "Login Successful",
    "status": 200,
    "data": {
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IkQ5ZG9PanFNciIsImlhdCI6MTU1NjExNDk0MDM2NiwiZXhwIjoxNTU2MjAxMzQwLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7ImlzQWRtaW4iOmZNlLCJtb2JpbGVOdW1iZXIiOiI0MzU0MzU0NTM0MyIsImVtYWlsSWQiOiJtaW5pY2FAZ21haWwuY29tIiwibGFzdE5hbWUiOiJtaXNocmEiLCJmaXJzdE5hbWUiOiJtb25pY2EiLCJ1c2VySWQiOiJkWW1XTU5tclMifX0.TihL6E4pbguqfCZ3f8mT0WYkOuUhd9scMDfkKkN376M",
        "userDetails": {
            "isAdmin": false,
            "mobileNumber": "43543545343",
            "emailId": "asdasd@gmail.com",
            "lastName": "asdasd",
            "firstName": "asddsaf",
            "userId": "dYmWMNmrS"
        }
    }
}
}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 *{
    "error": true,
    "message": "No User Details Found",
    "status": 404,
    "data": null
}
	 */

  /* to send password reset mail */
  app.post(`${baseUrl}/resetPassword`, userController.PasswordResetMail);

  /**
	 * @api {post} /api/v1/users/resetPassword resetPassword mail function
	 * @apiVersion 0.0.1
	 * @apiGroup Users
   * @apiParam {String} emailId emailId of the user is passed as body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
    "error": false,
    "message": "Reset mail sent and Auth deleted Successfully",
    "status": 200,
    "data": null
}
}
}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 *{
    "error": true,
    "message": "No User Details Found",
    "status": 404,
    "data": null
}
	 */

  /* to reset password */
  app.post(`${baseUrl}/resetNewPassword`, userController.resetPassword);

  /**
	 * @api {post} /api/v1/users/resetNewPassword resetNewPassword function
	 * @apiVersion 0.0.1
	 * @apiGroup Users
   * @apiParam {String} userId userId of the user is passed as body parameter
   * @apiParam {String} userPassword userPassword of the user is passed as body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
    "error": false,
    "message": "User password updated",
    "status": 200,
    "data": {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
  } 
}
}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 *{
    "error": true,
    "message": "No User Details Found",
    "status": 404,
    "data": null
}
	 */

  //logout
  app.post(`${baseUrl}/logout`, auth.isAuthorized, userController.logout);

  /**
	 * @api {post} /api/v1/users/logout logout function
	 * @apiVersion 0.0.1
	 * @apiGroup Users
  * @apiParam {String} authToken The token for removing authToken passed as body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
    "error": false,
    "message": "Logged Out Successfully",
    "status": 200,
    "data": null
}
  } 
}
}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 *{
    "error": true,
    "message": "Invalid Or Expired AuthorizationKey",
    "status": 404,
    "data": null
}
	 */

  app.get(`${baseUrl}/:userId/getAll`, auth.isAuthorized, userController.getAllUsers);
  /**
  	 * @api {get} /api/v1/users/:userId/getAll getAllUsers function
  	 * @apiVersion 0.0.1
  	 * @apiGroup Users
    * @apiParam {String} authToken The token for removing authToken passed as body parameter
    * @apiParam {String} userId is passed as passed as param parameter
  	 *
  	 *  @apiSuccessExample {json} Success-Response:
  	 *  {
      "error": false,
      "message": "Logged Out Successfully",
      "status": 200,
      "data": null
  }
    } 
  }
  }
  		}
  	}
  	  @apiErrorExample {json} Error-Response:
  	 *
  	 *{
      "error": true,
      "message": "Invalid Or Expired AuthorizationKey",
      "status": 404,
      "data": null
  }
  	 */


  app.get(`${baseUrl}/:userId/getUserById`, auth.isAuthorized, userController.getSingleUser);
  /**
  	 * @api {get} /api/v1/users/:userId/getUserById getSingleUser function
  	 * @apiVersion 0.0.1
  	 * @apiGroup Users
    * @apiParam {String} authToken The token for removing authToken passed as body parameter
    * @apiParam {String} userId is passed as passed as param parameter
  	 *
  	 *  @apiSuccessExample {json} Success-Response:
  	 *  {
      "error": false,
      "message": "Successfull in retrieving data",
      "status": 200,
      "data": {
        data...
      }
  }
    } 
  }
  }
  		}
  	}
  	  @apiErrorExample {json} Error-Response:
  	 *
  	 *{
      "error": true,
      "message": "Invalid Or Expired AuthorizationKey",
      "status": 404,
      "data": null
  }
  	 */

  app.put(`${baseUrl}/sendFriendRequest`, auth.isAuthorized, userController.sendFriendRequest);

  /**
	 * @api {put} /api/v1/users/sendFriendRequest logout sendFriendRequest
	 * @apiVersion 0.0.1
	 * @apiGroup Users
   * @apiParam {String} authToken The token for removing authToken passed as body parameter
   * @apiParam {String} senderName is passed as body parameter
   * @apiParam {String} senderId is passed as body parameter
   * @apiParam {String} recieverName is passed as body parameter
   * @apiParam {String} recieverId is passed as body parameter
   * 
   * 
   * 
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
    "error": false,
    "message": "friend Request Sent successfully",
    "status": 200,
    "data": null
}
  } 
}
}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 *{
    "error": true,
    "message": "Invalid Or Expired AuthorizationKey",
    "status": 404,
    "data": null
}
	 */

  app.put(`${baseUrl}/acceptFriendRequest`, auth.isAuthorized, userController.acceptFriendRequest);


  /**
	 * @api {post} /api/v1/users/acceptFriendRequest logout acceptFriendRequest
	 * @apiVersion 0.0.1
	 * @apiGroup Users
   * @apiParam {String} authToken The token for removing authToken passed as body parameter
   * @apiParam {String} senderName is passed as body parameter
   * @apiParam {String} senderId is passed as body parameter
   * @apiParam {String} recieverName is passed as body parameter
   * @apiParam {String} recieverId is passed as body parameter
   * 
   * 
   * 
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
    "error": false,
    "message": "friend Request accepted successfully",
    "status": 200,
    "data": null
}
  } 
}
}
		}
  }
  
	  @apiErrorExample {json} Error-Response:
	 *
	 *{
    "error": true,
    "message": "Invalid Or Expired AuthorizationKey",
    "status": 404,
    "data": null
}
	 */

  app.put(`${baseUrl}/rejectFriendRequest`, auth.isAuthorized, userController.rejectFriendRequest);

  /**
	 * @api {post} /api/v1/users/rejectFriendRequest logout rejectFriendRequest
	 * @apiVersion 0.0.1
	 * @apiGroup Users
   * @apiParam {String} authToken The token for removing authToken passed as body parameter
   * @apiParam {String} senderName is passed as body parameter
   * @apiParam {String} senderId is passed as body parameter
   * @apiParam {String} recieverName is passed as body parameter
   * @apiParam {String} recieverId is passed as body parameter
   * 
   * 
   * 
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
    "error": false,
    "message": "friend Request rejected successfully",
    "status": 200,
    "data": null
}
  } 
}
}
		}
  }
  
	  @apiErrorExample {json} Error-Response:
	 *
	 *{
    "error": true,
    "message": "Invalid Or Expired AuthorizationKey",
    "status": 404,
    "data": null
}
	 */



};