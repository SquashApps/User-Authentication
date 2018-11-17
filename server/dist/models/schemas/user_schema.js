'use strict';

var mongoose = require('mongoose');
var EncryptionService = require('../../services/encryption_service');

var userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    salt: { type: String }
}, { strict: true });

// Pre hook to hash password
userSchema.pre('save', function (next) {
    var user = this;
    var saltAndHash = EncryptionService.saltHashPassword(user.password);
    user.password = saltAndHash.passwordHash;
    user.salt = saltAndHash.salt;
    next();
});

userSchema.index({ 'email': 1 });

module.exports = userSchema;