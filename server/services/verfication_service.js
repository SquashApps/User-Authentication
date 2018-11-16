const UserModel = require('../models/user_model');
let VerificationService = {
    /**
     * Updates the mail status of the user.
     */
    verifyUser:(id)=>{
        return new Promise((resolve,reject)=>{
            UserModel.findOneAndUpdate({_id:id},{
                $set:{
                    isVerified:true
                }
            },{new:true})
            .exec((err,doc)=>{
                err?reject(err):resolve(doc);
            })
        })
    }
}

module.exports = VerificationService;