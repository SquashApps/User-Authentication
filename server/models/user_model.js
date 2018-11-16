const mongoose  = require('mongoose');
const userSchema = require("./schemas/user_schema");

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;