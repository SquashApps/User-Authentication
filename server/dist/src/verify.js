'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var VerificationService = require('../services/verification_service');
var config = require('../constant');
var mongoose = require('mongoose');

var verifyUser = exports.verifyUser = function verifyUser(req, res) {
    var id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.sendStatus(400);
        return;
    }
    VerificationService.verifyUser(id).then(function () {
        res.redirect(config.REDIRECT_URL);
        return;
    }).catch(function (err) {
        res.status(500).json({ verfication: 'failed', error: err });
    });
};