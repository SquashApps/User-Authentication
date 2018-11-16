const crypto = require('crypto');
const atob = require('atob')
let EncryptionService = {
    genRandomString :(length)=>{    // generated a random string of size 16
        try{
        return crypto.randomBytes(Math.ceil(length/2))
                .toString('hex') 
                .slice(0,length);
        }
        catch(err){
            console.error('genRandomString', err);
        }
    },

    /**
     * Used sha512 along with salt value to hash the function
     */
    
    sha512 :(password, salt)=>{    
        try{
        let hash = crypto.createHmac('sha512', salt); 
        hash.update(password);
        let value = hash.digest('hex');
        return {
            salt:salt,
            passwordHash:value
        };
    }
    catch(err){
        console.error('sha512',err);
    }
    },
    /**
     * Encrypts the password using salt and sha512
     */
    saltHashPassword:(userpassword)=> {        
        try{
        let salt = EncryptionService.genRandomString(16);
        userpassword = atob(userpassword);
        let passwordData = EncryptionService.sha512(userpassword, salt);
        return passwordData;
        }
        catch(err){
            console.error('SaltAndHashPassword', err);
        }
    },
    /**
     * Cross-checking of password during user sign-in
     */
    saltHashExistingUserPassword:(userpassword,salt)=>{
        try{
        let passwordData = EncryptionService.sha512(userpassword, salt);
        return passwordData;
        }
        catch(err){
            console.error('SaltHashExistingUserPassword', err);
        }
    }



}

module.exports = EncryptionService;