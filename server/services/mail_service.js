const nodemailer = require('nodemailer');
const constant = require('../constant');

let MailServices = {
    /**
     * Used gmail as a service to send mail
     */
    sendMail: (userDetails) => {
        let transporter = nodemailer.createTransport({
            service: constant.SERVICE,
            auth: {
                user: constant.EMAIL,
                pass: constant.PASSWORD
            }
        });

        const url = constant.NOTIFICATION_URL + `${userDetails._id}`;

        /**
         * Passed the userId as a parameter to check whether the link is not malformed.
         */

        const mailOptions = {
            from: constant.EMAIL,
            to: userDetails.email,
            subject: 'Verification mail',
            html: `<p>Click on the following link to complete the verification <a href =${url}>verify</a></p>`
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err){
                console.error(err)
            }
        });
    }
}

module.exports = MailServices;
