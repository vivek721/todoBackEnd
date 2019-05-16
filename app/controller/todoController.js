const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const check = require('./../libs/checkLib')
/* Models */
const TodoModel = mongoose.model('Todo')


/**
 * function to create the todo.
 */
let createTodo = (req, res) => {
  let todoCreationFunction = () => {
    return new Promise((resolve, reject) => {
      console.log(req.body)
      if (check.isEmpty(req.body.title)) {

        console.log("403, forbidden request");
        let apiResponse = response.generate(true, 'required parameters are missing', 403, null)
        reject(apiResponse)
      } else {

        var today = Date.now()
        let todoId = shortid.generate()

        let newTodo = new TodoModel({

          todoId: todoId,
          title: req.body.title,
          subtasks: req.body.subtasks,
          status: req.body.status,
          createdBy: req.body.createdBy,
          lastModified: today
        }) // end new todo model

        newTodo.save((err, result) => {
          if (err) {
            console.log('Error Occured.')
            logger.error(`Error Occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(true, 'Error Occured.', 500, null)
            reject(apiResponse)
          } else {
            console.log('Success in todo creation')
            resolve(result)
          }
        }) // end new todo save
      }
    }) // end new todo promise
  } // end create todo function

  // making promise call.
  todoCreationFunction()
    .then((result) => {
      let apiResponse = response.generate(false, 'Todo Created successfully', 200, result)
      res.send(apiResponse)
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
}

/**
 * function to read all todos.
 */
let getAllTodos = (req, res) => {
  if (check.isEmpty(req.params.userId)) {

    console.log('todoId should be passed')
    let apiResponse = response.generate(true, 'userId is missing', 403, null)
    res.send(apiResponse)
  } else {

    TodoModel.find({
        'createdBy': req.params.userId
      }).select('-_id -__v')
      .lean().exec((err, result) => {

        if (err) {

          console.log('Error Occured.')
          logger.error(`Error Occured : ${err}`, 'Database', 10)
          let apiResponse = response.generate(true, 'Error Occured.', 500, null)
          res.send(apiResponse)
        } else if (check.isEmpty(result)) {

          console.log('UserId Not Found.')
          let apiResponse = response.generate(true, 'todo Not Found for userId', 404, null)
          res.send(apiResponse)
        } else {
          logger.info("Todo found successfully", "TodoController:getAllTodo", 5)
          let apiResponse = response.generate(false, 'todo found for userId Successfully.', 200, result)
          res.send(apiResponse)
        }
      })
  }
} // end get all todos

//delete todo
let deleteTodo = (req, res) => {

  if (check.isEmpty(req.params.todoId)) {

    console.log('todoId should be passed')
    let apiResponse = response.generate(true, 'todoId is missing', 403, null)
    res.send(apiResponse)
  } else {

    TodoModel.remove({
      'todoId': req.params.todoId
    }, (err, result) => {
      if (err) {
        console.log('Error Occured.')
        logger.error(`Error Occured : ${err}`, 'Database', 10)
        let apiResponse = response.generate(true, 'Error Occured.', 500, null)
        res.send(apiResponse)
      } else if (check.isEmpty(result)) {
        console.log('Todo Not Found.')
        let apiResponse = response.generate(true, 'Todo Not Found.', 404, null)
        res.send(apiResponse)
      } else {
        console.log('Todo Deletion Success')
        let apiResponse = response.generate(false, 'Todo Deleted Successfully', 200, result)
        res.send(apiResponse)
      }
    })
  }
}

/**
 * function to read single Todo.
 */
let viewByTodoId = (req, res) => {

  if (check.isEmpty(req.params.todoId)) {

    console.log('todoId should be passed')
    let apiResponse = response.generate(true, 'todoId is missing', 403, null)
    res.send(apiResponse)
  } else {

    TodoModel.findOne({
      'todoId': req.params.todoId
    }, (err, result) => {

      if (err) {

        console.log('Error Occured.')
        logger.error(`Error Occured : ${err}`, 'Database', 10)
        let apiResponse = response.generate(true, 'Error Occured.', 500, null)
        res.send(apiResponse)
      } else if (check.isEmpty(result)) {

        console.log('Todo Not Found.')
        let apiResponse = response.generate(true, 'Todo Not Found', 404, null)
        res.send(apiResponse)
      } else {
        logger.info("Todo found successfully", "TodoController:ViewTodoById", 5)
        let apiResponse = response.generate(false, 'Todo Found Successfully.', 200, result)
        res.send(apiResponse)
      }
    })
  }
}


/**
 * function to edit Todo by admin.
 */
let editTodo = (req, res) => {

  if (check.isEmpty(req.params.todoId)) {

    console.log('todoId is missing')
    let apiResponse = response.generate(true, 'todoId is missing', 403, null)
    res.send(apiResponse)
  } else {
    let options = req.body;
    console.log(options);
    TodoModel.findOneAndUpdate({
        'todoId': req.params.todoId
      },
      options
    ).exec((err, result) => {

      if (err) {

        console.log('Error Occured.')
        logger.error(`Error Occured : ${err}`, 'Database', 10)
        let apiResponse = response.generate(true, 'Error Occured.', 500, null)
        res.send(apiResponse)
      } else if (check.isEmpty(result)) {

        console.log('Todo Not Found.')
        let apiResponse = response.generate(true, 'Todo Not Found', 404, null)
        res.send(apiResponse)
      } else {
        console.log('Todo Edited Successfully')
        let apiResponse = response.generate(false, 'Todo Edited Successfully.', 200, result)
        res.send(apiResponse)
      }
    })
  }
}

module.exports = {

  getAllTodos: getAllTodos,
  createTodo: createTodo,
  deleteTodo: deleteTodo,
  viewByTodoId: viewByTodoId,
  editTodo: editTodo,
  /* viewByCategory: viewByCategory,
   viewByAuthor: viewByAuthor,
   
   
   increaseTodoView : increaseTodoView */
} // end exports