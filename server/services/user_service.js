
const UserModel = require('../models/user_model')
const lodash = require("lodash");
const EncryptionService = require('./encryption_service');
const MailService = require('./mail_service');
const config = require('../constant')

let UserService = {
    // creating a new user
    createUser: async (body) => {
        return new Promise(async (resolve, reject) => {
            let saltAndHash = await EncryptionService.saltHashPassword(body.password);
            UserModel.findOneAndUpdate({ email: body.email },
                {
                    $set: {
                        email: body.email,
                        name: body.name,
                        password: saltAndHash.passwordHash,
                        salt: saltAndHash.salt
                    }
                },
                { new: true, upsert: true }
            ).exec((err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    MailService.sendMail(data);
                    resolve(data);
                }
            })
        })
    },

    // check the existing user
    checkExistingUser: (body) => {
        return new Promise((resolve, reject) => {
            UserModel.find({ email: body.email },
                (err, docs) => {
                    if (lodash.isEmpty(docs)) {
                        resolve(body);
                    }
                    else if (err) {
                        reject(err);
                    }
                    else {
                        reject(config.EXISTIG_USER);
                    }
                })
        })
    },

    checkUser: (body) => {
        return new Promise((resolve, reject) => {
            UserService.checkExistingUser(body)
                .then((body) => {
                    UserService.createUser(body)
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }
}

module.exports = UserService;