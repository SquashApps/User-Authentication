const VerificationService = require('../services/verification_service');
const config = require('../constant');
export const verifyUser = (req, res)=>{
    VerificationService.verifyUser(req.params.id)
    .then(()=>{
        res.redirect(config.REDIRECT_URL)
    })
    .catch((err)=>{
        res.status(500).send(err);
    })
}