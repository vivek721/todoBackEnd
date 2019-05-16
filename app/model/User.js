'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let userSchema = new Schema({
  userId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  userPassword: {
    type: String,
    default: 'defaultPassword'
  },
  emailId: {
    type: String,
    default: ''
  },
  mobileNumber: {
    type: String,
    default: 0
  },
  friendList: {
    type: Array,
    default: null
  },
  requestSent: {
    type: Array,
    default: null
  },
  requestRecieved: {
    type: Array,
    default: null
  }
})


mongoose.model('User', userSchema);