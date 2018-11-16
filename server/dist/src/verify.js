'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var VerificationService = require('../services/verfication_service');
var verifyUser = exports.verifyUser = function verifyUser(req, res) {
    VerificationService.verifyUser(req.params.id).then(function () {
        res.redirect('http://localhost:8081/#/verify');
    }).catch(function (err) {
        res.status(500).send(err);
    });
};