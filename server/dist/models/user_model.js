'use strict';

var mongoose = require('mongoose');
var userSchema = require("./schemas/user_schema");

var UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;