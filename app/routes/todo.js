const express = require('express');
const appConfig = require("../../config/appConfig")
const userController = require("../controller/userController");
const todoController = require("../controller/todoController")

const fs = require("fs")
const auth = require("../middlewares/auth");


module.exports.setRouter = (app) => {
  let baseUrl = `${appConfig.apiVersion}/todo`;

  app.get(baseUrl + '/:userId/get', auth.isAuthorized, todoController.getAllTodos);

  /**
	 * @api {get} /api/v1/todo/:userId/get Get all todo for a user as array
	 * @apiVersion 0.0.1
	 * @apiGroup Todo
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
   * @apiParam {String} userId is paased as param parameter.
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  [{
    "_id" : ObjectId("5ce10c9e360a030ef842ae4e"),
    "todoId" : "5mENBEPWJ",
    "canDelete" : true,
    "lastModified" : ISODate("2019-05-19T07:58:22.657Z"),
    "createdBy" : "M2QtAkZUF",
    "status" : false,
    "subtasks" : [ 
        {
            "subStatus" : false,
            "subTitle" : "asdas"
        }
    ],
    "title" : "Something",
    "__v" : 0
}]
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
    "error": true,
    "message": "Invalid Or Expired AuthorizationKey",
    "status": 404,
    "data": null
  } 
	 */


  app.post(baseUrl + '/create', auth.isAuthorized, todoController.createTodo);

  /**
	 * @api {post} /api/v1/todo/create Get all todo for a user as array
	 * @apiVersion 0.0.1
	 * @apiGroup Todo
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
   * @apiParam {String} title is paased as body parameter.
   * @apiParam {Array} subtasks is paased as body parameter.
   * @apiParam {Boolean} status is paased as body parameter.
   * @apiParam {String} createdBy is paased as body parameter.
   * @apiParam {Boolean} canDelete is paased as body parameter.
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *{
    error: 'true',
    message: 'Todo Created Successfully', 
    status:500,
    data: {};
]
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
    "error": true,
    "message": "Invalid Or Expired AuthorizationKey",
    "status": 404,
    "data": null
  } 
	 */

  app.post(baseUrl + '/:todoId/delete', auth.isAuthorized, todoController.deleteTodo);
  /**
	 * @api {post} /api/v1/todo/:todoId/delete deleteTodo function
	 * @apiVersion 0.0.1
	 * @apiGroup Todo
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
   * @apiParam {String} todoId is paased as body parameter.
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *{
    error: 'true',
    message: 'Todo Deleted Successfully', 
    status:500,
    data: {};
]
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
    "error": true,
    "message": "Invalid Or Expired AuthorizationKey",
    "status": 404,
    "data": null
  } 
	 */

  app.get(baseUrl + '/view/:todoId', auth.isAuthorized, todoController.viewByTodoId);
  /**
	 * @api {get} /api/v1/todo/view/:todoId viewByTodoId function
	 * @apiVersion 0.0.1
	 * @apiGroup Todo
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
   * @apiParam {String} todoId is paased as param parameter.
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *{
    error: 'true',
    message: 'Succesfully return the Todos', 
    status:500,
    data: {{
    "_id" : ObjectId("5ce10c9e360a030ef842ae4e"),
    "todoId" : "5mENBEPWJ",
    "canDelete" : true,
    "lastModified" : ISODate("2019-05-19T07:58:22.657Z"),
    "createdBy" : "M2QtAkZUF",
    "status" : false,
    "subtasks" : [ 
        {
            "subStatus" : false,
            "subTitle" : "asdas"
        }
    ],
    "title" : "Something",
    "__v" : 0
}};
]
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
    "error": true,
    "message": "Invalid Or Expired AuthorizationKey",
    "status": 404,
    "data": null
  } 
	 */

  app.put(baseUrl + '/:todoId/edit', auth.isAuthorized, todoController.editTodo);
  /**
	 * @api {post} /api/v1/todo/:todoId/edit Get all todo for a user as array
	 * @apiVersion 0.0.1
	 * @apiGroup Todo
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
   * @apiParam {String} todoId is paased as body parameter.
   * @apiParam {Array} subtasks is paased as body parameter.
   * @apiParam {Boolean} status is paased as body parameter.
   * @apiParam {String} createdBy is paased as body parameter.
   * @apiParam {Boolean} canDelete is paased as body parameter.
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *{
    error: 'true',
    message: 'Eddited successfully', 
    status:500,
    data: { };
]
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
    "error": true,
    "message": "Invalid Or Expired AuthorizationKey",
    "status": 404,
    "data": null
  } 
	 */

  app.get(baseUrl + '/:todoId/undoTodo', auth.isAuthorized, todoController.undoTodo)
  /**
	 * @api {post} /api/v1/todo/:todoId/undoTodo undoTodo function
	 * @apiVersion 0.0.1
	 * @apiGroup Todo
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
   * @apiParam {String} todoId is paased as param parameter.
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *{
    error: 'true',
    message: 'undo successfull', 
    status:500,
    data: {};
]
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
    "error": true,
    "message": "Invalid Or Expired AuthorizationKey",
    "status": 404,
    "data": null
  } 
	 */



}