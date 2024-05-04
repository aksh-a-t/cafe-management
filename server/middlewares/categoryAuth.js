const Features = require("../utility");


const categoryAuth = (req,res,next) => {
    try{
        if(res.locals.userInfo.features.includes(Features["Category Manipulation"])){
            next();
        }else{
            res.status(401).json({message:"Access Denied"})
        }
    }catch(e){
        console.log(e);
        res.status(401).json({message:"Access Denied"})
    }
}

module.exports = categoryAuth;