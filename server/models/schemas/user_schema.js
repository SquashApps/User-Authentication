let mongoose = require('mongoose');
const EncryptionService = require('../../services/encryption_service')

let userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    salt: { type: String }
}, { strict: true });

// Pre hook to hash password
userSchema.pre('save', function (next) {
    let user = this;
    let saltAndHash = EncryptionService.saltHashPassword(user.password);
    user.password = saltAndHash.passwordHash;
    user.salt = saltAndHash.salt;
    next();
})

userSchema.index({ 'email': 1 });

module.exports = userSchema;
