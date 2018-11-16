'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var UserServices = require('../services/user_service');
var createUser = exports.createUser = function createUser(req, res) {
    UserServices.checkUser(req.body).then(function () {
        res.status(200).send('Successfully created');
    }).catch(function (err) {
        if (err === "existing user") {
            res.status(400).json({ 'error': 'User already exists.' });
        } else {
            res.send(500).status(err);
        }
    });
};