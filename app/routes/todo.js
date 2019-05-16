const express = require('express');
const appConfig = require("../../config/appConfig")
const userController = require("../controller/userController");
const todoController = require("../controller/todoController")

const fs = require("fs")
const auth = require("../middlewares/auth");


module.exports.setRouter = (app) => {
  let baseUrl = `${appConfig.apiVersion}/todo`;

  app.get(baseUrl + '/:userId/get', auth.isAuthorized, todoController.getAllTodos);

  app.post(baseUrl + '/create', auth.isAuthorized, todoController.createTodo);

  app.post(baseUrl + '/:todoId/delete', auth.isAuthorized, todoController.deleteTodo);

  app.get(baseUrl + '/view/:todoId', auth.isAuthorized, todoController.viewByTodoId);

  app.put(baseUrl + '/:todoId/edit', auth.isAuthorized, todoController.editTodo);



}