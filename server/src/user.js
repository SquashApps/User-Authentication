const UserServices = require('../services/user_service');
const config = require('../constant');
export const createUser = (req, res)=>{
    UserServices.checkUser(req.body)
    .then(()=>{
        res.status(200).send({'messsage':'Successfully created'})
    })
    .catch((err)=>{
        if(err === config.EXISTIG_USER){
            res.status(400).json({'error':'User already exists'});
        }
        else{
            res.send(500).status(err);
        }
    })
}