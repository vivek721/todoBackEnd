'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let todoSchema = new Schema({
  todoId: {
    type: String,
    unique: true
  },
  title: {
    type: String,
    default: ''
  },
  subtasks: {
    type: Array,
    default: null
  },
  status: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: String,
    default: ''
  },
  lastModified: {
    type: Date,
    default: Date.now
  },
  canDelete: {
    type: Boolean,
    default: true
  }
})


mongoose.model('Todo', todoSchema);