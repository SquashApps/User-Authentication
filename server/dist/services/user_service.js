"use strict";

var UserModel = require('../models/user_model');
var lodash = require("lodash");
var async = require("async");
var EncryptionService = require('./encryption_service');
var MailService = require('./mail_service');

var UserService = {
    // creating a new user
    createUser: async function createUser(body) {
        return new Promise(async function (resolve, reject) {
            var saltAndHash = await EncryptionService.saltHashPassword(body.password);
            UserModel.findOneAndUpdate({ email: body.email }, {
                $set: {
                    email: body.email,
                    name: body.name,
                    password: saltAndHash.passwordHash,
                    salt: saltAndHash.salt
                }
            }, { new: true, upsert: true }).exec(function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    MailService.sendMail(data);
                    resolve(data);
                }
            });
        });
    },

    // check the existing user
    checkExistingUser: function checkExistingUser(body) {
        return new Promise(function (resolve, reject) {
            UserModel.find({ email: body.email }, function (err, docs) {
                if (lodash.isEmpty(docs)) {
                    resolve(body);
                } else if (err) {
                    reject(err);
                } else {
                    reject('existing user');
                }
            });
        });
    },

    checkUser: function checkUser(body) {
        return new Promise(function (resolve, reject) {
            UserService.checkExistingUser(body).then(function (body) {
                UserService.createUser(body);
                resolve();
            }).catch(function (err) {
                reject(err);
            });
        });
    }

};

module.exports = UserService;