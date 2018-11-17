const LoginServices = require('../services/login_service');
const config = require('../constant');

export const entryCheck = (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        res.sendStatus(400);
        return;
    }
    LoginServices.checkIfUserIsVerified(email, password)
        .then(() => {
            res.status(200).json({ verified: true })
            return;
        })
        .catch((err) => {
            if (err === config.INVALID_USER) {
                res.status(400).json({ verified: false, 'error': 'User is not present.' });
                return;
            }
            res.send(500).status({ verified: false, error: err });
        });
}