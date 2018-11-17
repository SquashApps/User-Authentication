'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var LoginServices = require('../services/login_service');
var config = require('../constant');

var entryCheck = exports.entryCheck = function entryCheck(req, res) {
    var _req$body = req.body,
        email = _req$body.email,
        password = _req$body.password;

    if (!email || !password) {
        res.sendStatus(400);
        return;
    }
    LoginServices.checkIfUserIsVerified(email, password).then(function () {
        res.status(200).json({ verified: true });
        return;
    }).catch(function (err) {
        if (err === config.INVALID_USER) {
            res.status(400).json({ verified: false, 'error': 'User is not present.' });
            return;
        }
        res.send(500).status({ verified: false, error: err });
    });
};