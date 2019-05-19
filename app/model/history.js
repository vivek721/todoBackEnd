const mongoose = require('mongoose')
// import schema 
const Schema = mongoose.Schema;

let historySchema = new Schema({
  todoId: {
    type: String,
    unique: true
  },
  history: {
    type: Array,
    default: null
  }
})

mongoose.model('History', historySchema);