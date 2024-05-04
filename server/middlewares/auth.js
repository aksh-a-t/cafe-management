const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const auth=(req,res,next)=>{
    try{
        let token = req.headers["authorization"].split(" ")[1];
        // @ts-ignore
        let verify = jwt.verify(token,process.env.SECRET_ACCESS_KEY);
        res.locals.userInfo = verify;
        next();
        
    }catch(error){
        console.log(error);
        res.status(401).json("JWT");
    }
}

module.exports=auth;