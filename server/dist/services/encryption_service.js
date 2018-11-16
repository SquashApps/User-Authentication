'use strict';

var crypto = require('crypto');
var atob = require('atob');
var EncryptionService = {
    genRandomString: function genRandomString(length) {
        // generated a random string of size 16
        try {
            return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
        } catch (err) {
            console.error('genRandomString', err);
        }
    },

    /**
     * Used sha512 along with salt value to hash the function
     */

    sha512: function sha512(password, salt) {
        try {
            var hash = crypto.createHmac('sha512', salt);
            hash.update(password);
            var value = hash.digest('hex');
            return {
                salt: salt,
                passwordHash: value
            };
        } catch (err) {
            console.error('sha512', err);
        }
    },
    /**
     * Encrypts the password using salt and sha512
     */
    saltHashPassword: function saltHashPassword(userpassword) {
        try {
            var salt = EncryptionService.genRandomString(16);
            userpassword = atob(userpassword);
            var passwordData = EncryptionService.sha512(userpassword, salt);
            return passwordData;
        } catch (err) {
            console.error('SaltAndHashPassword', err);
        }
    },
    /**
     * Cross-checking of password during user sign-in
     */
    saltHashExistingUserPassword: function saltHashExistingUserPassword(userpassword, salt) {
        try {
            var passwordData = EncryptionService.sha512(userpassword, salt);
            return passwordData;
        } catch (err) {
            console.error('SaltHashExistingUserPassword', err);
        }
    }

};

module.exports = EncryptionService;