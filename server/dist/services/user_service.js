'use strict';

var UserModel = require('../models/user_model');
var lodash = require("lodash");
var MailService = require('./mail_service');
var config = require('../constant');

var UserService = {
    // creating a new user
    createUser: function createUser(userDetails) {
        return new Promise(function (resolve, reject) {
            var newUser = new UserModel(userDetails);
            newUser.save(function (err, savedUser) {
                if (err) {
                    reject(err);
                } else {
                    MailService.sendMail(savedUser);
                    resolve();
                }
            });
        });
    },

    // check the existing user
    checkIfUserExists: function checkIfUserExists(userDetails) {
        return new Promise(function (resolve, reject) {
            UserModel.find({ email: userDetails.email }, function (err, user) {
                if (lodash.isEmpty(user)) {
                    resolve();
                } else if (err) {
                    reject(err);
                } else {
                    reject(config.EXISTING_USER);
                }
            });
        });
    },

    createUserIfNotExisting: function createUserIfNotExisting(userDetails) {
        return new Promise(function (resolve, reject) {
            UserService.checkIfUserExists(userDetails).then(function () {
                UserService.createUser(userDetails).then(function () {
                    return resolve();
                });
            }).catch(function (err) {
                reject(err);
            });
        });
    }
};

module.exports = UserService;