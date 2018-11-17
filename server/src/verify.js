const VerificationService = require('../services/verification_service');
const config = require('../constant');
let mongoose = require('mongoose');

export const verifyUser = (req, res) => {
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.sendStatus(400);
        return;
    }
    VerificationService.verifyUser(id)
        .then(() => {
            res.redirect(config.REDIRECT_URL);
            return;
        })
        .catch((err) => {
            res.status(500).json({ verfication: 'failed', error: err });
        })
}