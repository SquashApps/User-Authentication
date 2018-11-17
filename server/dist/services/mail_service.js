'use strict';

var nodemailer = require('nodemailer');
var constant = require('../constant');

var MailServices = {
    /**
     * Used gmail as a service to send mail
     */
    sendMail: function sendMail(userDetails) {
        var transporter = nodemailer.createTransport({
            service: constant.SERVICE,
            auth: {
                user: constant.EMAIL,
                pass: constant.PASSWORD
            }
        });

        var url = constant.NOTIFICATION_URL + ('' + userDetails._id);

        /**
         * Passed the userId as a parameter to check whether the link is not malformed.
         */

        var mailOptions = {
            from: constant.EMAIL,
            to: userDetails.email,
            subject: 'Verification mail',
            html: '<p>Click on the following link to complete the verification <a href =' + url + '>verify</a></p>'
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.error(err);
            }
        });
    }
};

module.exports = MailServices;