const LoginServices = require('../services/login_service');
const config = require('../constant');
export const entryCheck = (req, res)=>{
    LoginServices.checkUserVerification(req.body)
    .then(()=>{
        res.status(200).json({'user':'verified'})
    })
    .catch((err)=>{
        if(err === config.INVALID_USER){
            res.status(400).json({'error':'User is not present.'});
        }
        else{
            res.send(500).status(err);
        }
    })
}