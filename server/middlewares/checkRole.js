
const checkRole=(req,res,next)=>{
    try{
        if(res.locals.userInfo.role==="admin"){
            next();
        }else{
            res.sendStatus(401);
        }
    }catch(error){
        console.log(error);
        res.sendStatus(401);
    }
}

module.exports = checkRole;