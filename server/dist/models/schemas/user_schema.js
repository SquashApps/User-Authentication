'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    name: { type: String },
    email: { type: String },
    password: { type: String },
    isVerified: { type: Boolean, default: false },
    salt: { type: String }
}, { strict: true });

userSchema.index({ 'email': 1 });

module.exports = userSchema;