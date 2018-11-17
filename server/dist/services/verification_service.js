'use strict';

var UserModel = require('../models/user_model');

var VerificationService = {
    /**
     * Updates the mail status of the user.
     */
    verifyUser: function verifyUser(id) {
        return new Promise(function (resolve, reject) {
            UserModel.findOneAndUpdate({ _id: id }, {
                $set: {
                    isVerified: true
                }
            }, { new: true }).exec(function (err, doc) {
                err ? reject(err) : resolve(doc);
            });
        });
    }
};

module.exports = VerificationService;