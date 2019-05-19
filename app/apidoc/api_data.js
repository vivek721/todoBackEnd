define({ "api": [
  {
    "type": "get",
    "url": "/api/v1/todo/:userId/get",
    "title": "Get all todo for a user as array",
    "version": "0.0.1",
    "group": "Todo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>is paased as param parameter.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " [{\n    \"_id\" : ObjectId(\"5ce10c9e360a030ef842ae4e\"),\n    \"todoId\" : \"5mENBEPWJ\",\n    \"canDelete\" : true,\n    \"lastModified\" : ISODate(\"2019-05-19T07:58:22.657Z\"),\n    \"createdBy\" : \"M2QtAkZUF\",\n    \"status\" : false,\n    \"subtasks\" : [ \n        {\n            \"subStatus\" : false,\n            \"subTitle\" : \"asdas\"\n        }\n    ],\n    \"title\" : \"Something\",\n    \"__v\" : 0\n}]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"Invalid Or Expired AuthorizationKey\",\n    \"status\": 404,\n    \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/todo.js",
    "groupTitle": "Todo",
    "name": "GetApiV1TodoUseridGet"
  },
  {
    "type": "get",
    "url": "/api/v1/todo/view/:todoId",
    "title": "viewByTodoId function",
    "version": "0.0.1",
    "group": "Todo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "todoId",
            "description": "<p>is paased as param parameter.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    error: 'true',\n    message: 'Succesfully return the Todos', \n    status:500,\n    data: {{\n    \"_id\" : ObjectId(\"5ce10c9e360a030ef842ae4e\"),\n    \"todoId\" : \"5mENBEPWJ\",\n    \"canDelete\" : true,\n    \"lastModified\" : ISODate(\"2019-05-19T07:58:22.657Z\"),\n    \"createdBy\" : \"M2QtAkZUF\",\n    \"status\" : false,\n    \"subtasks\" : [ \n        {\n            \"subStatus\" : false,\n            \"subTitle\" : \"asdas\"\n        }\n    ],\n    \"title\" : \"Something\",\n    \"__v\" : 0\n}};\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"Invalid Or Expired AuthorizationKey\",\n    \"status\": 404,\n    \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/todo.js",
    "groupTitle": "Todo",
    "name": "GetApiV1TodoViewTodoid"
  },
  {
    "type": "post",
    "url": "/api/v1/todo/create",
    "title": "Get all todo for a user as array",
    "version": "0.0.1",
    "group": "Todo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>is paased as body parameter.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "subtasks",
            "description": "<p>is paased as body parameter.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>is paased as body parameter.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "createdBy",
            "description": "<p>is paased as body parameter.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "canDelete",
            "description": "<p>is paased as body parameter.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    error: 'true',\n    message: 'Todo Created Successfully', \n    status:500,\n    data: {};\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"Invalid Or Expired AuthorizationKey\",\n    \"status\": 404,\n    \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/todo.js",
    "groupTitle": "Todo",
    "name": "PostApiV1TodoCreate"
  },
  {
    "type": "post",
    "url": "/api/v1/todo/:todoId/delete",
    "title": "deleteTodo function",
    "version": "0.0.1",
    "group": "Todo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "todoId",
            "description": "<p>is paased as body parameter.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    error: 'true',\n    message: 'Todo Deleted Successfully', \n    status:500,\n    data: {};\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"Invalid Or Expired AuthorizationKey\",\n    \"status\": 404,\n    \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/todo.js",
    "groupTitle": "Todo",
    "name": "PostApiV1TodoTodoidDelete"
  },
  {
    "type": "post",
    "url": "/api/v1/todo/:todoId/edit",
    "title": "Get all todo for a user as array",
    "version": "0.0.1",
    "group": "Todo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "todoId",
            "description": "<p>is paased as body parameter.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "subtasks",
            "description": "<p>is paased as body parameter.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>is paased as body parameter.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "createdBy",
            "description": "<p>is paased as body parameter.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "canDelete",
            "description": "<p>is paased as body parameter.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    error: 'true',\n    message: 'Eddited successfully', \n    status:500,\n    data: { };\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"Invalid Or Expired AuthorizationKey\",\n    \"status\": 404,\n    \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/todo.js",
    "groupTitle": "Todo",
    "name": "PostApiV1TodoTodoidEdit"
  },
  {
    "type": "post",
    "url": "/api/v1/todo/:todoId/undoTodo",
    "title": "undoTodo function",
    "version": "0.0.1",
    "group": "Todo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "todoId",
            "description": "<p>is paased as param parameter.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    error: 'true',\n    message: 'undo successfull', \n    status:500,\n    data: {};\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"Invalid Or Expired AuthorizationKey\",\n    \"status\": 404,\n    \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/todo.js",
    "groupTitle": "Todo",
    "name": "PostApiV1TodoTodoidUndotodo"
  },
  {
    "type": "get",
    "url": "/api/v1/users/countryCode",
    "title": "Get country codes",
    "version": "0.0.1",
    "group": "Users",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     \"BD\": \"880\",\n    \"BE\": \"32\",\n    \"BF\": \"226\",\n    \"BG\": \"359\",\n    \"BA\": \"387\",\n    \"BB\": \"+1-246\",\n    \"WF\": \"681\",\n    .....\n}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "Users",
    "name": "GetApiV1UsersCountrycode"
  },
  {
    "type": "get",
    "url": "/api/v1/users/countryName",
    "title": "Get country Names",
    "version": "0.0.1",
    "group": "Users",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"BD\": \"Bangladesh\",\n    \"BE\": \"Belgium\",\n    \"BF\": \"Burkina Faso\",\n    \"BG\": \"Bulgaria\",\n    \"BA\": \"Bosnia and Herzegovina\",\n    .....\n}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "Users",
    "name": "GetApiV1UsersCountryname"
  },
  {
    "type": "get",
    "url": "/api/v1/users/:userId/getAll",
    "title": "getAllUsers function",
    "version": "0.0.1",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for removing authToken passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>is passed as passed as param parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     \"error\": false,\n     \"message\": \"Logged Out Successfully\",\n     \"status\": 200,\n     \"data\": null\n }\n   } \n }\n }\n \t\t}\n \t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n      \"error\": true,\n      \"message\": \"Invalid Or Expired AuthorizationKey\",\n      \"status\": 404,\n      \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "Users",
    "name": "GetApiV1UsersUseridGetall"
  },
  {
    "type": "get",
    "url": "/api/v1/users/:userId/getUserById",
    "title": "getSingleUser function",
    "version": "0.0.1",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for removing authToken passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>is passed as passed as param parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     \"error\": false,\n     \"message\": \"Successfull in retrieving data\",\n     \"status\": 200,\n     \"data\": {\n       data...\n     }\n }\n   } \n }\n }\n \t\t}\n \t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n      \"error\": true,\n      \"message\": \"Invalid Or Expired AuthorizationKey\",\n      \"status\": 404,\n      \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "Users",
    "name": "GetApiV1UsersUseridGetuserbyid"
  },
  {
    "type": "post",
    "url": "/api/v1/users/acceptFriendRequest",
    "title": "logout acceptFriendRequest",
    "version": "0.0.1",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for removing authToken passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "senderName",
            "description": "<p>is passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "senderId",
            "description": "<p>is passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recieverName",
            "description": "<p>is passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recieverId",
            "description": "<p>is passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"friend Request accepted successfully\",\n    \"status\": 200,\n    \"data\": null\n}\n  } \n}\n}\n\t\t}\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"Invalid Or Expired AuthorizationKey\",\n    \"status\": 404,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "Users",
    "name": "PostApiV1UsersAcceptfriendrequest"
  },
  {
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "login function",
    "version": "0.0.1",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": "<p>emailId of the user is passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userPassword",
            "description": "<p>userPassword of the user is passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Login Successful\",\n    \"status\": 200,\n    \"data\": {\n        \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IkQ5ZG9PanFNciIsImlhdCI6MTU1NjExNDk0MDM2NiwiZXhwIjoxNTU2MjAxMzQwLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7ImlzQWRtaW4iOmZNlLCJtb2JpbGVOdW1iZXIiOiI0MzU0MzU0NTM0MyIsImVtYWlsSWQiOiJtaW5pY2FAZ21haWwuY29tIiwibGFzdE5hbWUiOiJtaXNocmEiLCJmaXJzdE5hbWUiOiJtb25pY2EiLCJ1c2VySWQiOiJkWW1XTU5tclMifX0.TihL6E4pbguqfCZ3f8mT0WYkOuUhd9scMDfkKkN376M\",\n        \"userDetails\": {\n            \"isAdmin\": false,\n            \"mobileNumber\": \"43543545343\",\n            \"emailId\": \"asdasd@gmail.com\",\n            \"lastName\": \"asdasd\",\n            \"firstName\": \"asddsaf\",\n            \"userId\": \"dYmWMNmrS\"\n        }\n    }\n}\n}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"No User Details Found\",\n    \"status\": 404,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "Users",
    "name": "PostApiV1UsersLogin"
  },
  {
    "type": "post",
    "url": "/api/v1/users/logout",
    "title": "logout function",
    "version": "0.0.1",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for removing authToken passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Logged Out Successfully\",\n    \"status\": 200,\n    \"data\": null\n}\n  } \n}\n}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"Invalid Or Expired AuthorizationKey\",\n    \"status\": 404,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "Users",
    "name": "PostApiV1UsersLogout"
  },
  {
    "type": "post",
    "url": "/api/v1/users/rejectFriendRequest",
    "title": "logout rejectFriendRequest",
    "version": "0.0.1",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for removing authToken passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "senderName",
            "description": "<p>is passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "senderId",
            "description": "<p>is passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recieverName",
            "description": "<p>is passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recieverId",
            "description": "<p>is passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"friend Request rejected successfully\",\n    \"status\": 200,\n    \"data\": null\n}\n  } \n}\n}\n\t\t}\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"Invalid Or Expired AuthorizationKey\",\n    \"status\": 404,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "Users",
    "name": "PostApiV1UsersRejectfriendrequest"
  },
  {
    "type": "post",
    "url": "/api/v1/users/resetNewPassword",
    "title": "resetNewPassword function",
    "version": "0.0.1",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user is passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userPassword",
            "description": "<p>userPassword of the user is passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"User password updated\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 1,\n        \"nModified\": 1,\n        \"ok\": 1\n    }\n  } \n}\n}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"No User Details Found\",\n    \"status\": 404,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "Users",
    "name": "PostApiV1UsersResetnewpassword"
  },
  {
    "type": "post",
    "url": "/api/v1/users/resetPassword",
    "title": "resetPassword mail function",
    "version": "0.0.1",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": "<p>emailId of the user is passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Reset mail sent and Auth deleted Successfully\",\n    \"status\": 200,\n    \"data\": null\n}\n}\n}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"No User Details Found\",\n    \"status\": 404,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "Users",
    "name": "PostApiV1UsersResetpassword"
  },
  {
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "Signup function",
    "version": "0.0.1",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>firstName of the user is passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>lastName of the user is passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": "<p>emailId of the user is passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>phoneNumber of the user is passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userPassword",
            "description": "<p>userPassword of the user is passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"User created\",\n    \"status\": 200,\n    \"data\": {\n        \"__v\": 0,\n        \"_id\": \"5cc06d9514f66619786b86c8\",\n        \"isAdmin\": false,\n        \"createdOn\": \"2019-04-24T14:07:17.000Z\",\n        \"mobileNumber\": \"43543545343\",\n        \"emailId\": \"assddw@gmail.com\",\n        \"lastName\": \"sadasd\",\n        \"firstName\": \"asasd\",\n        \"userId\": \"dYmWMNmrS\"\n    }\n}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"Email Does not met the requirement\",\n    \"status\": 400,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "Users",
    "name": "PostApiV1UsersSignup"
  },
  {
    "type": "put",
    "url": "/api/v1/users/sendFriendRequest",
    "title": "logout sendFriendRequest",
    "version": "0.0.1",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for removing authToken passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "senderName",
            "description": "<p>is passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "senderId",
            "description": "<p>is passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recieverName",
            "description": "<p>is passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recieverId",
            "description": "<p>is passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"friend Request Sent successfully\",\n    \"status\": 200,\n    \"data\": null\n}\n  } \n}\n}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"Invalid Or Expired AuthorizationKey\",\n    \"status\": 404,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "Users",
    "name": "PutApiV1UsersSendfriendrequest"
  }
] });
