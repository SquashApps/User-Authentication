const VerificationService = require('../services/verfication_service');
export const verifyUser = (req, res)=>{
    VerificationService.verifyUser(req.params.id)
    .then(()=>{
        res.redirect('http://localhost:8081/#/verify')
    })
    .catch((err)=>{
        res.status(500).send(err);
    })
}