const UserServices = require('../services/user_service');
const config = require('../constant');
const lodash = require("lodash");

export const createUser = (req, res) => {
    let userDetails = lodash.pick(req.body, ['name', 'email', 'password']);
    if (!userDetails.email || !userDetails.password) {
        res.sendStatus(400);
        return;
    }
    UserServices.createUserIfNotExisting(userDetails)
        .then(() => {
            res.sendStatus(201);
            return;
        })
        .catch((err) => {
            if (err === config.EXISTING_USER) {
                res.status(400).json({ created: false, 'error': 'User already exists' });
                return;
            }
        })

}