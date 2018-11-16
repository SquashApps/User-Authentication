const UserServices = require('../services/user_service');
export const createUser = (req, res)=>{
    UserServices.checkUser(req.body)
    .then(()=>{
        res.status(200).send('Successfully created')
    })
    .catch((err)=>{
        if(err==="existing user"){
            res.status(400).json({'error':'User already exists.'});
        }
        else{
            res.send(500).status(err);
        }
    })
}