'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var LoginServices = require('../services/login_service');
var entryCheck = exports.entryCheck = function entryCheck(req, res) {
    LoginServices.checkUserVerification(req.body).then(function () {
        res.status(200).json({ 'user': 'verified' });
    }).catch(function (err) {
        if (err === "Invalid user") {
            res.status(400).json({ 'error': 'User is not present.' });
        } else {
            res.send(500).status(err);
        }
    });
};