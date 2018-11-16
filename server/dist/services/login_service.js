'use strict';

var UserModel = require('../models/user_model');
var lodash = require("lodash");
var EncryptionService = require('./encryption_service');

var LoginService = {
    /**
     * Verifiy whether the user is a valid user
     */
    checkUserVerification: function checkUserVerification(body) {
        return new Promise(function (resolve, reject) {
            UserModel.findOne({ email: body.email, isVerified: true }, function (err, doc) {
                if (lodash.isEmpty(doc)) {
                    reject('Invalid user');
                } else if (err) {
                    reject(err);
                } else {
                    LoginService.checkPasswordMatch(body.password, doc).then(function (message) {
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
    checkPasswordMatch: async function checkPasswordMatch(password, doc) {
        return new Promise(async function (resolve, reject) {
            var passwordHash = await EncryptionService.saltHashExistingUserPassword(password, doc.salt);
            if (passwordHash.passwordHash === doc.password) {
                console.log('password matched');
                resolve();
            } else {
                reject();
            }
        });
    }
};

module.exports = LoginService;