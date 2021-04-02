const jwt = require('jsonwebtoken')
const SECRETKEY="piyush@123"

module.exports =(req,res,next) =>{
    const bearer =req.headers.authorization;
    if(bearer){
        const bearerToken =bearer.split(" ");
        const token=bearerToken[1];
        jwt.verify(token,SECRETKEY, (err,decoded) =>{
            if(err){
                res.sendStatus(403)
            }
            else{
            req.userData=decoded;
               console.log(token);
                next();
            }
        });
    }else{
        res.sendStatus(403)
    }
}

