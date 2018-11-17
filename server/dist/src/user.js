'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var UserServices = require('../services/user_service');
var config = require('../constant');
var lodash = require("lodash");

var createUser = exports.createUser = function createUser(req, res) {
    var userDetails = lodash.pick(req.body, ['name', 'email', 'password']);
    if (!userDetails.email || !userDetails.password) {
        res.sendStatus(400);
        return;
    }
    UserServices.createUserIfNotExisting(userDetails).then(function () {
        res.sendStatus(201);
        return;
    }).catch(function (err) {
        if (err === config.EXISTING_USER) {
            res.status(400).json({ created: false, 'error': 'User already exists' });
            return;
        }
    });
};