'use strict';

var UserModel = require('../models/user_model');
var lodash = require("lodash");
var EncryptionService = require('./encryption_service');
var config = require('../constant');

var LoginService = {
    /**
     * Verifiy whether the user is a valid user
     */
    checkIfUserIsVerified: function checkIfUserIsVerified(email, password) {
        return new Promise(function (resolve, reject) {
            UserModel.findOne({ email: email, isVerified: true }, function (err, doc) {
                if (lodash.isEmpty(doc)) {
                    reject(config.INVALID_USER);
                } else if (err) {
                    reject(err);
                } else {
                    LoginService.checkIfPasswordsMatch(password, doc).then(function (message) {
                        return resolve(message);
                    }).catch(function (err) {
                        return reject(err);
                    });
                }
            });
        });
    },
    /**
     * check whether the signup password matches with the login one
     */
    checkIfPasswordsMatch: async function checkIfPasswordsMatch(password, doc) {
        return new Promise(async function (resolve, reject) {
            var passwordHash = await EncryptionService.saltHashExistingUserPassword(password, doc.salt);
            if (passwordHash.passwordHash === doc.password) {
                resolve();
            } else {
                reject();
            }
        });
    }
};

module.exports = LoginService;