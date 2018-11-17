const UserModel = require('../models/user_model');
const lodash = require("lodash");
const EncryptionService = require('./encryption_service');
const config = require('../constant')

let LoginService = {
    /**
     * Verifiy whether the user is a valid user
     */
    checkIfUserIsVerified: (email, password) => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email: email, isVerified: true },
                ((err, doc) => {
                    if (lodash.isEmpty(doc)) {
                        reject(config.INVALID_USER);
                    }
                    else if (err) {
                        reject(err);
                    }
                    else {
                        LoginService.checkIfPasswordsMatch(password, doc)
                            .then((message) => resolve(message))
                            .catch((err) => reject(err))
                    }
                }))
        })
    },
    /**
     * check whether the signup password matches with the login one
     */
    checkIfPasswordsMatch: async (password, doc) => {
        return new Promise(async (resolve, reject) => {
            let passwordHash = await EncryptionService.saltHashExistingUserPassword(password, doc.salt);
            if (passwordHash.passwordHash === doc.password) {
                resolve();
            }
            else {
                reject();
            }
        })
    }
}

module.exports = LoginService;