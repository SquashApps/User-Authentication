let mongoose  = require('mongoose');

let userSchema = new mongoose.Schema({
    name: {type: String, required:true },
    email: {type: String, required:true},
    password: {type: String, required:true},
    isVerified:{type:Boolean, default:false},
    salt:{type:String}
}, {strict: true});

userSchema.index({ 'email': 1 });

module.exports = userSchema;
