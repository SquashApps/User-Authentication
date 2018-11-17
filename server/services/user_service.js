
const UserModel = require('../models/user_model')
const lodash = require("lodash");
const MailService = require('./mail_service');
const config = require('../constant')

let UserService = {
    // creating a new user
    createUser: (userDetails) => {
        return new Promise((resolve, reject) => {
            let newUser = new UserModel(userDetails);
            newUser.save((err, savedUser) => {
                if (err) {
                    reject(err);
                } else {
                    MailService.sendMail(savedUser);
                    resolve();
                }
            })
        })
    },

    // check the existing user
    checkIfUserExists: (userDetails) => {
        return new Promise((resolve, reject) => {
            UserModel.find({ email: userDetails.email },
                (err, user) => {
                    if (lodash.isEmpty(user)) {
                        resolve();
                    }
                    else if (err) {
                        reject(err);
                    }
                    else {
                        reject(config.EXISTING_USER);
                    }
                })
        })
    },

    createUserIfNotExisting: (userDetails) => {
        return new Promise((resolve, reject) => {
            UserService.checkIfUserExists(userDetails)
                .then(() => {
                    UserService.createUser(userDetails)
                        .then(() => resolve())
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }
}

module.exports = UserService;