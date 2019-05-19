const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const check = require('./../libs/checkLib')
/* Models */
const TodoModel = mongoose.model('Todo')
const HistoryModel = mongoose.model("History")


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
          lastModified: today,
          canDelete: false
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

  let createTodoHistory = (result) => {
    return new Promise((resolve, reject) => {
      console.log(req.body)
      if (check.isEmpty(req.body.title)) {

        console.log("403, forbidden request");
        let apiResponse = response.generate(true, 'required parameters are missing', 403, null)
        reject(apiResponse)
      } else {

        let todoId = result.todoId;

        let newTodo = new HistoryModel({
          todoId: todoId,
          history: [result],

        }) // end new todo model

        newTodo.save((err, result) => {
          if (err) {
            console.log('Error Occured.')
            logger.error(`Error Occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(true, 'Error Occured.', 500, null)
            reject(apiResponse)
          } else {
            console.log('Success in todo history creation')
            resolve(result)
          }
        }) // end new todo save
      }
    }) // end new todo promise
  } // end create todo function 


  // making promise call.
  todoCreationFunction()
    .then(createTodoHistory)
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
  let deleteTodoSchema = () => {
    return new Promise((resolve, reject) => {
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
            reject(apiResponse)
          } else if (check.isEmpty(result)) {
            console.log('Todo Not Found.')
            let apiResponse = response.generate(true, 'Todo Not Found.', 404, null)
            reject(apiResponse)
          } else {
            console.log('Todo Deletion Success')
            let apiResponse = response.generate(false, 'Todo Deleted Successfully', 200, result)
            resolve(apiResponse)
          }
        })
      }
    })
  }
  let deleteHistorySchema = () => {
    return new Promise((resolve, reject) => {
      HistoryModel.remove({
        'todoId': req.params.todoId
      }, (err, result) => {
        if (err) {
          console.log('Error Occured.')
          logger.error(`Error Occured : ${err}`, 'Database', 10)
          let apiResponse = response.generate(true, 'Error Occured.', 500, null)
          reject(apiResponse)
        } else if (check.isEmpty(result)) {
          console.log('Todo Not Found.')
          let apiResponse = response.generate(true, 'Todo Not Found.', 404, null)
          reject(apiResponse)
        } else {
          console.log('Todo Deletion Success')
          let apiResponse = response.generate(false, 'Todo Deleted from history table Successfully', 200, result)
          resolve(apiResponse)
        }
      })
    })
  }
  deleteTodoSchema()
    .then(deleteHistorySchema)
    .then((result) => {
      let apiResponse = response.generate(false, 'Todo Deletdsuccessfully', 200, result)
      res.send(apiResponse)
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
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
  let editTodoinSchema = () => {
    return new Promise((resolve, reject) => {

      if (check.isEmpty(req.params.todoId)) {

        console.log('todoId is missing')
        let apiResponse = response.generate(true, 'todoId is missing', 403, null)
        reject(apiResponse)
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
            reject(apiResponse)
          } else if (check.isEmpty(result)) {

            console.log('Todo Not Found.')
            let apiResponse = response.generate(true, 'Todo Not Found', 404, null)
            reject(apiResponse)
          } else {
            console.log('Todo Edited Successfully')
            let apiResponse = response.generate(false, 'Todo Edited Successfully.', 200, result)
            resolve(apiResponse)
          }
        })
      }
    })
  }
  let addTodoHistory = () => {
    console.log("\nin addTodoHistory")
    return new Promise((resolve, reject) => {
      if (check.isEmpty(req.params.todoId)) {

        console.log('todoId should be passed')
        let apiResponse = response.generate(true, 'todoId is missing', 403, null)
        reject(apiResponse)
      } else {
        console.log("options" + req.body + "\nreqtodoid" + req.params.todoId);
        let options = req.body;
        console.log(options);
        HistoryModel.updateOne({
            'todoId': req.params.todoId
          }, {
            $push: {
              history: options
            }
          })
          .exec((err, result) => {

            if (err) {

              console.log('Error Occured.')
              logger.error(`Error Occured : ${err}`, 'Database', 10)
              let apiResponse = response.generate(true, 'Error Occured.', 500, null)
              reject(apiResponse)
            } else if (check.isEmpty(result)) {

              console.log('Todo Not Found.')
              let apiResponse = response.generate(true, 'Todo Not Found', 404, null)
              reject(apiResponse)
            } else {
              console.log('Todo History pushed Successfully')
              let apiResponse = response.generate(false, 'Todo history pushed Successfully.', 200, result)
              resolve(apiResponse)
            }
          })
      }
    })
  }
  // making promise call.
  editTodoinSchema()
    .then(addTodoHistory)
    .then((result) => {
      let apiResponse = response.generate(false, 'Todo Edited by ' + req.body.editedBy.userName, 200, result)
      res.send(apiResponse)
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
}

let undoTodo = (req, res) => {

  let deleteTodoHistory = () => {
    return new Promise((resolve, reject) => {
      if (check.isEmpty(req.params.todoId)) {

        console.log('todoId should be passed')
        let apiResponse = response.generate(true, 'todoId is missing', 403, null)
        reject(apiResponse)
      } else {

        let options = req.body;
        console.log(options);
        HistoryModel.update({
            'todoId': req.params.todoId,
            'history.canDelete': true
          }, {
            $pop: {
              history: 1
            }
          })
          .exec((err, result) => {

            if (err) {

              console.log('Error Occured.')
              logger.error(`Error Occured : ${err}`, 'Database', 10)
              let apiResponse = response.generate(true, 'Error Occured.', 500, null)
              reject(apiResponse)
            } else if (check.isEmpty(result)) {

              console.log('Todo Not Found.')
              let apiResponse = response.generate(true, 'Todo Not Found', 404, null)
              reject(apiResponse)
            } else {
              console.log('the poped element is:' + result)
              let apiResponse = response.generate(false, 'Todo Current history removed Successfully.', 200, result)
              resolve(apiResponse)
            }
          })
      }
    })
  }

  let readTodoHistory = () => {
    return new Promise((resolve, reject) => {
      if (check.isEmpty(req.params.todoId)) {

        console.log('todoId should be passed')
        let apiResponse = response.generate(true, 'todoId is missing', 403, null)
        res.send(apiResponse)
      } else {

        let options = req.body;
        console.log(options);
        HistoryModel.find({
            'todoId': req.params.todoId
          }, {
            'history': {
              '$slice': -1
            },
            todoId: 0
          })
          .exec((err, result) => {
            if (err) {

              console.log('Error Occured.')
              logger.error(`Error Occured : ${err}`, 'Database', 10)
              let apiResponse = response.generate(true, 'Error Occured.', 500, null)
              reject(apiResponse)
            } else if (check.isEmpty(result)) {

              console.log('Todo Not Found.')
              let apiResponse = response.generate(true, 'Todo Not Found', 404, null)
              reject(apiResponse)
            } else {
              console.log('Todo history Data Found Successfully: ' + result)
              let apiResponse = response.generate(false, 'Todo History Data Found Successfully', 200, result)
              resolve(result)
            }
          })
      }
    })
  }


  let editTodo = (result) => {
    return new Promise((resolve, reject) => {
      if (check.isEmpty(req.params.todoId)) {

        console.log('todoId should be passed')
        let apiResponse = response.generate(true, 'todoId is missing', 403, null)
        reject(apiResponse)
      } else {

        const options = result.map((data) => {
          return data.history.map(mappedResult => mappedResult)
        });
        const finalOption = options[0][0];
        //console.log('todo final edited value'+result);
        console.log('finaal object', finalOption);
        if (finalOption != undefined) {
          TodoModel.update({
            'todoId': req.params.todoId
          }, finalOption, {
            multi: true
          }).exec((err, result) => {

            if (err) {

              console.log('Error Occured.')
              logger.error(`Error Occured : ${err}`, 'Database', 10)
              let apiResponse = response.generate(true, 'Error Occured.', 500, null)
              reject(apiResponse)
            } else if (check.isEmpty(result)) {

              console.log('Todo Not Found.')
              let apiResponse = response.generate(true, 'Todo Not Found', 404, null)
              reject(apiResponse)
            } else {
              console.log('Todo Edited Successfully')
              let userName = req.query.userName;
              let apiResponse = response.generate(false, 'Todo edited by ' + userName, 200, result)
              resolve(apiResponse)
            }
          })
        } else {
          console.log('Todo cant be edited beyond this!')
          let apiResponse = response.generate(true, 'Todo cant be edited beyond this!', 500, null)
          reject(apiResponse)
        }
      }
    })
  }

  // making promise call.
  deleteTodoHistory()
    .then(readTodoHistory)
    .then(editTodo)
    .then((result) => {
      let apiResponse = response.generate(false, 'Todo Undo successful!', 200, result)
      res.send(apiResponse)
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    })
}

module.exports = {

  getAllTodos: getAllTodos,
  createTodo: createTodo,
  deleteTodo: deleteTodo,
  viewByTodoId: viewByTodoId,
  editTodo: editTodo,
  undoTodo: undoTodo
} // end exports